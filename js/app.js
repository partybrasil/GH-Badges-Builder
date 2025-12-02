import { CONFIG } from './config.js';
import { TemplateManager } from './modules/TemplateManager.js';
import { StorageManager } from './modules/StorageManager.js';
import { UIManager } from './modules/UIManager.js';
import { DragDropManager } from './modules/DragDropManager.js';
import { ExportManager } from './modules/ExportManager.js';
import { IconManager } from './modules/IconManager.js';
import { copyToClipboard, debounce, escapeHtml } from './utils/helpers.js';

class App {
    constructor() {
        this.templateManager = new TemplateManager();
        this.storageManager = new StorageManager();
        this.uiManager = new UIManager();
        this.iconManager = new IconManager();
        this.dragDropManager = null;

        this.state = {
            badges: [],
            selectedBadgeIndex: -1,
            theme: CONFIG.DEFAULT_THEME,
            layout: 'horizontal',
            defaultStyle: 'flat',
            defaultFormat: 'markdown'
        };

        this.iconsLoaded = false;
        this.currentIconPage = 0;
        this.iconsPerPage = 100;
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

        // Load icons lazily when icons section is expanded
        this.setupIconsLazyLoad();
    }

    loadSettings() {
        const prefs = this.storageManager.loadPreferences();
        this.state.theme = prefs.theme || CONFIG.DEFAULT_THEME;
        this.state.layout = prefs.layout || 'horizontal';
        this.state.defaultStyle = prefs.defaultStyle || 'flat';
        this.state.defaultFormat = prefs.defaultFormat || 'markdown';
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

    setupIconsLazyLoad() {
        const iconsSection = document.getElementById('icons-section');
        const sectionHeader = iconsSection?.querySelector('.section-header');
        
        if (sectionHeader) {
            sectionHeader.addEventListener('click', async () => {
                if (!this.iconsLoaded) {
                    await this.loadAndRenderIcons();
                }
            });
        }
    }

    async loadAndRenderIcons() {
        const iconsGrid = document.getElementById('icons-grid');
        if (!iconsGrid) return;

        iconsGrid.innerHTML = '<div class="icons-loading"><span>Cargando iconos...</span></div>';
        
        try {
            await this.iconManager.loadIcons();
            this.iconsLoaded = true;
            this.renderIconsPage(0);
            this.bindIconsSearch();
            this.bindIconsScroll();
        } catch (error) {
            console.error('Error loading icons:', error);
            iconsGrid.innerHTML = '<div class="icons-loading"><span>Error al cargar iconos. Intenta de nuevo.</span></div>';
        }
    }

    renderIconsPage(page) {
        const iconsGrid = document.getElementById('icons-grid');
        if (!iconsGrid) return;

        const icons = this.iconManager.getIconsPage(page, this.iconsPerPage);
        
        if (page === 0) {
            iconsGrid.innerHTML = '';
        }

        icons.forEach(icon => {
            const slug = icon.slug || this.iconManager.titleToSlug(icon.title);
            const iconEl = document.createElement('button');
            iconEl.className = 'icon-item';
            iconEl.title = icon.title;
            iconEl.dataset.slug = slug;
            iconEl.dataset.title = icon.title;
            iconEl.dataset.hex = icon.hex || '000000';
            
            // Use CDN URL for icon thumbnail - escape title to prevent XSS
            const iconUrl = this.iconManager.getIconUrl(slug);
            const safeTitle = escapeHtml(icon.title || '');
            iconEl.innerHTML = `<img src="${iconUrl}" alt="${safeTitle}" loading="lazy" onerror="this.style.display='none'">`;
            
            iconEl.addEventListener('click', () => this.handleIconSelect(icon, slug));
            iconsGrid.appendChild(iconEl);
        });

        this.currentIconPage = page;
    }

    handleIconSelect(icon, slug) {
        // Remove previous selection
        document.querySelectorAll('.icon-item.selected').forEach(el => el.classList.remove('selected'));
        
        // Mark as selected
        const selected = document.querySelector(`.icon-item[data-slug="${slug}"]`);
        if (selected) selected.classList.add('selected');

        // If there's a selected badge, update its logo
        if (this.state.selectedBadgeIndex >= 0) {
            this.state.badges[this.state.selectedBadgeIndex].logo = slug;
            this.state.badges[this.state.selectedBadgeIndex].logoColor = 'white';
            this.uiManager.renderBadges(this.state.badges);
            this.saveState();
            this.uiManager.showNotification(`Icono "${icon.title}" aplicado`, 'success');
        } else {
            // Create a new badge with this icon
            const badge = {
                label: '',
                message: icon.title,
                color: icon.hex || '000000',
                style: this.state.defaultStyle,
                logo: slug,
                logoColor: 'white'
            };
            this.addBadge(badge);
        }
    }

    bindIconsSearch() {
        const searchInput = document.getElementById('icons-search');
        if (!searchInput) return;

        const debouncedSearch = debounce((query) => {
            this.iconManager.searchIcons(query);
            this.currentIconPage = 0;
            this.renderIconsPage(0);
        }, 300);

        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });
    }

    bindIconsScroll() {
        const iconsGrid = document.getElementById('icons-grid');
        if (!iconsGrid) return;

        iconsGrid.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = iconsGrid;
            
            // Load more when near bottom
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                const totalIcons = this.iconManager.getTotalCount();
                const loadedIcons = (this.currentIconPage + 1) * this.iconsPerPage;
                
                if (loadedIcons < totalIcons) {
                    this.renderIconsPage(this.currentIconPage + 1);
                }
            }
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

        // Section headers (Templates, Icons, Resources) - mutual exclusivity
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const section = header.closest('.sidebar-section');
                const sectionName = header.dataset.section;
                
                if (section) {
                    const wasCollapsed = section.classList.contains('collapsed');
                    
                    // If expanding this section, collapse others (except resources)
                    if (wasCollapsed && (sectionName === 'templates' || sectionName === 'icons')) {
                        // Collapse templates section if we're expanding icons
                        if (sectionName === 'icons') {
                            document.getElementById('templates-section')?.classList.add('collapsed');
                        }
                        // Collapse icons section if we're expanding templates
                        if (sectionName === 'templates') {
                            document.getElementById('icons-section')?.classList.add('collapsed');
                        }
                    }
                    
                    section.classList.toggle('collapsed');
                }
            });
        });

        // Layout alignment - toggle between horizontal and vertical
        const horizontalBtn = document.getElementById('layout-horizontal-btn');
        const verticalBtn = document.getElementById('layout-vertical-btn');
        const badgeCanvas = document.getElementById('badge-canvas');

        // Set default layout based on saved preference
        if (this.state.layout === 'vertical') {
            badgeCanvas.classList.add('layout-vertical');
            badgeCanvas.classList.remove('layout-horizontal');
            verticalBtn.classList.add('active');
        } else {
            badgeCanvas.classList.add('layout-horizontal');
            badgeCanvas.classList.remove('layout-vertical');
            horizontalBtn.classList.add('active');
        }

        horizontalBtn.addEventListener('click', () => {
            badgeCanvas.classList.add('layout-horizontal');
            badgeCanvas.classList.remove('layout-vertical');
            horizontalBtn.classList.add('active');
            verticalBtn.classList.remove('active');
            this.state.layout = 'horizontal';
            this.storageManager.savePreferences({ layout: 'horizontal' });
        });

        verticalBtn.addEventListener('click', () => {
            badgeCanvas.classList.add('layout-vertical');
            badgeCanvas.classList.remove('layout-horizontal');
            verticalBtn.classList.add('active');
            horizontalBtn.classList.remove('active');
            this.state.layout = 'vertical';
            this.storageManager.savePreferences({ layout: 'vertical' });
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

        // Settings Modal
        const settingsModal = document.getElementById('settings-modal');
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.populateSettingsModal();
            settingsModal.classList.add('active');
        });

        // Help Modal
        const helpModal = document.getElementById('help-modal');
        document.getElementById('help-btn').addEventListener('click', () => {
            helpModal.classList.add('active');
        });

        // Custom Badge Modal - use the footer button
        const customBadgeModal = document.getElementById('custom-badge-modal');
        const customBadgeBtn = document.getElementById('create-custom-badge-btn');
        if (customBadgeBtn) {
            customBadgeBtn.addEventListener('click', () => {
                customBadgeModal.classList.add('active');
            });
        }

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

        // Create custom badge button inside modal
        const createBadgeModalBtn = document.getElementById('create-custom-badge');
        if (createBadgeModalBtn) {
            createBadgeModalBtn.addEventListener('click', (e) => {
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
            });
        }

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

        // Settings modal actions
        this.bindSettingsEvents();
    }

    populateSettingsModal() {
        const prefs = this.storageManager.loadPreferences();
        
        const themeSelect = document.getElementById('settings-theme');
        const styleSelect = document.getElementById('settings-default-style');
        const formatSelect = document.getElementById('settings-default-format');
        const layoutSelect = document.getElementById('settings-default-layout');

        if (themeSelect) themeSelect.value = prefs.theme || 'auto';
        if (styleSelect) styleSelect.value = prefs.defaultStyle || 'flat';
        if (formatSelect) formatSelect.value = prefs.defaultFormat || 'markdown';
        if (layoutSelect) layoutSelect.value = prefs.layout || 'horizontal';
    }

    bindSettingsEvents() {
        // Save settings
        const saveBtn = document.getElementById('save-settings-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const theme = document.getElementById('settings-theme')?.value || 'auto';
                const defaultStyle = document.getElementById('settings-default-style')?.value || 'flat';
                const defaultFormat = document.getElementById('settings-default-format')?.value || 'markdown';
                const layout = document.getElementById('settings-default-layout')?.value || 'horizontal';

                this.state.theme = theme;
                this.state.defaultStyle = defaultStyle;
                this.state.defaultFormat = defaultFormat;
                this.state.layout = layout;

                document.body.dataset.theme = theme;
                
                // Apply layout
                const badgeCanvas = document.getElementById('badge-canvas');
                const horizontalBtn = document.getElementById('layout-horizontal-btn');
                const verticalBtn = document.getElementById('layout-vertical-btn');
                
                if (layout === 'vertical') {
                    badgeCanvas.classList.add('layout-vertical');
                    badgeCanvas.classList.remove('layout-horizontal');
                    verticalBtn.classList.add('active');
                    horizontalBtn.classList.remove('active');
                } else {
                    badgeCanvas.classList.add('layout-horizontal');
                    badgeCanvas.classList.remove('layout-vertical');
                    horizontalBtn.classList.add('active');
                    verticalBtn.classList.remove('active');
                }

                this.storageManager.savePreferences({
                    theme,
                    defaultStyle,
                    defaultFormat,
                    layout
                });

                this.uiManager.showNotification('Configuración guardada', 'success');
                document.getElementById('settings-modal').classList.remove('active');
            });
        }

        // Clear favorites
        const clearFavoritesBtn = document.getElementById('clear-favorites-btn');
        if (clearFavoritesBtn) {
            clearFavoritesBtn.addEventListener('click', () => {
                if (confirm('¿Eliminar todos los favoritos?')) {
                    this.storageManager.save(CONFIG.STORAGE_KEYS.FAVORITES, []);
                    this.uiManager.showNotification('Favoritos eliminados', 'info');
                }
            });
        }

        // Clear history
        const clearHistoryBtn = document.getElementById('clear-history-btn');
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', () => {
                if (confirm('¿Eliminar el historial?')) {
                    this.storageManager.save(CONFIG.STORAGE_KEYS.HISTORY, []);
                    this.uiManager.showNotification('Historial eliminado', 'info');
                }
            });
        }

        // Reset all settings
        const resetSettingsBtn = document.getElementById('reset-settings-btn');
        if (resetSettingsBtn) {
            resetSettingsBtn.addEventListener('click', () => {
                if (confirm('¿Restablecer toda la configuración? Esto eliminará favoritos, historial y badges guardados.')) {
                    localStorage.clear();
                    this.state.badges = [];
                    this.state.theme = 'auto';
                    this.state.layout = 'horizontal';
                    this.state.defaultStyle = 'flat';
                    this.state.defaultFormat = 'markdown';
                    document.body.dataset.theme = 'auto';
                    this.updateState();
                    this.uiManager.showNotification('Configuración restablecida', 'info');
                    document.getElementById('settings-modal').classList.remove('active');
                }
            });
        }
    }

    updateExportPreview() {
        const formatBtn = document.querySelector('.export-options button[data-format].active');
        const format = formatBtn ? formatBtn.dataset.format : 'markdown';
        const includeNewlines = document.getElementById('include-newlines')?.checked ?? true;

        const code = ExportManager.export(this.state.badges, format, { 
            layout: this.state.layout,
            includeNewlines 
        });
        document.getElementById('export-preview-code').textContent = code;
    }
}

// Start App
const app = new App();
window.addEventListener('DOMContentLoaded', () => app.init());
