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
            (oldIndex, newIndex) => this.handleReorder(oldIndex, newIndex)
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

        // Load saved badges (if any) - simplified for MVP
        // this.state.badges = this.storageManager.load('current_badges') || [];
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
        this.uiManager.renderBadges(this.state.badges);
        this.uiManager.showNotification('Badge añadido', 'success');
    }

    handleReorder(oldIndex, newIndex) {
        const [moved] = this.state.badges.splice(oldIndex, 1);
        this.state.badges.splice(newIndex, 0, moved);
        // No need to re-render as SortableJS handles DOM
    }

    bindEvents() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
            document.body.dataset.theme = this.state.theme;
            this.storageManager.savePreferences({ theme: this.state.theme });
        });

        // Clear canvas
        document.getElementById('clear-canvas-btn').addEventListener('click', () => {
            if (confirm('¿Borrar todos los badges?')) {
                this.state.badges = [];
                this.uiManager.renderBadges(this.state.badges);
            }
        });

        // Export Modal
        const exportModal = document.getElementById('export-modal');
        document.getElementById('export-btn').addEventListener('click', () => {
            this.updateExportPreview();
            exportModal.classList.add('active');
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
