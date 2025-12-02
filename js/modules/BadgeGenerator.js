import { encodeShieldsString } from '../utils/helpers.js';

export class BadgeGenerator {
    static generateUrl(badge) {
        const { label, message, color, style, logo, logoColor, labelColor } = badge;

        const encodedLabel = label ? encodeShieldsString(label) : '';
        const encodedMessage = encodeShieldsString(message);
        const encodedColor = color.replace('#', '');

        let url = `https://img.shields.io/badge/${encodedLabel ? encodedLabel + '-' : ''}${encodedMessage}-${encodedColor}`;

        const params = new URLSearchParams();

        if (style && style !== 'flat') {
            params.append('style', style);
        }

        if (logo) {
            params.append('logo', logo);
        }

        if (logoColor) {
            params.append('logoColor', logoColor);
        }

        if (labelColor) {
            params.append('labelColor', labelColor);
        }

        const queryString = params.toString();
        return queryString ? `${url}?${queryString}` : url;
    }

    static generateMarkdown(badge) {
        const url = this.generateUrl(badge);
        const alt = badge.label ? `${badge.label} - ${badge.message}` : badge.message;
        return `![${alt}](${url})`;
    }

    static generateHtml(badge) {
        const url = this.generateUrl(badge);
        const alt = badge.label ? `${badge.label} - ${badge.message}` : badge.message;
        return `<img src="${url}" alt="${alt}">`;
    }
}
