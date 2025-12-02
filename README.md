# 🎨 GH-Badges-Builder

<div align="center">

![GH-Badges-Builder Banner](assets/images/banner.png)

**Constructor Interactivo de Badges Profesionales para GitHub README**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit-32B8C6?style=for-the-badge)](https://tu-usuario.github.io/GH-Badges-Builder/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Ready-success?style=for-the-badge&logo=github)](https://pages.github.com/)
[![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![No Backend](https://img.shields.io/badge/Backend-None-blue?style=for-the-badge)](https://github.com)
[![Offline Capable](https://img.shields.io/badge/Offline-Capable-orange?style=for-the-badge)](https://github.com)

**[✨ Demo Online](#-demo-online) • [🚀 Inicio Rápido](#-inicio-rápido) • [📖 Documentación](#-documentación) • [🤝 Contribuir](#-contribuir)**

</div>

---

## 🌟 ¿Qué es GH-Badges-Builder?

**GH-Badges-Builder** es una aplicación web **100% client-side** (sin backend) que te permite crear badges/shields profesionales para tus proyectos GitHub de forma rápida, intuitiva y completamente personalizable. 

### ✨ Características Destacadas

🎯 **Interfaz Drag & Drop** visual y fluida  
📦 **500+ Templates** predefinidos listos para usar  
🎨 **3000+ Iconos** de plataformas y frameworks  
🌈 **Personalización Total** colores, estilos, gradientes  
⚡ **Generación Instantánea** individual o en lote  
📋 **Export Multiformato** Markdown, HTML, JSON, URLs  
💾 **Funciona Offline** después de primera carga  
🌐 **GitHub Pages** deploy con un click  
📱 **Progressive Web App** instálala como app nativa  
🎭 **Modo Claro/Oscuro** automático o manual

---

## 🚀 Inicio Rápido

### Opción 1: Usar Online (Recomendado)

**Simplemente visita la app desplegada en GitHub Pages:**

👉 **[https://tu-usuario.github.io/GH-Badges-Builder/](https://tu-usuario.github.io/GH-Badges-Builder/)**

¡No requiere instalación! Funciona directamente en tu navegador.

---

### Opción 2: Descargar y Usar Localmente

#### Método A: Abrir Directamente (Más Simple)

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/GH-Badges-Builder.git
cd GH-Badges-Builder

# 2. Abrir index.html en tu navegador
# Simplemente doble click en index.html
# O arrastrar el archivo al navegador
```

#### Método B: Con Servidor Local (Recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/GH-Badges-Builder.git
cd GH-Badges-Builder

# 2. Iniciar servidor HTTP simple
# Opción Python 3:
python -m http.server 8000

# Opción Python 2:
python -m SimpleHTTPServer 8000

# Opción Node.js:
npx http-server -p 8000

# Opción PHP:
php -S localhost:8000

# 3. Abrir en navegador
# http://localhost:8000
```

**¿Por qué usar servidor local?**
- ✅ Service Worker funciona (PWA)
- ✅ Sin problemas de CORS
- ✅ Simula producción
- ✅ Instalable como app

---

### Opción 3: Desplegar en Tu GitHub Pages

```bash
# 1. Fork este repositorio en GitHub
# Click en "Fork" arriba a la derecha

# 2. Ir a Settings > Pages
# Source: Deploy from branch
# Branch: main
# Folder: / (root)
# Save

# 3. Esperar ~2 minutos
# Tu app estará en: https://tu-usuario.github.io/GH-Badges-Builder/
```

**¡Listo! Tu propia instancia corriendo en GitHub Pages gratuitamente.**

---

## 📸 Capturas de Pantalla

### 🎨 Interfaz Principal

<div align="center">
<img src="docs/screenshots/main-interface.png" alt="Interfaz Principal" width="800"/>

*Vista principal con sidebar de templates, canvas de badges y panel de personalización*
</div>

---

### 🎯 Drag & Drop en Acción

<div align="center">
<img src="docs/screenshots/drag-drop.png" alt="Drag and Drop" width="800"/>

*Arrastra templates desde el sidebar y suéltalos en el canvas*
</div>

---

### 🎨 Personalización Avanzada

<div align="center">
<img src="docs/screenshots/customization.png" alt="Panel de Personalización" width="800"/>

*Personaliza colores, iconos, estilos y formatos en tiempo real*
</div>

---

### 📤 Export Multiformato

<div align="center">
<img src="docs/screenshots/export-modal.png" alt="Export Modal" width="600"/>

*Exporta a Markdown, HTML, JSON, URLs y más*
</div>

---

## 💡 Uso Básico

### 1️⃣ Crear Badge Individual

```
┌─────────────────────────────────────────────┐
│ 1. Busca "Python" en el sidebar            │
│ 2. Click o arrastra al canvas              │
│ 3. Personaliza en panel derecho:           │
│    - Color: #3776AB                         │
│    - Estilo: for-the-badge                  │
│    - Icono: python                          │
│ 4. Click "Copy Markdown"                    │
└─────────────────────────────────────────────┘
```

**Output:**
```markdown
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
```

**Preview:**  
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)

---

### 2️⃣ Crear Stack Tecnológico Completo

```
┌─────────────────────────────────────────────┐
│ 1. Selecciona múltiples con Ctrl+Click:    │
│    - Python                                 │
│    - Flask                                  │
│    - Docker                                 │
│    - PostgreSQL                             │
│ 2. Arrastra todos al canvas                │
│ 3. Auto-alinea con "Layout > Horizontal"   │
│ 4. Export > Batch > Markdown               │
└─────────────────────────────────────────────┘
```

**Output:**
```markdown
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?logo=flask&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
```

**Preview:**  
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?logo=flask&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)

---

### 3️⃣ Badge Custom desde Cero

```
┌─────────────────────────────────────────────┐
│ 1. Click "Custom Badge" en toolbar         │
│ 2. Introduce datos:                        │
│    Label: "Status"                          │
│    Message: "Active"                        │
│    Color: #10B981 (verde)                   │
│    Style: for-the-badge                     │
│ 3. Buscar icono: "check"                    │
│ 4. Save as favorite para reutilizar        │
└─────────────────────────────────────────────┘
```

**Output:**
```markdown
![Status](https://img.shields.io/badge/Status-Active-10B981?style=for-the-badge&logo=checkmarx&logoColor=white)
```

---

## 🎨 Categorías de Templates

### 📦 Templates Incluidos (500+)

| Categoría | Cantidad | Ejemplos |
|-----------|----------|----------|
| 🔤 **Lenguajes** | 50+ | Python, JavaScript, TypeScript, Java, C++, Go, Rust, Ruby, PHP, Swift |
| 🎯 **Frameworks** | 80+ | React, Vue, Angular, Django, Flask, FastAPI, Spring, Express, Next.js |
| 🛠️ **Herramientas** | 100+ | Docker, Git, VS Code, Postman, Figma, Notion, Slack, Jira |
| ☁️ **Plataformas** | 60+ | GitHub, AWS, Azure, GCP, Heroku, Vercel, Netlify, DigitalOcean |
| 🔄 **CI/CD** | 40+ | GitHub Actions, Travis CI, CircleCI, Jenkins, GitLab CI, Azure Pipelines |
| 📊 **Status** | 70+ | Build, Tests, Coverage, License, Version, Downloads, Security |
| 💬 **Social** | 50+ | Twitter, LinkedIn, Discord, YouTube, Reddit, Medium, Dev.to |
| 📈 **Métricas** | 50+ | Stars, Forks, Issues, Contributors, Watchers, Downloads |

**Total: 500+ templates predefinidos listos para usar**

---

## 🎭 Estilos Disponibles

<table>
<tr>
<th>Estilo</th>
<th>Preview</th>
<th>Uso</th>
</tr>
<tr>
<td><code>flat</code></td>
<td><img src="https://img.shields.io/badge/Flat-Example-blue?style=flat" alt="Flat"></td>
<td>Default, discreto</td>
</tr>
<tr>
<td><code>flat-square</code></td>
<td><img src="https://img.shields.io/badge/Flat_Square-Example-blue?style=flat-square" alt="Flat Square"></td>
<td>Moderno, cuadrado</td>
</tr>
<tr>
<td><code>for-the-badge</code></td>
<td><img src="https://img.shields.io/badge/For_the_Badge-Example-blue?style=for-the-badge" alt="For the Badge"></td>
<td>Destacado, grande</td>
</tr>
<tr>
<td><code>plastic</code></td>
<td><img src="https://img.shields.io/badge/Plastic-Example-blue?style=plastic" alt="Plastic"></td>
<td>3D, brillante</td>
</tr>
<tr>
<td><code>social</code></td>
<td><img src="https://img.shields.io/badge/Social-Example-blue?style=social" alt="Social"></td>
<td>Estilo GitHub</td>
</tr>
</table>

---

## 📋 Formatos de Export

### Markdown

```markdown
# Inline
![Python](https://img.shields.io/badge/Python-3.10+-3776AB)

# Table
| Badge | Description |
|-------|-------------|
| ![Python](url) | Python badge |

# List
- ![Python](url)
- ![Flask](url)
```

### HTML

```html
<!-- Simple -->
<img src="https://img.shields.io/badge/Python-3.10+-3776AB" alt="Python">

<!-- Con Link -->
<a href="https://python.org">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB" alt="Python">
</a>
```

### JSON

```json
{
  "version": "1.0",
  "generated": "2025-12-02T09:00:00Z",
  "badges": [
    {
      "id": "badge-1",
      "label": "Python",
      "message": "3.10+",
      "color": "3776AB",
      "url": "https://img.shields.io/badge/Python-3.10+-3776AB"
    }
  ]
}
```

### URLs (Plain)

```
https://img.shields.io/badge/Python-3.10+-3776AB
https://img.shields.io/badge/Flask-3.0-000000
https://img.shields.io/badge/Docker-2496ED
```

---

## 🎯 Casos de Uso

### 📚 Proyecto Open Source

```markdown
# Awesome Open Source Project

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python)
![Stars](https://img.shields.io/github/stars/usuario/proyecto?style=flat-square)
![Issues](https://img.shields.io/github/issues/usuario/proyecto?style=flat-square)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)
![Contributors](https://img.shields.io/github/contributors/usuario/proyecto?style=flat-square)
```

**Preview:**  
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python)
![Stars](https://img.shields.io/badge/Stars-1.2k-yellow?style=flat-square)
![Issues](https://img.shields.io/badge/Issues-12-blue?style=flat-square)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

---

### 💼 Proyecto Empresarial

```markdown
# Enterprise Application Platform

![Build](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-95%25-success?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-87%25-green?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-A+-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.5.3-orange?style=for-the-badge)
```

**Preview:**  
![Build](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-95%25-success?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-87%25-green?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-A+-blue?style=for-the-badge)

---

### 🎓 Portfolio Personal

```markdown
# 👋 Hola, soy [Tu Nombre]

### 📫 Contáctame

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tu-perfil)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tu-usuario)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://tu-portfolio.com)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tu@email.com)

### 🛠️ Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
```

---

## 🔧 Características Técnicas

### 🌐 Arquitectura Client-Side

- **HTML5**: Semantic markup, accesible
- **CSS3**: Custom Properties, Grid, Flexbox, Animations
- **JavaScript ES6+**: Modules, async/await, Web APIs
- **Sin Backend**: 100% client-side, sin servidor
- **Sin Base de Datos**: LocalStorage + IndexedDB
- **Sin Build Tools**: Funciona directamente en navegador

### 💾 Almacenamiento Local

- **LocalStorage**: Preferencias, favoritos, historial reciente
- **IndexedDB**: Templates, historial completo, cache
- **SessionStorage**: Estado temporal de sesión
- **Service Worker**: Cache offline, PWA

### 🚀 Performance

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 95+
- **Bundle Size**: ~200KB (sin minificar)
- **Offline Capable**: Sí (con Service Worker)

### 📱 Progressive Web App (PWA)

- ✅ Instalable en escritorio y móvil
- ✅ Funciona offline
- ✅ Notificaciones push (futuro)
- ✅ Icono en home screen
- ✅ Fullscreen experience

---

## 📖 Documentación Completa

### 📂 Estructura del Proyecto

```
GH-Badges-Builder/
├── index.html              # Punto de entrada
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── css/
│   ├── main.css           # Estilos principales
│   ├── components.css     # Componentes
│   └── themes.css         # Temas claro/oscuro
├── js/
│   ├── app.js             # Inicialización
│   ├── modules/           # Módulos ES6
│   │   ├── BadgeGenerator.js
│   │   ├── TemplateManager.js
│   │   ├── DragDropManager.js
│   │   ├── ExportManager.js
│   │   └── StorageManager.js
│   └── utils/             # Utilidades
├── data/
│   ├── templates/         # Templates JSON
│   │   ├── languages.json
│   │   ├── frameworks.json
│   │   └── ...
│   └── icons/            # Simple Icons data
├── assets/
│   └── images/           # Imágenes y logos
└── docs/                 # Documentación
```

### 🎨 Personalización

#### Añadir Templates Custom

Edita `data/templates/custom.json`:

```json
[
  {
    "id": "my-badge",
    "name": "Mi Badge",
    "category": "custom",
    "label": "Custom",
    "message": "Badge",
    "color": "FF6B6B",
    "logo": "react",
    "logoColor": "white",
    "style": "for-the-badge",
    "description": "Mi badge personalizado",
    "tags": ["custom"]
  }
]
```

#### Cambiar Tema por Defecto

En `js/config.js`:

```javascript
export const CONFIG = {
  defaultTheme: 'dark', // 'light', 'dark', 'auto'
  defaultStyle: 'for-the-badge',
  defaultFormat: 'markdown',
  maxBadges: 100
};
```

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Abrir suite de tests en navegador
open tests/index.html

# O con servidor local
python -m http.server 8000
# Visitar http://localhost:8000/tests/
```

### Tests Incluidos

- ✅ Unit tests: Módulos individuales
- ✅ Integration tests: Workflows completos
- ✅ E2E tests: Flujos de usuario
- ✅ Performance tests: Métricas de rendimiento

---

## 🌍 Idiomas Soportados

- 🇪🇸 **Español** (default)
- 🇬🇧 **English**
- 🇧🇷 **Português**

**Cambiar idioma**: Settings > Language

---

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd + N` | Nuevo badge |
| `Ctrl/Cmd + S` | Guardar estado |
| `Ctrl/Cmd + E` | Exportar |
| `Ctrl/Cmd + C` | Copiar seleccionado |
| `Ctrl/Cmd + Z` | Deshacer |
| `Ctrl/Cmd + Y` | Rehacer |
| `Delete` | Eliminar badge |
| `Escape` | Cerrar modal |
| `Tab` | Navegar |
| `Enter` | Confirmar |

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 🎉

### Cómo Contribuir

1. **Fork** el repositorio
2. **Crea** una rama: `git checkout -b feature/nueva-feature`
3. **Commit** cambios: `git commit -m 'feat: añadir nueva feature'`
4. **Push**: `git push origin feature/nueva-feature`
5. **Pull Request**: Abre un PR con descripción detallada

### Áreas de Contribución

- 🎨 **Templates**: Añadir nuevos templates
- 🔍 **Iconos**: Integrar más iconos
- ✨ **Features**: Nuevas funcionalidades
- 🐛 **Bugs**: Reportar/corregir bugs
- 📖 **Docs**: Mejorar documentación
- 🧪 **Tests**: Añadir tests
- 🌍 **i18n**: Traducciones

### Guías de Estilo

- **HTML**: Semantic, accesible
- **CSS**: BEM methodology
- **JavaScript**: Standard JS, ESLint
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`)

---

## 🐛 Reportar Bugs

¿Encontraste un bug? [Abre un issue](https://github.com/tu-usuario/GH-Badges-Builder/issues/new?template=bug_report.md)

**Incluye:**
- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Navegador y versión
- Sistema operativo

---

## 💡 Solicitar Features

¿Tienes una idea? [Abre un issue](https://github.com/tu-usuario/GH-Badges-Builder/issues/new?template=feature_request.md)

**Describe:**
- Funcionalidad deseada
- Caso de uso
- Beneficios
- Mockups (opcional)

---

## 📜 Changelog

Ver [CHANGELOG.md](CHANGELOG.md) para historial de versiones.

---

## 🗺️ Roadmap

Ver [ROADMAP.md](ROADMAP.md) para planes futuros.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.

```
MIT License

Copyright (c) 2025 GH-Badges-Builder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
...
```

---

## 🙏 Agradecimientos

- **[Shields.io](https://shields.io)** - API de generación de badges
- **[Simple Icons](https://simpleicons.org)** - Iconos de marcas (3000+)
- **[SortableJS](https://sortablejs.github.io/Sortable/)** - Librería Drag & Drop
- **[GitHub Pages](https://pages.github.com)** - Hosting gratuito
- **Comunidad Open Source** - Contribuciones y feedback

---

## 🌟 Proyectos Similares

- [shields.io](https://shields.io) - Servicio original de badges
- [markdown-badges](https://github.com/ileriayo/markdown-badges) - Colección de badges
- [simple-icons](https://simpleicons.org) - Iconos SVG de marcas
- [badge-maker](https://github.com/badges/shields) - Generador shields oficial

---

## 📊 Estadísticas del Proyecto

![Repo Size](https://img.shields.io/github/repo-size/tu-usuario/GH-Badges-Builder?style=flat-square)
![Code Size](https://img.shields.io/github/languages/code-size/tu-usuario/GH-Badges-Builder?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/tu-usuario/GH-Badges-Builder?style=flat-square)
![Commit Activity](https://img.shields.io/github/commit-activity/m/tu-usuario/GH-Badges-Builder?style=flat-square)

---

## 📞 Soporte y Contacto

- 📧 **Email**: support@gh-badges-builder.dev
- 💬 **Discord**: [Únete al servidor](https://discord.gg/tu-invite)
- 🐦 **Twitter**: [@GHBadgesBuilder](https://twitter.com/GHBadgesBuilder)
- 💼 **LinkedIn**: [GH Badges Builder](https://linkedin.com/company/gh-badges-builder)

---

## ⭐ Star History

Si este proyecto te resulta útil, ¡considera darle una estrella! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=tu-usuario/GH-Badges-Builder&type=Date)](https://star-history.com/#tu-usuario/GH-Badges-Builder&Date)

---

## 🏆 Showcases

### Proyectos Usando GH-Badges-Builder

¿Usas esta herramienta? [Añade tu proyecto aquí](https://github.com/tu-usuario/GH-Badges-Builder/issues/new?template=showcase.md)

---

<div align="center">

### 🚀 Desplegado con GitHub Pages

**[Ver Demo Online →](https://tu-usuario.github.io/GH-Badges-Builder/)**

---

**[⬆️ Volver arriba](#-gh-badges-builder)**

---

Hecho con ❤️ por la comunidad Open Source

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-💚-green?style=for-the-badge)
![No Backend](https://img.shields.io/badge/No%20Backend-⚡-blue?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-orange?style=for-the-badge)

</div>
