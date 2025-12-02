import { BadgeGenerator } from './BadgeGenerator.js';

export class ExportManager {
    static export(badges, format, options = {}) {
        switch (format) {
            case 'markdown':
                return this.toMarkdown(badges, options);
            case 'html':
                return this.toHtml(badges, options);
            case 'json':
                return this.toJson(badges);
            case 'urls':
                return this.toUrls(badges);
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
    }

    static toMarkdown(badges, options) {
        const { markdownFormat = 'inline', includeNewlines = true } = options;
        const separator = includeNewlines ? '\n' : ' ';

        if (markdownFormat === 'list') {
            return badges.map(b => `- ${BadgeGenerator.generateMarkdown(b)}`).join('\n');
        } else if (markdownFormat === 'table') {
            const header = '| Badge | Description |\n|-------|-------------|';
            const rows = badges.map(b => `| ${BadgeGenerator.generateMarkdown(b)} | ${b.label || b.message} |`).join('\n');
            return `${header}\n${rows}`;
        } else {
            // Inline
            return badges.map(b => BadgeGenerator.generateMarkdown(b)).join(separator);
        }
    }

    static toHtml(badges, options) {
        const { includeNewlines = true } = options;
        const separator = includeNewlines ? '\n' : ' ';
        return badges.map(b => BadgeGenerator.generateHtml(b)).join(separator);
    }

    static toJson(badges) {
        return JSON.stringify(badges, null, 2);
    }

    static toUrls(badges) {
        return badges.map(b => BadgeGenerator.generateUrl(b)).join('\n');
    }
}
