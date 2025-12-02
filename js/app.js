import { CONFIG } from './config.js';
import { TemplateManager } from './modules/TemplateManager.js';
import { StorageManager } from './modules/StorageManager.js';
import { UIManager } from './modules/UIManager.js';
import { DragDropManager } from './modules/DragDropManager.js';
import { ExportManager } from './modules/ExportManager.js';
import { copyToClipboard } from './utils/helpers.js';

class App {
    constructor() {
        this.templateManager = new TemplateManager();
        this.storageManager = new StorageManager();
        this.uiManager = new UIManager();
        this.dragDropManager = null;

        this.state = {
            badges: [],
            selectedBadgeIndex: -1,
            theme: CONFIG.DEFAULT_THEME
        };
    }

    async init() {
        console.log(`Initializing ${CONFIG.APP_NAME} v${CONFIG.VERSION}`);

        // Load settings
        this.loadSettings();

        // Load templates
        await this.templateManager.loadTemplates();
        this.renderSidebar();

        // Init Drag & Drop
        this.dragDropManager = new DragDropManager(
            document.getElementById('badge-canvas'),
            {
                onUpdate: (oldIndex, newIndex) => this.handleReorder(oldIndex, newIndex),
                onAdd: (template, index) => this.handleAdd(template, index)
            }
        );
        this.dragDropManager.init();

        // Bind events
        this.bindEvents();

        // Render initial state
        this.uiManager.renderBadges(this.state.badges);
    }

    loadSettings() {
        const prefs = this.storageManager.loadPreferences();
        this.state.theme = prefs.theme || CONFIG.DEFAULT_THEME;
        document.body.dataset.theme = this.state.theme;

        // Load saved badges if any
        const savedBadges = this.storageManager.load('current_badges');
        if (savedBadges) {
            this.state.badges = savedBadges;
        }
    }

    renderSidebar() {
        const categories = ['languages', 'frameworks', 'tools'];
        categories.forEach(cat => {
            const templates = this.templateManager.getTemplatesByCategory(cat);
            this.uiManager.renderTemplates(cat, templates, (template) => this.addBadge(template));
        });
    }

    addBadge(template) {
        // Clone template to avoid reference issues
        const newBadge = { ...template, id: Date.now() };
        this.state.badges.push(newBadge);
        this.updateState();
        this.uiManager.showNotification('Badge añadido', 'success');
    }

    handleAdd(template, index) {
        const newBadge = { ...template, id: Date.now() };
        // Insert at specific index
        this.state.badges.splice(index, 0, newBadge);
        this.updateState();
        this.uiManager.showNotification('Badge añadido', 'success');
    }

    handleReorder(oldIndex, newIndex) {
        const [moved] = this.state.badges.splice(oldIndex, 1);
        this.state.badges.splice(newIndex, 0, moved);
        this.saveState();
    }

    handleBadgeSelect(index) {
        this.state.selectedBadgeIndex = index;
        const badge = this.state.badges[index];

        // Render form
        this.uiManager.renderCustomizationForm(badge);

        // Open panel if collapsed (on mobile mostly)
        const panel = document.getElementById('customization-panel');
        if (panel.classList.contains('collapsed')) {
            panel.classList.remove('collapsed');
        }

        // Bind form events immediately
        this.bindCustomizationEvents(index);
    }

    bindCustomizationEvents(index) {
        const inputs = ['badge-label', 'badge-message', 'badge-color', 'badge-style', 'badge-logo', 'badge-logo-color'];

        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            el.addEventListener('input', (e) => {
                const field = id.replace('badge-', '');
                // Map fields correctly
                const key = field === 'logo-color' ? 'logoColor' : field;

                this.state.badges[index][key] = e.target.value;

                // Re-render badges to show changes in real-time
                // We don't re-render the form to keep focus
                this.uiManager.renderBadges(this.state.badges);
                this.saveState();
            });
        });

        // Delete button
        const deleteBtn = document.getElementById('delete-badge-btn');
        if (deleteBtn) {
            deleteBtn.onclick = () => {
                this.state.badges.splice(index, 1);
                this.state.selectedBadgeIndex = -1;
                this.uiManager.renderCustomizationForm(null);
                this.updateState();
                this.uiManager.showNotification('Badge eliminado', 'info');
            };
        }
    }

    updateState() {
        this.uiManager.renderBadges(this.state.badges);
        this.saveState();
    }

    saveState() {
        this.storageManager.save('current_badges', this.state.badges);
    }

    bindEvents() {
        // UIManager Events
        this.uiManager.on('badge-select', (index) => this.handleBadgeSelect(index));

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
            document.body.dataset.theme = this.state.theme;
            this.storageManager.savePreferences({ theme: this.state.theme });
        });

        // Sidebar collapse
        document.getElementById('sidebar-collapse').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('collapsed');
        });

        // Panel collapse
        document.getElementById('panel-collapse').addEventListener('click', () => {
            document.getElementById('customization-panel').classList.toggle('collapsed');
        });

        // Category collapse
        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const group = header.closest('.category-group');
                if (group) group.classList.toggle('collapsed');
            });
        });

        // Layout alignment
        document.getElementById('layout-horizontal-btn').addEventListener('click', () => {
            document.getElementById('badge-canvas').classList.add('layout-horizontal');
            document.getElementById('badge-canvas').classList.remove('layout-vertical');
        });

        document.getElementById('layout-vertical-btn').addEventListener('click', () => {
            document.getElementById('badge-canvas').classList.add('layout-vertical');
            document.getElementById('badge-canvas').classList.remove('layout-horizontal');
        });

        // Clear canvas
        document.getElementById('clear-canvas-btn').addEventListener('click', () => {
            if (confirm('¿Borrar todos los badges?')) {
                this.state.badges = [];
                this.state.selectedBadgeIndex = -1;
                this.uiManager.renderCustomizationForm(null);
                this.updateState();
            }
        });

        // Export Modal
        const exportModal = document.getElementById('export-modal');
        document.getElementById('export-btn').addEventListener('click', () => {
            this.updateExportPreview();
            exportModal.classList.add('active');
        });

        // Custom Badge Modal
        const customBadgeModal = document.getElementById('custom-badge-modal');
        document.getElementById('create-custom-badge').addEventListener('click', () => {
            customBadgeModal.classList.add('active');
        });

        // Custom Badge Modal Logic
        const leftTypeRadios = document.getElementsByName('left-type');
        const leftIconGroup = document.getElementById('left-icon-group');
        const leftTextGroup = document.getElementById('left-text-group');

        leftTypeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'icon') {
                    leftIconGroup.classList.remove('hidden');
                    leftTextGroup.classList.add('hidden');
                } else {
                    leftIconGroup.classList.add('hidden');
                    leftTextGroup.classList.remove('hidden');
                }
            });
        });

        document.getElementById('create-custom-badge').addEventListener('click', (e) => {
            // Check if it's the button inside the modal
            if (e.target.closest('.modal-footer')) {
                const type = document.querySelector('input[name="left-type"]:checked').value;

                const badge = {
                    label: type === 'text' ? document.getElementById('custom-badge-label').value : '',
                    message: document.getElementById('custom-badge-message').value || 'Badge',
                    color: document.getElementById('custom-badge-color').value.replace('#', ''),
                    style: document.getElementById('custom-badge-style').value,
                    logo: type === 'icon' ? document.getElementById('custom-badge-logo').value : '',
                    logoColor: 'white'
                };

                this.addBadge(badge);
                customBadgeModal.classList.remove('active');

                // Reset form
                document.getElementById('custom-badge-label').value = '';
                document.getElementById('custom-badge-message').value = '';
                document.getElementById('custom-badge-logo').value = '';
            }
        });


        // Close modals
        document.querySelectorAll('[data-close-modal]').forEach(el => {
            el.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
            });
        });

        // Export actions
        document.querySelectorAll('.export-options button[data-format]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.export-options button[data-format]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updateExportPreview();
            });
        });

        document.getElementById('copy-export-btn').addEventListener('click', async () => {
            const code = document.getElementById('export-preview-code').textContent;
            if (await copyToClipboard(code)) {
                this.uiManager.showNotification('Copiado al portapapeles', 'success');
            } else {
                this.uiManager.showNotification('Error al copiar', 'error');
            }
        });
    }

    updateExportPreview() {
        const formatBtn = document.querySelector('.export-options button[data-format].active');
        const format = formatBtn ? formatBtn.dataset.format : 'markdown';

        const code = ExportManager.export(this.state.badges, format);
        document.getElementById('export-preview-code').textContent = code;
    }
}

// Start App
const app = new App();
window.addEventListener('DOMContentLoaded', () => app.init());
