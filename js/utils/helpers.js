/**
 * Debounce function to limit the rate at which a function can fire.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
export function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

/**
 * Generate a unique ID.
 * @returns {string} - A unique ID.
 */
export function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Copy text to clipboard.
 * @param {string} text - The text to copy.
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy: ', err);
        return false;
    }
}

/**
 * Escape HTML special characters.
 * @param {string} text - The text to escape.
 * @returns {string} - The escaped text.
 */
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Encode URL components for Shields.io
 * Shields.io uses underscores for spaces and double dashes for dashes.
 * @param {string} str 
 */
export function encodeShieldsString(str) {
    if (!str) return '';
    return str.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_');
}
