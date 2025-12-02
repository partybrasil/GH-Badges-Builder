---
name: GH-Badges-Builder-AutoDEV
description: Agente especializado en el desarrollo del generador de badges/shields para GitHub README con interfaz drag&drop - Aplicación web estática
---

# GH-Badges-Builder Agent

## 🎯 Descripción del Proyecto

**GH-Badges-Builder** es una aplicación web estática (HTML/CSS/JavaScript puro) diseñada para crear badges/shields profesionales para archivos README.md de proyectos GitHub. La aplicación funciona 100% en el navegador sin necesidad de backend, permitiendo su despliegue en **GitHub Pages** o ejecución **local** descargando el repositorio.

### 🌟 Características Clave de la Arquitectura

- **100% Client-Side**: Sin servidor, sin backend, sin base de datos
- **GitHub Pages Ready**: Deploy automático con GitHub Pages classic
- **Offline Capable**: Funciona localmente sin conexión (después de primera carga)
- **Zero Dependencies Backend**: Solo HTML/CSS/JavaScript vanilla
- **Progressive Web App**: Instalable como aplicación nativa
- **Cross-Platform**: Windows, macOS, Linux, Mobile

---

## 🏗️ Arquitectura del Proyecto (Static Web App)

### Stack Tecnológico Actualizado

```yaml
frontend:
  core:
    - HTML5: Semantic markup, Web Components
    - CSS3: Custom properties, Grid, Flexbox, Animations
    - JavaScript: Vanilla ES6+ (Modules), Web APIs
  
  storage:
    - LocalStorage: Favoritos, historial, preferencias
    - IndexedDB: Templates cache, badges guardados
    - SessionStorage: Estado temporal de sesión
  
  apis:
    - Fetch API: Descarga de iconos y datos
    - Canvas API: Preview de badges
    - Clipboard API: Copiar código
    - File API: Import/export de configuraciones
    - Service Worker API: PWA y cache offline
  
  libraries_optional:
    - SortableJS: "1.15.0" (CDN) - Drag & Drop
    - simple-icons: "Latest" (CDN) - Iconos de marcas
    - color.js: "4.2.0" (CDN) - Color picker avanzado
    - highlight.js: "11.9.0" (CDN) - Syntax highlighting

deployment:
  github_pages:
    type: "classic"
    branch: "main" o "gh-pages"
    path: "/" o "/docs"
    custom_domain: opcional
  
  local:
    requirement: "Navegador moderno"
    method: "Abrir index.html directamente"
    server_optional: "python -m http.server 8000"

browser_support:
  chrome: "90+"
  firefox: "88+"
  safari: "14+"
  edge: "90+"
  mobile: "iOS Safari 14+, Chrome Android 90+"
```

### Estructura de Directorios (Static Web App)

```
GH-Badges-Builder/
├── index.html                          # Punto de entrada principal
├── manifest.json                       # PWA manifest
├── sw.js                              # Service Worker (PWA)
├── README.md                          # Documentación de usuario
├── GH-Badges-Builder.agent.md         # Este archivo
├── ROADMAP.md                         # Roadmap del proyecto
├── prompt.md                          # Instrucciones completas de desarrollo
├── LICENSE                            # MIT License
├── .gitignore                         # Git ignore
├── CNAME                              # Dominio custom (opcional)
│
├── css/
│   ├── reset.css                      # CSS reset/normalize
│   ├── variables.css                  # CSS Custom Properties
│   ├── main.css                       # Estilos principales
│   ├── components.css                 # Componentes UI
│   ├── layout.css                     # Layout y grid
│   ├── themes.css                     # Light/dark themes
│   ├── animations.css                 # Animaciones
│   ├── responsive.css                 # Media queries
│   └── print.css                      # Estilos de impresión
│
├── js/
│   ├── app.js                         # Inicialización principal
│   ├── config.js                      # Configuración global
│   ├── modules/
│   │   ├── BadgeGenerator.js          # Generador de badges
│   │   ├── TemplateManager.js         # Gestión de templates
│   │   ├── DragDropManager.js         # Sistema Drag & Drop
│   │   ├── ColorPicker.js             # Selector de colores
│   │   ├── IconManager.js             # Gestión de iconos
│   │   ├── ExportManager.js           # Sistema de exportación
│   │   ├── StorageManager.js          # LocalStorage/IndexedDB
│   │   ├── UIManager.js               # Gestión de interfaz
│   │   ├── ThemeManager.js            # Temas claro/oscuro
│   │   └── ClipboardManager.js        # Portapapeles
│   ├── utils/
│   │   ├── helpers.js                 # Funciones auxiliares
│   │   ├── validators.js              # Validaciones
│   │   ├── formatters.js              # Formateadores
│   │   └── constants.js               # Constantes
│   └── workers/
│       └── badge-processor.worker.js  # Web Worker para processing
│
├── data/
│   ├── templates/
│   │   ├── languages.json             # Templates de lenguajes
│   │   ├── frameworks.json            # Templates de frameworks
│   │   ├── tools.json                 # Templates de herramientas
│   │   ├── platforms.json             # Templates de plataformas
│   │   ├── cicd.json                  # Templates CI/CD
│   │   ├── status.json                # Templates de estado
│   │   ├── social.json                # Templates sociales
│   │   ├── metrics.json               # Templates de métricas
│   │   └── index.json                 # Índice de todos los templates
│   ├── icons/
│   │   ├── simple-icons-manifest.json # Manifiesto de Simple Icons
│   │   └── custom-icons.json          # Iconos custom
│   ├── presets/
│   │   ├── color-palettes.json        # Paletas de colores
│   │   ├── gradients.json             # Gradientes predefinidos
│   │   └── styles.json                # Estilos predefinidos
│   └── i18n/
│       ├── es.json                    # Español
│       ├── en.json                    # Inglés
│       └── pt.json                    # Portugués
│
├── assets/
│   ├── images/
│   │   ├── logo.svg                   # Logo principal
│   │   ├── icon-192.png               # PWA icon 192x192
│   │   ├── icon-512.png               # PWA icon 512x512
│   │   ├── favicon.ico                # Favicon
│   │   ├── og-image.png               # Open Graph image
│   │   └── screenshots/               # Screenshots para docs
│   ├── fonts/
│   │   └── (opcional - usar system fonts)
│   └── videos/
│       └── demo.mp4                   # Video demo (opcional)
│
├── docs/
│   ├── index.html                     # Documentación web
│   ├── api.md                         # API JavaScript
│   ├── user-guide.md                  # Guía de usuario
│   ├── development.md                 # Guía de desarrollo
│   ├── contributing.md                # Guía de contribución
│   ├── changelog.md                   # Registro de cambios
│   └── deployment.md                  # Guía de despliegue
│
└── tests/
    ├── index.html                     # Suite de tests web
    ├── test-runner.js                 # Test runner
    ├── unit/
    │   ├── BadgeGenerator.test.js
    │   ├── TemplateManager.test.js
    │   ├── ExportManager.test.js
    │   └── ColorPicker.test.js
    ├── integration/
    │   ├── workflow.test.js
    │   └── storage.test.js
    └── e2e/
        └── user-flows.test.js
```

---

## 🎨 Arquitectura Client-Side Detallada

### Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│                     USER BROWSER                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐      ┌────────────────┐             │
│  │   UI Layer   │◄────►│ State Manager  │             │
│  │  (DOM/HTML)  │      │  (JavaScript)  │             │
│  └──────┬───────┘      └────────┬───────┘             │
│         │                       │                       │
│         ▼                       ▼                       │
│  ┌──────────────────────────────────────┐             │
│  │        Event Handlers                │             │
│  │  • Click • Drag • Drop • Input       │             │
│  └──────────────┬───────────────────────┘             │
│                 │                                       │
│                 ▼                                       │
│  ┌──────────────────────────────────────┐             │
│  │      Core Modules (ES6 Modules)      │             │
│  │  ┌─────────────┐  ┌────────────────┐│             │
│  │  │Badge        │  │Template        ││             │
│  │  │Generator    │  │Manager         ││             │
│  │  └─────────────┘  └────────────────┘│             │
│  │  ┌─────────────┐  ┌────────────────┐│             │
│  │  │DragDrop     │  │Export          ││             │
│  │  │Manager      │  │Manager         ││             │
│  │  └─────────────┘  └────────────────┘│             │
│  └──────────────┬───────────────────────┘             │
│                 │                                       │
│                 ▼                                       │
│  ┌──────────────────────────────────────┐             │
│  │     Storage Layer (Client-Side)      │             │
│  │  ┌────────────┐  ┌─────────────────┐│             │
│  │  │LocalStorage│  │IndexedDB        ││             │
│  │  │• Settings  │  │• Templates      ││             │
│  │  │• Favorites │  │• History        ││             │
│  │  │• Theme     │  │• Cache          ││             │
│  │  └────────────┘  └─────────────────┘│             │
│  └──────────────┬───────────────────────┘             │
│                 │                                       │
│                 ▼                                       │
│  ┌──────────────────────────────────────┐             │
│  │    External APIs (Fetch/CDN)         │             │
│  │  • shields.io (badges)               │             │
│  │  • cdn.simpleicons.org (icons)       │             │
│  │  • CDN libraries (optional)          │             │
│  └──────────────────────────────────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Módulos JavaScript (ES6)

#### 1. BadgeGenerator.js

```javascript
/**
 * Core badge generation logic
 * Genera URLs de shields.io con todas las opciones
 */
export class BadgeGenerator {
  constructor() {
    this.baseUrl = 'https://img.shields.io/badge';
    this.defaultStyle = 'flat';
    this.defaultFormat = 'svg';
  }
  
  /**
   * Genera URL de badge estático
   * @param {Object} config - Configuración del badge
   * @returns {string} URL completa del badge
   */
  generateStaticBadge(config) {
    const { label, message, color, style, logo, logoColor } = config;
    // URL: /badge/{label}-{message}-{color}?style=X&logo=Y
    let url = `${this.baseUrl}/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}`;
    const params = new URLSearchParams();
    if (style) params.set('style', style);
    if (logo) params.set('logo', logo);
    if (logoColor) params.set('logoColor', logoColor);
    return params.toString() ? `${url}?${params}` : url;
  }
  
  /**
   * Genera URL de badge dinámico
   */
  generateDynamicBadge(config) {
    // Para badges con datos en tiempo real
    // Implementación específica
  }
  
  /**
   * Preview del badge como Data URL
   */
  async generatePreview(config) {
    const url = this.generateStaticBadge(config);
    const response = await fetch(url);
    const svg = await response.text();
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
}
```

#### 2. TemplateManager.js

```javascript
/**
 * Gestión de templates predefinidos y custom
 */
export class TemplateManager {
  constructor() {
    this.templates = new Map();
    this.categories = [];
    this.loaded = false;
  }
  
  /**
   * Carga templates desde JSON
   */
  async loadTemplates() {
    const categories = [
      'languages', 'frameworks', 'tools', 
      'platforms', 'cicd', 'status', 
      'social', 'metrics'
    ];
    
    for (const category of categories) {
      const response = await fetch(`data/templates/${category}.json`);
      const templates = await response.json();
      templates.forEach(t => {
        t.category = category;
        this.templates.set(t.id, t);
      });
    }
    
    this.loaded = true;
    this.buildCategories();
  }
  
  /**
   * Busca templates
   */
  search(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    for (const template of this.templates.values()) {
      if (template.name.toLowerCase().includes(lowerQuery) ||
          template.category.toLowerCase().includes(lowerQuery)) {
        results.push(template);
      }
    }
    
    return results;
  }
  
  /**
   * Filtra por categoría
   */
  filterByCategory(category) {
    return Array.from(this.templates.values())
      .filter(t => t.category === category);
  }
  
  /**
   * Guarda template custom
   */
  saveCustomTemplate(template) {
    const customTemplates = this.getCustomTemplates();
    customTemplates.push(template);
    localStorage.setItem('custom_templates', 
      JSON.stringify(customTemplates));
    this.templates.set(template.id, template);
  }
  
  getCustomTemplates() {
    const stored = localStorage.getItem('custom_templates');
    return stored ? JSON.parse(stored) : [];
  }
}
```

#### 3. DragDropManager.js

```javascript
/**
 * Sistema completo de Drag & Drop
 */
export class DragDropManager {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.badges = new Map(); // id -> badge element
    this.draggedElement = null;
    this.placeholder = null;
    this.init();
  }
  
  init() {
    this.setupCanvas();
    this.setupSidebar();
    this.setupSortable();
  }
  
  /**
   * Configura zona de drop del canvas
   */
  setupCanvas() {
    this.canvas.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      this.canvas.classList.add('drag-over');
    });
    
    this.canvas.addEventListener('dragleave', () => {
      this.canvas.classList.remove('drag-over');
    });
    
    this.canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      this.canvas.classList.remove('drag-over');
      
      const templateId = e.dataTransfer.getData('template-id');
      if (templateId) {
        this.addBadgeFromTemplate(templateId);
      }
    });
  }
  
  /**
   * Configura drag desde sidebar
   */
  setupSidebar() {
    const templateItems = document.querySelectorAll('.template-item');
    templateItems.forEach(item => {
      item.draggable = true;
      
      item.addEventListener('dragstart', (e) => {
        const templateId = item.dataset.templateId;
        e.dataTransfer.setData('template-id', templateId);
        e.dataTransfer.effectAllowed = 'copy';
        item.classList.add('dragging');
      });
      
      item.addEventListener('dragend', (e) => {
        item.classList.remove('dragging');
      });
    });
  }
  
  /**
   * Sortable en canvas (reordenar)
   */
  setupSortable() {
    // Integración con SortableJS
    if (window.Sortable) {
      new Sortable(this.canvas, {
        animation: 150,
        ghostClass: 'badge-ghost',
        handle: '.badge-handle',
        onEnd: (evt) => {
          this.updateBadgeOrder();
        }
      });
    }
  }
  
  addBadgeFromTemplate(templateId) {
    // Crear elemento badge y añadir al canvas
    const badge = this.createBadgeElement(templateId);
    this.canvas.appendChild(badge);
    this.badges.set(badge.id, badge);
    this.updateBadgeOrder();
  }
  
  createBadgeElement(templateId) {
    // Crear elemento HTML del badge
    const div = document.createElement('div');
    div.className = 'badge-item';
    div.id = `badge-${Date.now()}`;
    // ... construcción del badge
    return div;
  }
  
  removeBadge(badgeId) {
    const badge = this.badges.get(badgeId);
    if (badge) {
      badge.remove();
      this.badges.delete(badgeId);
    }
  }
  
  updateBadgeOrder() {
    // Actualizar orden en storage
    const order = Array.from(this.badges.keys());
    localStorage.setItem('badge_order', JSON.stringify(order));
  }
}
```

#### 4. StorageManager.js

```javascript
/**
 * Gestión de LocalStorage e IndexedDB
 */
export class StorageManager {
  constructor() {
    this.dbName = 'GHBadgesBuilderDB';
    this.dbVersion = 1;
    this.db = null;
  }
  
  /**
   * Inicializa IndexedDB
   */
  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Object stores
        if (!db.objectStoreNames.contains('badges')) {
          const badgeStore = db.createObjectStore('badges', 
            { keyPath: 'id', autoIncrement: true });
          badgeStore.createIndex('timestamp', 'timestamp', { unique: false });
          badgeStore.createIndex('category', 'category', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('templates')) {
          db.createObjectStore('templates', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('history')) {
          const historyStore = db.createObjectStore('history', 
            { keyPath: 'id', autoIncrement: true });
          historyStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }
  
  /**
   * LocalStorage helpers
   */
  saveToLocal(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error saving to localStorage:', e);
      return false;
    }
  }
  
  getFromLocal(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return defaultValue;
    }
  }
  
  /**
   * IndexedDB helpers
   */
  async saveBadge(badge) {
    const transaction = this.db.transaction(['badges'], 'readwrite');
    const store = transaction.objectStore('badges');
    badge.timestamp = Date.now();
    return store.add(badge);
  }
  
  async getAllBadges() {
    const transaction = this.db.transaction(['badges'], 'readonly');
    const store = transaction.objectStore('badges');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async saveToHistory(action) {
    const transaction = this.db.transaction(['history'], 'readwrite');
    const store = transaction.objectStore('history');
    action.timestamp = Date.now();
    return store.add(action);
  }
  
  async getHistory(limit = 50) {
    const transaction = this.db.transaction(['history'], 'readonly');
    const store = transaction.objectStore('history');
    const index = store.index('timestamp');
    
    return new Promise((resolve, reject) => {
      const request = index.openCursor(null, 'prev');
      const results = [];
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor && results.length < limit) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      
      request.onerror = () => reject(request.error);
    });
  }
}
```

#### 5. ExportManager.js

```javascript
/**
 * Sistema de exportación a múltiples formatos
 */
export class ExportManager {
  constructor() {
    this.formats = {
      markdown: this.exportMarkdown.bind(this),
      html: this.exportHTML.bind(this),
      rst: this.exportReStructuredText.bind(this),
      json: this.exportJSON.bind(this),
      urls: this.exportURLs.bind(this)
    };
  }
  
  /**
   * Export a Markdown
   */
  exportMarkdown(badges, options = {}) {
    const { format = 'inline', separator = '\n' } = options;
    
    if (format === 'inline') {
      return badges.map(b => 
        `![${b.label}](${b.url})`
      ).join(separator);
    }
    
    if (format === 'table') {
      let output = '| Badge | Description |\n';
      output += '|-------|-------------|\n';
      badges.forEach(b => {
        output += `| ![${b.label}](${b.url}) | ${b.description || ''} |\n`;
      });
      return output;
    }
    
    if (format === 'list') {
      return badges.map(b => 
        `- ![${b.label}](${b.url})`
      ).join('\n');
    }
  }
  
  /**
   * Export a HTML
   */
  exportHTML(badges, options = {}) {
    const { wrapLinks = false, linkUrl = '' } = options;
    
    return badges.map(b => {
      const img = `<img src="${b.url}" alt="${b.label}" />`;
      return wrapLinks ? `<a href="${linkUrl || b.url}">${img}</a>` : img;
    }).join('\n');
  }
  
  /**
   * Export a reStructuredText
   */
  exportReStructuredText(badges) {
    return badges.map(b => 
      `.. image:: ${b.url}\n   :alt: ${b.label}`
    ).join('\n\n');
  }
  
  /**
   * Export a JSON
   */
  exportJSON(badges, options = {}) {
    const { pretty = true } = options;
    const data = {
      version: '1.0',
      generated: new Date().toISOString(),
      count: badges.length,
      badges: badges.map(b => ({
        id: b.id,
        label: b.label,
        message: b.message,
        color: b.color,
        style: b.style,
        url: b.url,
        config: b.config
      }))
    };
    
    return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  }
  
  /**
   * Export solo URLs
   */
  exportURLs(badges, options = {}) {
    const { separator = '\n' } = options;
    return badges.map(b => b.url).join(separator);
  }
  
  /**
   * Copiar al portapapeles
   */
  async copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.error('Error copying to clipboard:', err);
        return false;
      }
    } else {
      // Fallback para navegadores antiguos
      return this.fallbackCopyToClipboard(text);
    }
  }
  
  fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
  
  /**
   * Descargar como archivo
   */
  downloadFile(content, filename, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
```

---

## 🚀 Despliegue

### GitHub Pages (Recomendado)

```yaml
github_pages_deployment:
  method_1_classic:
    steps:
      - Crear repositorio en GitHub
      - Push del código
      - Ir a Settings > Pages
      - Source: Deploy from branch
      - Branch: main (o gh-pages)
      - Folder: / (root) o /docs
      - Save
      - Esperar deploy (~2 min)
      - Acceder a: https://username.github.io/repo-name/
    
    custom_domain:
      - Añadir CNAME file con dominio
      - Configurar DNS:
          - A records: 185.199.108.153, 185.199.109.153, 
                       185.199.110.153, 185.199.111.153
          - CNAME: username.github.io
      - Enable HTTPS en settings
  
  method_2_actions:
    file: .github/workflows/deploy.yml
    content: |
      name: Deploy to GitHub Pages
      on:
        push:
          branches: [main]
      jobs:
        deploy:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v3
            - name: Deploy to GitHub Pages
              uses: peaceiris/actions-gh-pages@v3
              with:
                github_token: ${{ secrets.GITHUB_TOKEN }}
                publish_dir: ./
    
  advantages:
    - Deploy automático en cada push
    - HTTPS gratis
    - CDN global
    - Dominio custom gratuito
    - Zero configuration
    - Serverless

local_deployment:
  method_1_direct:
    description: "Abrir directamente index.html"
    steps:
      - git clone https://github.com/username/GH-Badges-Builder.git
      - cd GH-Badges-Builder
      - Doble click en index.html
      - O arrastrar index.html al navegador
    
    limitations:
      - Algunas APIs pueden requerir HTTP server
      - CORS puede dar problemas con fetch local
      - Service Worker no funciona con file://
  
  method_2_http_server:
    description: "Servidor HTTP simple"
    options:
      python3: "python -m http.server 8000"
      python2: "python -m SimpleHTTPServer 8000"
      node: "npx http-server -p 8000"
      php: "php -S localhost:8000"
      ruby: "ruby -run -e httpd . -p 8000"
    
    then: "Abrir http://localhost:8000"
    
    advantages:
      - Service Worker funciona
      - No problemas de CORS
      - Testing más realista
      - PWA instalable

pwa_installation:
  requirements:
    - HTTPS (GitHub Pages automático)
    - manifest.json
    - service-worker.js
    - Icons 192x192 y 512x512
  
  install:
    desktop: "Icono + en barra de direcciones"
    mobile: "Menú > Añadir a pantalla de inicio"
  
  benefits:
    - Funciona offline
    - Icono en escritorio/home
    - Fullscreen experience
    - Push notifications (futuro)
```

---

## 🎯 Capacidades del Agente (Actualizado)

### 1. Gestión de Templates (Client-Side)

```yaml
template_management:
  storage:
    predefined: "JSON files en /data/templates/"
    custom: "LocalStorage + IndexedDB"
    cache: "Service Worker cache"
  
  operations:
    - load: Cargar desde JSON async
    - search: Búsqueda client-side instantánea
    - filter: Filtros por categoría en memoria
    - create: Crear custom y guardar en LocalStorage
    - edit: Editar custom templates
    - delete: Eliminar de LocalStorage
    - import: Import JSON/YAML desde archivo
    - export: Export custom templates como JSON
  
  data_structure:
    file: data/templates/languages.json
    format: |
      [
        {
          "id": "python",
          "name": "Python",
          "category": "languages",
          "label": "Python",
          "message": "3.10+",
          "color": "3776AB",
          "logo": "python",
          "logoColor": "white",
          "style": "for-the-badge",
          "description": "Python language badge",
          "tags": ["language", "backend", "scripting"],
          "popular": true
        }
      ]
```

### 2. Badge Generation (100% Client-Side)

```yaml
badge_generation:
  engine: "JavaScript URL builder"
  shields_api: "https://img.shields.io"
  
  url_patterns:
    static: "/badge/{label}-{message}-{color}"
    custom: "/badge/{custom_text}"
    endpoint: "/endpoint?url={json_endpoint}"
  
  processing:
    - Validación de inputs client-side
    - Sanitización de caracteres especiales
    - URL encoding automático
    - Preview generation con fetch
    - Cache de badges generados
  
  preview:
    method: "Fetch badge SVG + display"
    cache: "Cache-API para performance"
    fallback: "Placeholder si falla fetch"
```

### 3. Drag & Drop (SortableJS + Vanilla JS)

```yaml
drag_drop_system:
  library: "SortableJS 1.15.0 (CDN)"
  fallback: "Vanilla JS implementation"
  
  features:
    - Drag from sidebar to canvas
    - Reorder on canvas
    - Multi-select con Ctrl/Cmd
    - Visual feedback y ghost
    - Touch support para mobile
    - Keyboard accessibility
  
  persistence:
    state: "LocalStorage"
    positions: "Array de IDs ordenados"
    restore: "On page load"
```

### 4. Storage Strategy (Offline-First)

```yaml
storage_architecture:
  localstorage:
    use_for:
      - User preferences
      - Theme selection
      - Favorites list
      - Recent badges (últimos 20)
      - UI state (sidebar collapsed, etc)
    
    size_limit: "5-10 MB (browser dependent)"
    format: "JSON strings"
  
  indexeddb:
    use_for:
      - Badge history (unlimited)
      - Custom templates
      - Template cache
      - Export history
    
    size_limit: "50MB+ (browser dependent)"
    format: "JavaScript objects"
    
    stores:
      - badges: Badge history
      - templates: Custom templates
      - history: Action history
      - cache: Template cache
  
  service_worker_cache:
    use_for:
      - Static assets (CSS, JS, images)
      - Template JSON files
      - CDN resources
      - Badge SVGs
    
    strategy: "Cache-first with fallback"
    update: "Background sync"
```

### 5. Export System (Client-Side)

```yaml
export_capabilities:
  formats:
    markdown:
      - inline: ![Label](url)
      - table: | Badge | Description |
      - list: - ![Label](url)
    
    html:
      - img_tags: <img src="url">
      - linked: <a><img></a>
    
    rst:
      - directive: .. image:: url
    
    json:
      - structured: Full config export
      - pretty: Formatted JSON
    
    urls:
      - plain: URL list
      - csv: CSV format
  
  methods:
    clipboard:
      api: "navigator.clipboard.writeText()"
      fallback: "document.execCommand('copy')"
    
    download:
      api: "Blob + URL.createObjectURL()"
      formats: ".md, .html, .json, .txt"
    
    share:
      api: "navigator.share() (mobile)"
      fallback: "Copy + notification"
```

### 6. PWA Features

```yaml
progressive_web_app:
  manifest:
    file: manifest.json
    properties:
      name: "GH Badges Builder"
      short_name: "Badges"
      start_url: "/"
      display: "standalone"
      theme_color: "#32B8C6"
      background_color: "#FCFCF9"
      icons: ["192x192", "512x512"]
  
  service_worker:
    file: sw.js
    strategies:
      - cache_first: Static assets
      - network_first: Template JSON
      - stale_while_revalidate: Badges
    
    offline:
      - Full app funciona offline
      - Cached templates disponibles
      - Generación de badges offline
      - Solo requiere conexión inicial
  
  installability:
    prompt: "Automático en navegadores compatibles"
    criteria:
      - HTTPS
      - manifest.json válido
      - Service Worker registrado
      - Icons correctos
```

---

## 🧪 Testing (Client-Side)

```yaml
testing_strategy:
  unit_tests:
    framework: "QUnit o Mocha (browser)"
    runner: "tests/index.html"
    coverage: "Manual o Istanbul"
    
    tests:
      - BadgeGenerator: URL generation
      - TemplateManager: CRUD operations
      - ExportManager: Format conversions
      - StorageManager: LocalStorage/IndexedDB
  
  integration_tests:
    - Full workflow: Template to export
    - Storage persistence
    - Theme switching
    - Multi-badge operations
  
  e2e_tests:
    tools: "Playwright o Cypress"
    scenarios:
      - Create single badge
      - Batch creation
      - Custom template creation
      - Export workflow
  
  manual_testing:
    browsers:
      - Chrome 90+
      - Firefox 88+
      - Safari 14+
      - Edge 90+
    
    devices:
      - Desktop (Windows, Mac, Linux)
      - Mobile (iOS, Android)
    
    features:
      - Drag & Drop
      - Touch gestures
      - Keyboard navigation
      - Offline functionality
```

---

## 📊 Performance Optimization

```yaml
performance:
  metrics_target:
    first_contentful_paint: "<1s"
    time_to_interactive: "<2s"
    largest_contentful_paint: "<2.5s"
    cumulative_layout_shift: "<0.1"
  
  optimizations:
    html:
      - Semantic markup
      - Minimal DOM depth
      - Defer non-critical JS
      - Async load templates
    
    css:
      - Critical CSS inline
      - Non-critical deferred
      - CSS containment
      - Will-change properties
    
    javascript:
      - ES6 modules
      - Code splitting
      - Lazy loading
      - Web Workers for heavy processing
    
    assets:
      - Image optimization (WebP)
      - SVG for icons
      - Lazy load images
      - Sprite sheets
    
    caching:
      - Service Worker aggressive cache
      - LocalStorage para preferences
      - IndexedDB para data
      - HTTP cache headers
    
    network:
      - CDN para libraries
      - Minimize requests
      - Preconnect to shields.io
      - Resource hints (prefetch, preload)
```

---

## 🔒 Seguridad

```yaml
security_considerations:
  xss_prevention:
    - Sanitize all user inputs
    - Use textContent instead of innerHTML
    - Validate color codes
    - Escape special characters in URLs
  
  cors:
    - Use shields.io official API
    - Proxy para recursos externos si necesario
    - Handle CORS errors gracefully
  
  storage:
    - No sensitive data en LocalStorage
    - Validate data before save
    - Implement size limits
    - Clear old data periodically
  
  dependencies:
    - Use CDN con Subresource Integrity (SRI)
    - Minimal external dependencies
    - Regular security updates
    - Fallback si CDN falla
```

---

## 🌍 Internacionalización

```yaml
i18n:
  supported_languages:
    - es: Español (default)
    - en: English
    - pt: Português
  
  implementation:
    method: "JSON language files + JS"
    location: "data/i18n/"
    detection: "navigator.language"
    storage: "LocalStorage preference"
  
  translatable:
    - UI labels y botones
    - Messages y notifications
    - Template descriptions
    - Help tooltips
    - Error messages
  
  format:
    file: data/i18n/es.json
    structure: |
      {
        "app": {
          "title": "Constructor de Badges",
          "subtitle": "Crea badges profesionales"
        },
        "buttons": {
          "export": "Exportar",
          "clear": "Limpiar",
          "copy": "Copiar"
        },
        "messages": {
          "copied": "Copiado al portapapeles",
          "error": "Error al generar badge"
        }
      }
```

---

## 🎨 Temas y Accesibilidad

```yaml
theming:
  modes:
    - light: Default
    - dark: Dark mode
    - auto: System preference
  
  implementation:
    method: "CSS Custom Properties + prefers-color-scheme"
    storage: "LocalStorage: theme_preference"
    toggle: "Button en header"
  
  colors:
    light:
      primary: "#32B8C6"
      background: "#FCFCF9"
      surface: "#FFFFFF"
      text: "#134252"
    
    dark:
      primary: "#32B8C6"
      background: "#1F2121"
      surface: "#262828"
      text: "#F5F5F5"

accessibility:
  wcag_level: "AA (minimum)"
  features:
    - Semantic HTML5
    - ARIA labels
    - Keyboard navigation
    - Focus indicators
    - Color contrast 4.5:1
    - Screen reader support
    - Alt text para images
    - Skip links
  
  keyboard_shortcuts:
    - Ctrl/Cmd + N: New badge
    - Ctrl/Cmd + S: Save
    - Ctrl/Cmd + E: Export
    - Ctrl/Cmd + Z: Undo
    - Ctrl/Cmd + Y: Redo
    - Delete: Remove badge
    - Escape: Close modal
    - Tab: Navigate
    - Enter: Confirm
```

---

## 📦 Dependencias Externas (CDN)

```yaml
external_libraries:
  sortablejs:
    version: "1.15.0"
    cdn: "https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"
    sri: "sha384-..."
    fallback: "Local copy en /js/vendor/"
    usage: "Drag & Drop functionality"
  
  simple_icons_data:
    version: "latest"
    cdn: "https://unpkg.com/simple-icons@latest/icons.json"
    fallback: "Local copy en /data/icons/"
    usage: "Icon database"
  
  highlight_js:
    version: "11.9.0"
    cdn: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/"
    optional: true
    usage: "Code syntax highlighting"
  
  color_js:
    version: "4.2.0"
    cdn: "https://cdn.jsdelivr.net/npm/colorjs.io@4.2.0/"
    optional: true
    usage: "Advanced color picker"

cdn_strategy:
  primary: "Use CDN with SRI"
  fallback: "Local copy if CDN fails"
  check: "Check if loaded before app init"
  timeout: "5 seconds max"
```

---

## 🚀 Roadmap (Static Web App)

### v1.0 - MVP ✓
- [x] Static web app architecture
- [x] Core badge generation
- [x] Drag & Drop básico
- [x] 500+ templates
- [x] Export Markdown/HTML
- [x] LocalStorage persistence
- [x] GitHub Pages ready

### v1.5 - Enhanced
- [ ] PWA completo con Service Worker
- [ ] IndexedDB full implementation
- [ ] Batch operations avanzadas
- [ ] Custom gradients
- [ ] Template marketplace (GitHub-based)
- [ ] Multi-language (i18n)

### v2.0 - Advanced
- [ ] GitHub API integration (live stats)
- [ ] WebAssembly para processing pesado
- [ ] Real-time collaboration (WebRTC)
- [ ] AI-powered badge suggestions
- [ ] Plugin system
- [ ] Community templates repository

---

## 📄 Licencia

MIT License - Ver LICENSE file

---

## 📞 Soporte

- GitHub Issues: Bug reports y features
- GitHub Discussions: Preguntas y comunidad
- Wiki: Documentación extendida

---

**Versión**: 2.0.0  
**Arquitectura**: Static Web App  
**Deployment**: GitHub Pages + Local  
**Última Actualización**: Diciembre 2, 2025
