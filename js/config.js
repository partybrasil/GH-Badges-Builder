export const CONFIG = {
    APP_NAME: 'GH-Badges-Builder',
    VERSION: '1.1.0',

    // Default Settings
    DEFAULT_THEME: 'auto',
    DEFAULT_STYLE: 'flat',
    DEFAULT_FORMAT: 'markdown',

    // Limits
    MAX_BADGES: 100,
    MAX_HISTORY: 20,

    // API Endpoints
    SHIELDS_IO_URL: 'https://img.shields.io/badge/',
    SIMPLE_ICONS_CDN: 'https://unpkg.com/simple-icons@latest/icons.json',

    // Storage Keys
    STORAGE_KEYS: {
        PREFERENCES: 'ghbb_prefs',
        FAVORITES: 'ghbb_favorites',
        HISTORY: 'ghbb_history',
        TEMPLATES: 'ghbb_custom_templates'
    },

    // Styles
    BADGE_STYLES: [
        'flat',
        'flat-square',
        'for-the-badge',
        'plastic',
        'social'
    ]
};
