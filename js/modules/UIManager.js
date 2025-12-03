import { BadgeGenerator } from './BadgeGenerator.js';

export class UIManager {
    constructor() {
        this.elements = {
            canvas: document.getElementById('badge-canvas'),
            sidebar: document.getElementById('sidebar'),
            panel: document.getElementById('customization-panel'),
            notificationContainer: document.getElementById('notification-container')
        };
        this.listeners = {};
    }

    renderBadges(badges) {
        const container = this.elements.canvas;
        container.innerHTML = '';

        if (badges.length === 0) {
            container.innerHTML = `
                <div class="canvas-empty-state">
                    <svg class="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                    <p class="empty-text">Arrastra templates aquí o haz click en "Custom Badge"</p>
                </div>
            `;
            return;
        }

        badges.forEach((badge, index) => {
            const el = document.createElement('div');
            el.className = 'badge-item';
            el.dataset.index = index;
            
            // Apply animation if present
            if (badge.animation) {
                el.dataset.animation = badge.animation;
            }
            
            el.innerHTML = BadgeGenerator.generateHtml(badge);
            el.onclick = () => this.trigger('badge-select', index);
            container.appendChild(el);
        });
    }

    renderTemplates(category, templates, onSelect) {
        const container = document.getElementById(`category-${category}`);
        if (!container) return;

        container.innerHTML = '';
        templates.forEach(template => {
            const btn = document.createElement('button');
            btn.className = 'badge-item';
            btn.title = template.name;
            btn.dataset.template = JSON.stringify(template);
            
            // Apply animation if present (for animated category)
            if (template.animation) {
                btn.dataset.animation = template.animation;
            }
            
            btn.innerHTML = BadgeGenerator.generateHtml(template);
            btn.onclick = () => onSelect(template);
            container.appendChild(btn);
        });
    }

    showNotification(message, type = 'info') {
        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.textContent = message;

        this.elements.notificationContainer.appendChild(notif);

        setTimeout(() => {
            notif.remove();
        }, 3000);
    }

    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    trigger(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }

    renderCustomizationForm(badge) {
        const panel = this.elements.panel;
        const content = panel.querySelector('.panel-content');

        if (!badge) {
            content.innerHTML = `
                <div class="panel-empty-state">
                    Selecciona un badge para personalizarlo
                </div>
            `;
            return;
        }

        content.innerHTML = `
            <div class="form-group mb-3">
                <label class="form-label">Label (Izquierda)</label>
                <input type="text" class="form-control" id="badge-label" value="${badge.label || ''}">
            </div>
            
            <div class="form-group mb-3">
                <label class="form-label">Mensaje (Derecha)</label>
                <input type="text" class="form-control" id="badge-message" value="${badge.message || ''}">
            </div>

            <div class="form-group mb-3">
                <label class="form-label">Color</label>
                <input type="color" class="form-control form-control-color" id="badge-color" value="#${badge.color || '32B8C6'}" title="Choose your color">
            </div>

            <div class="form-group mb-3">
                <label class="form-label">Estilo</label>
                <select class="form-select" id="badge-style">
                    <option value="flat" ${badge.style === 'flat' ? 'selected' : ''}>Flat</option>
                    <option value="flat-square" ${badge.style === 'flat-square' ? 'selected' : ''}>Flat Square</option>
                    <option value="for-the-badge" ${badge.style === 'for-the-badge' ? 'selected' : ''}>For the Badge</option>
                    <option value="plastic" ${badge.style === 'plastic' ? 'selected' : ''}>Plastic</option>
                    <option value="social" ${badge.style === 'social' ? 'selected' : ''}>Social</option>
                </select>
            </div>

            <div class="form-group mb-3">
                <label class="form-label">Logo (Simple Icons)</label>
                <input type="text" class="form-control" id="badge-logo" value="${badge.logo || ''}" placeholder="ej. github">
            </div>

            <div class="form-group mb-3">
                <label class="form-label">Color del Logo</label>
                <input type="text" class="form-control" id="badge-logo-color" value="${badge.logoColor || ''}" placeholder="ej. white">
            </div>
            
            <div class="mt-4">
                <button id="delete-badge-btn" class="btn btn-sm btn-block" style="color: var(--color-error); border-color: var(--color-error);">
                    Eliminar Badge
                </button>
            </div>
        `;
    }
}
