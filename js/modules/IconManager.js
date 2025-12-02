/**
 * IconManager - Handles loading and displaying Simple Icons from CDN
 */

export class IconManager {
    constructor() {
        this.icons = [];
        this.filteredIcons = [];
        this.isLoaded = false;
        this.selectedIcon = null;
        // Using the Simple Icons CDN
        this.cdnBaseUrl = 'https://cdn.simpleicons.org';
    }

    /**
     * Load icons manifest from Simple Icons CDN
     */
    async loadIcons() {
        try {
            // Fetch the icons data from Simple Icons npm package
            const response = await fetch('https://cdn.jsdelivr.net/npm/simple-icons@latest/_data/simple-icons.json');
            if (!response.ok) throw new Error('Failed to load icons');
            
            const data = await response.json();
            this.icons = data.icons || [];
            this.filteredIcons = [...this.icons];
            this.isLoaded = true;
            
            console.log(`Loaded ${this.icons.length} icons from Simple Icons`);
            return this.icons;
        } catch (error) {
            console.error('Error loading icons:', error);
            // Try alternative source
            try {
                const altResponse = await fetch('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json');
                if (altResponse.ok) {
                    const data = await altResponse.json();
                    this.icons = data.icons || [];
                    this.filteredIcons = [...this.icons];
                    this.isLoaded = true;
                    return this.icons;
                }
            } catch (altError) {
                console.error('Alternative source also failed:', altError);
            }
            this.icons = [];
            this.filteredIcons = [];
            return [];
        }
    }

    /**
     * Get icon URL from CDN
     * @param {string} slug - Icon slug/name
     * @param {string} color - Optional hex color (without #)
     */
    getIconUrl(slug, color = null) {
        if (color) {
            return `${this.cdnBaseUrl}/${slug}/${color}`;
        }
        return `${this.cdnBaseUrl}/${slug}`;
    }

    /**
     * Search icons by name
     * @param {string} query - Search query
     */
    searchIcons(query) {
        if (!query || query.trim() === '') {
            this.filteredIcons = [...this.icons];
            return this.filteredIcons;
        }

        const lowerQuery = query.toLowerCase().trim();
        this.filteredIcons = this.icons.filter(icon => {
            const title = (icon.title || '').toLowerCase();
            const slug = (icon.slug || '').toLowerCase();
            return title.includes(lowerQuery) || slug.includes(lowerQuery);
        });

        return this.filteredIcons;
    }

    /**
     * Get paginated icons for virtual scrolling
     * @param {number} page - Page number (0-indexed)
     * @param {number} perPage - Items per page
     */
    getIconsPage(page = 0, perPage = 100) {
        const start = page * perPage;
        const end = start + perPage;
        return this.filteredIcons.slice(start, end);
    }

    /**
     * Get total number of filtered icons
     */
    getTotalCount() {
        return this.filteredIcons.length;
    }

    /**
     * Select an icon
     * @param {object} icon - Icon object
     */
    selectIcon(icon) {
        this.selectedIcon = icon;
        return icon;
    }

    /**
     * Get the slug from an icon title
     * @param {string} title - Icon title
     */
    titleToSlug(title) {
        return title.toLowerCase()
            .replace(/\+/g, 'plus')
            .replace(/\./g, 'dot')
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9]/g, '');
    }
}
