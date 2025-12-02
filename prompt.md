# 🚀 Prompt Completo - GH-Badges-Builder

**Instrucciones Completas para Desarrollo de 0 a 100**

---

## 📋 Índice

1. [Resumen Ejecutivo](#-resumen-ejecutivo)
2. [Arquitectura y Stack](#-arquitectura-y-stack)
3. [Estructura del Proyecto](#-estructura-del-proyecto)
4. [Instrucciones de Implementación](#-instrucciones-de-implementación)
5. [Código Completo de Archivos Core](#-código-completo-de-archivos-core)
6. [Data Files (Templates e Iconos)](#-data-files-templates-e-iconos)
7. [Testing](#-testing)
8. [Deployment](#-deployment)
9. [Checklist de Completitud](#-checklist-de-completitud)

---

## 🎯 Resumen Ejecutivo

### ¿Qué Construiremos?

**GH-Badges-Builder** - Una aplicación web estática (HTML/CSS/JavaScript puro) para crear badges/shields profesionales para proyectos GitHub con:

- **Interfaz Drag & Drop** interactiva
- **500+ Templates** predefinidos en 8 categorías
- **3000+ Iconos** de Simple Icons
- **Personalización total** de colores, estilos, iconos
- **Export multiformato** (Markdown, HTML, JSON, URLs)
- **GitHub Pages ready** + ejecución local
- **PWA** instalable offline
- **Modo claro/oscuro**

### Características Técnicas Clave

```yaml
arquitectura: Static Web App (100% Client-Side)
backend: Ninguno
base_datos: LocalStorage + IndexedDB
despliegue: GitHub Pages Classic + Local
dependencias_externas: SortableJS (CDN, opcional)
tamaño_bundle: ~200KB (sin minificar)
performance: <2s TTI, <1s FCP
compatibilidad: Chrome 90+, Firefox 88+, Safari 14+
```

---

## 🏗️ Arquitectura y Stack

### Stack Tecnológico

```yaml
frontend:
  html5:
    version: Latest
    features:
      - Semantic markup
      - Web Components (custom elements)
      - Template literals
  
  css3:
    version: Latest
    features:
      - Custom Properties (variables)
      - CSS Grid
      - Flexbox
      - Animations
      - Media Queries
    methodology: BEM (Block Element Modifier)
  
  javascript:
    version: ES6+ (ES2015+)
    features:
      - Modules (import/export)
      - Async/await
      - Promises
      - Arrow functions
      - Destructuring
      - Template literals
      - Classes
    apis:
      - Fetch API
      - LocalStorage API
      - IndexedDB API
      - Clipboard API
      - Service Worker API
      - File API
      - History API

libraries_cdn:
  sortablejs:
    version: "1.15.0"
    url: "https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"
    purpose: "Drag & Drop functionality"
    optional: true
    fallback: "Vanilla JS implementation"
  
  simple_icons:
    source: "https://unpkg.com/simple-icons@latest/icons.json"
    purpose: "Icons database (3000+)"
    fallback: "Local copy"

deployment:
  primary: "GitHub Pages Classic"
  secondary: "Local (file:// o http server)"
  requirements:
    - Git repository
    - index.html en root o /docs
    - Assets relativos
```

### Flujo de Datos

```
User Interaction (DOM Events)
    ↓
Event Handlers (app.js)
    ↓
Core Modules (ES6 Modules)
├── BadgeGenerator.js → Generate badge URL
├── TemplateManager.js → Manage templates
├── DragDropManager.js → Handle drag/drop
├── ExportManager.js → Export to formats
└── StorageManager.js → Persist data
    ↓
Storage Layer
├── LocalStorage (preferences, favorites)
└── IndexedDB (history, templates cache)
    ↓
External APIs (Fetch)
└── shields.io (badge rendering)
```

---

## 📁 Estructura del Proyecto

```
GH-Badges-Builder/
│
├── index.html                          # ⭐ Entry point
├── manifest.json                       # PWA manifest
├── sw.js                              # Service Worker
├── README.md                          # Documentación
├── ROADMAP.md                         # Roadmap
├── LICENSE                            # MIT License
├── .gitignore                         # Git ignore
│
├── css/
│   ├── reset.css                      # CSS reset
│   ├── variables.css                  # CSS Custom Properties
│   ├── main.css                       # Estilos principales
│   ├── components.css                 # Componentes UI
│   ├── layout.css                     # Layout
│   ├── themes.css                     # Light/Dark themes
│   └── responsive.css                 # Media queries
│
├── js/
│   ├── app.js                         # ⭐ Main initialization
│   ├── config.js                      # Configuration
│   │
│   ├── modules/
│   │   ├── BadgeGenerator.js          # ⭐ Badge URL generation
│   │   ├── TemplateManager.js         # ⭐ Template CRUD
│   │   ├── DragDropManager.js         # ⭐ Drag & Drop
│   │   ├── ColorPicker.js             # Color selection
│   │   ├── IconManager.js             # Icon search
│   │   ├── ExportManager.js           # ⭐ Export logic
│   │   ├── StorageManager.js          # ⭐ Storage wrapper
│   │   ├── UIManager.js               # UI updates
│   │   ├── ThemeManager.js            # Theme switching
│   │   └── ClipboardManager.js        # Clipboard operations
│   │
│   └── utils/
│       ├── helpers.js                 # Utility functions
│       ├── validators.js              # Input validation
│       ├── formatters.js              # Format conversions
│       └── constants.js               # App constants
│
├── data/
│   ├── templates/
│   │   ├── index.json                 # Template index
│   │   ├── languages.json             # ⭐ 50+ language badges
│   │   ├── frameworks.json            # ⭐ 80+ framework badges
│   │   ├── tools.json                 # 100+ tool badges
│   │   ├── platforms.json             # 60+ platform badges
│   │   ├── cicd.json                  # 40+ CI/CD badges
│   │   ├── status.json                # 70+ status badges
│   │   ├── social.json                # 50+ social badges
│   │   └── metrics.json               # 50+ metric badges
│   │
│   ├── icons/
│   │   └── simple-icons-manifest.json # Simple Icons data
│   │
│   ├── presets/
│   │   ├── color-palettes.json        # Color palettes
│   │   └── gradients.json             # Gradient presets
│   │
│   └── i18n/
│       ├── es.json                    # Español (default)
│       ├── en.json                    # English
│       └── pt.json                    # Português
│
├── assets/
│   └── images/
│       ├── logo.svg
│       ├── icon-192.png               # PWA icon
│       ├── icon-512.png               # PWA icon
│       ├── favicon.ico
│       └── screenshots/
│
├── docs/
│   ├── user-guide.md
│   ├── api.md
│   └── deployment.md
│
└── tests/
    ├── index.html                     # Test suite
    └── unit/
        ├── BadgeGenerator.test.js
        ├── TemplateManager.test.js
        └── ExportManager.test.js
```

---

## 🔨 Instrucciones de Implementación

### Fase 1: Setup Inicial

#### 1.1 Crear Estructura Base

```bash
# Crear directorios
mkdir -p GH-Badges-Builder/{css,js/{modules,utils},data/{templates,icons,presets,i18n},assets/images,docs,tests/unit}

cd GH-Badges-Builder
```

#### 1.2 Inicializar Git

```bash
git init
echo "node_modules/" > .gitignore
echo ".DS_Store" >> .gitignore
echo "*.log" >> .gitignore
```

#### 1.3 Crear Archivos Base

Crear estos archivos vacíos:
- `index.html`
- `manifest.json`
- `sw.js`
- `css/reset.css`, `css/variables.css`, `css/main.css`, etc.
- `js/app.js`, `js/config.js`
- Módulos en `js/modules/`
- Data files en `data/templates/`

---

### Fase 2: Implementación HTML

#### 2.1 index.html (Completo)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Constructor interactivo de badges profesionales para GitHub README">
    <meta name="keywords" content="github, badges, shields, readme, markdown">
    <meta name="author" content="GH-Badges-Builder">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://tu-usuario.github.io/GH-Badges-Builder/">
    <meta property="og:title" content="GH-Badges-Builder - Constructor de Badges">
    <meta property="og:description" content="Crea badges profesionales para tus proyectos GitHub">
    <meta property="og:image" content="assets/images/og-image.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://tu-usuario.github.io/GH-Badges-Builder/">
    <meta property="twitter:title" content="GH-Badges-Builder">
    <meta property="twitter:description" content="Constructor interactivo de badges">
    <meta property="twitter:image" content="assets/images/og-image.png">
    
    <title>GH-Badges-Builder - Constructor de Badges para GitHub</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
    <link rel="icon" type="image/png" sizes="192x192" href="assets/images/icon-192.png">
    <link rel="apple-touch-icon" href="assets/images/icon-192.png">
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="manifest.json">
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#32B8C6">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/themes.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body data-theme="auto">
    
    <!-- ============================================ -->
    <!-- HEADER -->
    <!-- ============================================ -->
    <header class="app-header">
        <div class="header-left">
            <img src="assets/images/logo.svg" alt="Logo" class="app-logo">
            <h1 class="app-title">GH-Badges-Builder</h1>
        </div>
        
        <div class="header-center">
            <input 
                type="search" 
                id="global-search" 
                class="search-input" 
                placeholder="Buscar templates..."
                aria-label="Buscar templates"
            >
        </div>
        
        <div class="header-right">
            <button id="theme-toggle" class="icon-btn" title="Cambiar tema" aria-label="Cambiar tema">
                <svg class="icon icon-theme" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>
            
            <button id="settings-btn" class="icon-btn" title="Configuración" aria-label="Configuración">
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6m-8-8h6m6 0h6"></path>
                </svg>
            </button>
            
            <button id="help-btn" class="icon-btn" title="Ayuda" aria-label="Ayuda">
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            </button>
        </div>
    </header>
    
    <!-- ============================================ -->
    <!-- MAIN CONTENT -->
    <!-- ============================================ -->
    <main class="app-main">
        
        <!-- SIDEBAR: Templates -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <h2>Templates</h2>
                <button id="sidebar-collapse" class="icon-btn" aria-label="Colapsar sidebar">
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M15 18l-6-6 6-6"></path>
                    </svg>
                </button>
            </div>
            
            <div class="sidebar-content">
                <!-- Category: Languages -->
                <div class="category-group" data-category="languages">
                    <button class="category-header">
                        <span class="category-icon">🔤</span>
                        <span class="category-name">Lenguajes</span>
                        <span class="category-count">50+</span>
                        <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </button>
                    <div class="category-items" id="category-languages">
                        <!-- Templates loaded dynamically -->
                    </div>
                </div>
                
                <!-- Category: Frameworks -->
                <div class="category-group" data-category="frameworks">
                    <button class="category-header">
                        <span class="category-icon">🎯</span>
                        <span class="category-name">Frameworks</span>
                        <span class="category-count">80+</span>
                        <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </button>
                    <div class="category-items" id="category-frameworks">
                        <!-- Templates loaded dynamically -->
                    </div>
                </div>
                
                <!-- Otras categorías: tools, platforms, cicd, status, social, metrics -->
                <!-- Estructura similar -->
                
                <!-- Category: Favoritos -->
                <div class="category-group" data-category="favorites">
                    <button class="category-header">
                        <span class="category-icon">⭐</span>
                        <span class="category-name">Favoritos</span>
                        <span class="category-count" id="favorites-count">0</span>
                        <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </button>
                    <div class="category-items" id="category-favorites">
                        <!-- Favorites loaded from LocalStorage -->
                    </div>
                </div>
            </div>
            
            <div class="sidebar-footer">
                <button id="create-custom-badge" class="btn btn-primary btn-block">
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Custom Badge
                </button>
            </div>
        </aside>
        
        <!-- CANVAS: Badge Workspace -->
        <section class="canvas-area" id="canvas">
            <div class="canvas-toolbar">
                <div class="toolbar-left">
                    <button id="select-all-btn" class="btn btn-sm" title="Seleccionar todos">
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                        </svg>
                        Seleccionar Todo
                    </button>
                    
                    <button id="clear-canvas-btn" class="btn btn-sm" title="Limpiar canvas">
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Limpiar
                    </button>
                    
                    <div class="divider"></div>
                    
                    <button id="undo-btn" class="btn btn-sm" title="Deshacer" disabled>
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 7v6h6"></path>
                            <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"></path>
                        </svg>
                    </button>
                    
                    <button id="redo-btn" class="btn btn-sm" title="Rehacer" disabled>
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 7v6h-6"></path>
                            <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="toolbar-center">
                    <span class="badge-count">0 badges</span>
                </div>
                
                <div class="toolbar-right">
                    <button id="layout-horizontal-btn" class="btn btn-sm" title="Alinear horizontal">
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    
                    <button id="layout-vertical-btn" class="btn btn-sm" title="Alinear vertical">
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="12" y1="3" x2="12" y2="21"></line>
                            <line x1="6" y1="3" x2="6" y2="21"></line>
                            <line x1="18" y1="3" x2="18" y2="21"></line>
                        </svg>
                    </button>
                    
                    <button id="export-btn" class="btn btn-primary" title="Exportar badges">
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Exportar
                    </button>
                </div>
            </div>
            
            <div class="canvas-content" id="badge-canvas">
                <div class="canvas-empty-state">
                    <svg class="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                    <p class="empty-text">Arrastra templates aquí o haz click en "Custom Badge"</p>
                </div>
                
                <!-- Badges se añaden aquí dinámicamente -->
            </div>
        </section>
        
        <!-- PANEL: Customization -->
        <aside class="customization-panel" id="customization-panel">
            <div class="panel-header">
                <h2>Personalizar</h2>
                <button id="panel-collapse" class="icon-btn" aria-label="Colapsar panel">
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 18l6-6-6-6"></path>
                    </svg>
                </button>
            </div>
            
            <div class="panel-content" id="customization-content">
                <div class="panel-empty-state">
                    <p>Selecciona un badge para personalizarlo</p>
                </div>
                
                <!-- Contenido dinámico cuando se selecciona un badge -->
            </div>
        </aside>
        
    </main>
    
    <!-- ============================================ -->
    <!-- MODALS -->
    <!-- ============================================ -->
    
    <!-- Export Modal -->
    <div id="export-modal" class="modal" role="dialog" aria-labelledby="export-modal-title" aria-hidden="true">
        <div class="modal-overlay" data-close-modal></div>
        <div class="modal-container">
            <div class="modal-header">
                <h2 id="export-modal-title">Exportar Badges</h2>
                <button class="modal-close" data-close-modal aria-label="Cerrar modal">
                    <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="export-options">
                    <label class="form-label">Formato</label>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm active" data-format="markdown">Markdown</button>
                        <button class="btn btn-sm" data-format="html">HTML</button>
                        <button class="btn btn-sm" data-format="json">JSON</button>
                        <button class="btn btn-sm" data-format="urls">URLs</button>
                    </div>
                    
                    <label class="form-label mt-3">Opciones Markdown</label>
                    <select id="markdown-format" class="form-select">
                        <option value="inline">Inline</option>
                        <option value="table">Table</option>
                        <option value="list">List</option>
                    </select>
                    
                    <div class="mt-3">
                        <label class="checkbox-label">
                            <input type="checkbox" id="include-newlines" checked>
                            <span>Incluir saltos de línea</span>
                        </label>
                    </div>
                </div>
                
                <div class="export-preview mt-4">
                    <label class="form-label">Preview</label>
                    <div class="code-block">
                        <pre><code id="export-preview-code"></code></pre>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" data-close-modal>Cancelar</button>
                <button id="copy-export-btn" class="btn btn-primary">
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copiar
                </button>
                <button id="download-export-btn" class="btn btn-primary">
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Descargar
                </button>
            </div>
        </div>
    </div>
    
    <!-- Settings Modal -->
    <div id="settings-modal" class="modal" role="dialog" aria-labelledby="settings-modal-title" aria-hidden="true">
        <!-- Similar estructura a export modal -->
        <!-- Contenido: theme, language, defaults, etc. -->
    </div>
    
    <!-- Custom Badge Modal -->
    <div id="custom-badge-modal" class="modal" role="dialog" aria-labelledby="custom-badge-modal-title" aria-hidden="true">
        <!-- Formulario para crear badge custom -->
    </div>
    
    <!-- ============================================ -->
    <!-- NOTIFICATIONS -->
    <!-- ============================================ -->
    <div id="notification-container" class="notification-container" aria-live="polite"></div>
    
    <!-- ============================================ -->
    <!-- SCRIPTS -->
    <!-- ============================================ -->
    
    <!-- SortableJS (CDN) - Optional -->
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js" 
            integrity="sha384-..." 
            crossorigin="anonymous"
            onerror="console.warn('SortableJS failed to load from CDN, using fallback')"></script>
    
    <!-- App Scripts (ES6 Modules) -->
    <script type="module" src="js/app.js"></script>
    
    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('Service Worker registered:', reg.scope))
                    .catch(err => console.error('Service Worker registration failed:', err));
            });
        }
    </script>
</body>
</html>
```

---

### Fase 3: CSS Implementation

#### 3.1 css/variables.css

```css
/* =========================================
   CSS CUSTOM PROPERTIES (Variables)
   ========================================= */

:root {
    /* ===== COLORS - LIGHT MODE (Default) ===== */
    --color-primary: #32B8C6;
    --color-primary-hover: #29A4B1;
    --color-primary-active: #21808D;
    
    --color-secondary: rgba(94, 82, 64, 0.12);
    --color-secondary-hover: rgba(94, 82, 64, 0.2);
    
    --color-background: #FCFCF9;
    --color-surface: #FFFFFF;
    --color-surface-elevated: #FFFFFF;
    
    --color-text-primary: #134252;
    --color-text-secondary: #626C71;
    --color-text-tertiary: #A7A9A9;
    
    --color-border: rgba(94, 82, 64, 0.2);
    --color-border-light: rgba(94, 82, 64, 0.1);
    
    --color-success: #10B981;
    --color-error: #EF4444;
    --color-warning: #F59E0B;
    --color-info: #3B82F6;
    
    /* ===== TYPOGRAPHY ===== */
    --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-family-mono: 'Fira Code', 'Courier New', monospace;
    
    --font-size-xs: 11px;
    --font-size-sm: 12px;
    --font-size-base: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 20px;
    --font-size-2xl: 24px;
    --font-size-3xl: 30px;
    
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 550;
    --font-weight-bold: 600;
    
    --line-height-tight: 1.2;
    --line-height-normal: 1.5;
    --line-height-loose: 1.75;
    
    /* ===== SPACING ===== */
    --space-0: 0;
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 20px;
    --space-6: 24px;
    --space-8: 32px;
    --space-10: 40px;
    --space-12: 48px;
    --space-16: 64px;
    
    /* ===== BORDER RADIUS ===== */
    --radius-sm: 6px;
    --radius-base: 8px;
    --radius-md: 10px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-full: 9999px;
    
    /* ===== SHADOWS ===== */
    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    
    /* ===== TRANSITIONS ===== */
    --transition-fast: 150ms ease;
    --transition-base: 250ms ease;
    --transition-slow: 350ms ease;
    
    /* ===== Z-INDEX ===== */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
    
    /* ===== LAYOUT ===== */
    --header-height: 60px;
    --sidebar-width: 280px;
    --panel-width: 320px;
    --toolbar-height: 48px;
}

/* ===== DARK MODE ===== */
[data-theme="dark"] {
    --color-primary: #32B8C6;
    --color-primary-hover: #3DD1E0;
    --color-primary-active: #29CDD8;
    
    --color-secondary: rgba(119, 124, 124, 0.15);
    --color-secondary-hover: rgba(119, 124, 124, 0.25);
    
    --color-background: #1F2121;
    --color-surface: #262828;
    --color-surface-elevated: #2D2F2F;
    
    --color-text-primary: #F5F5F5;
    --color-text-secondary: rgba(167, 169, 169, 0.7);
    --color-text-tertiary: #777C7C;
    
    --color-border: rgba(119, 124, 124, 0.3);
    --color-border-light: rgba(119, 124, 124, 0.15);
    
    --color-success: #10B981;
    --color-error: #F87171;
    --color-warning: #FBBF24;
    --color-info: #60A5FA;
    
    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
}

/* ===== AUTO THEME (System Preference) ===== */
@media (prefers-color-scheme: dark) {
    [data-theme="auto"] {
        --color-primary: #32B8C6;
        --color-primary-hover: #3DD1E0;
        --color-primary-active: #29CDD8;
        
        --color-secondary: rgba(119, 124, 124, 0.15);
        --color-secondary-hover: rgba(119, 124, 124, 0.25);
        
        --color-background: #1F2121;
        --color-surface: #262828;
        --color-surface-elevated: #2D2F2F;
        
        --color-text-primary: #F5F5F5;
        --color-text-secondary: rgba(167, 169, 169, 0.7);
        --color-text-tertiary: #777C7C;
        
        --color-border: rgba(119, 124, 124, 0.3);
        --color-border-light: rgba(119, 124, 124, 0.15);
        
        --color-success: #10B981;
        --color-error: #F87171;
        --color-warning: #FBBF24;
        --color-info: #60A5FA;
    }
}
```

*Por razones de espacio, este es un excerpt. El archivo completo incluye más variables.*

---

**[CONTINÚA EN SIGUIENTE MENSAJE - Este prompt es MUY extenso]**

El archivo `prompt.md` completo debe incluir:

1. ✅ Resumen ejecutivo
2. ✅ Arquitectura y stack
3. ✅ Estructura del proyecto
4. ✅ HTML completo (parcial arriba)
5. ⏳ CSS completo (todos los archivos)
6. ⏳ JavaScript completo (todos los módulos)
7. ⏳ Data files (JSON templates)
8. ⏳ Testing setup
9. ⏳ Deployment instructions
10. ⏳ Checklist final

**Debido a la longitud extrema (~50,000+ líneas de código completo), te proporcionaré el prompt en secciones manejables.**

¿Quieres que:
A) Continue con las siguientes secciones del prompt.md
B) Te proporcione archivos individuales específicos (ej. BadgeGenerator.js completo)
C) Te dé primero los archivos JSON de templates con ejemplos reales

Dime cómo prefieres proceder y continuaré generando todo el código necesario.
