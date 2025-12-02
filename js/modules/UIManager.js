import { BadgeGenerator } from './BadgeGenerator.js';

export class UIManager {
    constructor() {
        this.elements = {
            canvas: document.getElementById('badge-canvas'),
            sidebar: document.getElementById('sidebar'),
            panel: document.getElementById('customization-panel'),
            notificationContainer: document.getElementById('notification-container')
        };
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

    // Event bus simulation
    listeners = {};
    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }
    trigger(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }
}
