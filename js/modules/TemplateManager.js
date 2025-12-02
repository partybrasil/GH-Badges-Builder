export class TemplateManager {
    constructor() {
        this.templates = new Map();
        this.categories = new Set();
    }

    async loadTemplates() {
        const categories = ['languages', 'frameworks', 'tools'];

        for (const category of categories) {
            try {
                const response = await fetch(`data/templates/${category}.json`);
                if (!response.ok) throw new Error(`Failed to load ${category}`);
                const data = await response.json();

                this.templates.set(category, data);
                this.categories.add(category);
            } catch (error) {
                console.error(`Error loading templates for ${category}:`, error);
                // Fallback or empty array
                this.templates.set(category, []);
            }
        }
    }

    getTemplatesByCategory(category) {
        return this.templates.get(category) || [];
    }

    getAllTemplates() {
        let all = [];
        for (const templates of this.templates.values()) {
            all = all.concat(templates);
        }
        return all;
    }

    searchTemplates(query) {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        const all = this.getAllTemplates();

        return all.filter(t =>
            t.name.toLowerCase().includes(lowerQuery) ||
            (t.label && t.label.toLowerCase().includes(lowerQuery)) ||
            (t.message && t.message.toLowerCase().includes(lowerQuery)) ||
            (t.tags && t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        );
    }
}
