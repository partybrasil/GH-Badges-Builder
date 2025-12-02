import { CONFIG } from '../config.js';

export class StorageManager {
    constructor() {
        this.storage = window.localStorage;
    }

    save(key, data) {
        try {
            this.storage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Storage save failed:', error);
            return false;
        }
    }

    load(key) {
        try {
            const item = this.storage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Storage load failed:', error);
            return null;
        }
    }

    remove(key) {
        this.storage.removeItem(key);
    }

    // Specific methods
    saveFavorites(favorites) {
        return this.save(CONFIG.STORAGE_KEYS.FAVORITES, favorites);
    }

    loadFavorites() {
        return this.load(CONFIG.STORAGE_KEYS.FAVORITES) || [];
    }

    savePreferences(prefs) {
        return this.save(CONFIG.STORAGE_KEYS.PREFERENCES, prefs);
    }

    loadPreferences() {
        return this.load(CONFIG.STORAGE_KEYS.PREFERENCES) || {};
    }
}
