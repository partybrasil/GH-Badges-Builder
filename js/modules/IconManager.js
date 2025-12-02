/**
 * IconManager - Handles loading and displaying Simple Icons from CDN
 */

// Popular icons fallback data (subset of Simple Icons for offline/CORS fallback)
const FALLBACK_ICONS = [
    { title: "GitHub", slug: "github", hex: "181717" },
    { title: "JavaScript", slug: "javascript", hex: "F7DF1E" },
    { title: "TypeScript", slug: "typescript", hex: "3178C6" },
    { title: "Python", slug: "python", hex: "3776AB" },
    { title: "React", slug: "react", hex: "61DAFB" },
    { title: "Vue.js", slug: "vuedotjs", hex: "4FC08D" },
    { title: "Angular", slug: "angular", hex: "DD0031" },
    { title: "Node.js", slug: "nodedotjs", hex: "339933" },
    { title: "Docker", slug: "docker", hex: "2496ED" },
    { title: "Kubernetes", slug: "kubernetes", hex: "326CE5" },
    { title: "AWS", slug: "amazonaws", hex: "232F3E" },
    { title: "Google Cloud", slug: "googlecloud", hex: "4285F4" },
    { title: "Azure", slug: "microsoftazure", hex: "0078D4" },
    { title: "Linux", slug: "linux", hex: "FCC624" },
    { title: "Windows", slug: "windows", hex: "0078D6" },
    { title: "Apple", slug: "apple", hex: "000000" },
    { title: "Android", slug: "android", hex: "3DDC84" },
    { title: "iOS", slug: "ios", hex: "000000" },
    { title: "Git", slug: "git", hex: "F05032" },
    { title: "GitLab", slug: "gitlab", hex: "FC6D26" },
    { title: "Bitbucket", slug: "bitbucket", hex: "0052CC" },
    { title: "VS Code", slug: "visualstudiocode", hex: "007ACC" },
    { title: "IntelliJ IDEA", slug: "intellijidea", hex: "000000" },
    { title: "Sublime Text", slug: "sublimetext", hex: "FF9800" },
    { title: "Vim", slug: "vim", hex: "019733" },
    { title: "Neovim", slug: "neovim", hex: "57A143" },
    { title: "PostgreSQL", slug: "postgresql", hex: "4169E1" },
    { title: "MySQL", slug: "mysql", hex: "4479A1" },
    { title: "MongoDB", slug: "mongodb", hex: "47A248" },
    { title: "Redis", slug: "redis", hex: "DC382D" },
    { title: "SQLite", slug: "sqlite", hex: "003B57" },
    { title: "Elasticsearch", slug: "elasticsearch", hex: "005571" },
    { title: "npm", slug: "npm", hex: "CB3837" },
    { title: "Yarn", slug: "yarn", hex: "2C8EBB" },
    { title: "pnpm", slug: "pnpm", hex: "F69220" },
    { title: "Webpack", slug: "webpack", hex: "8DD6F9" },
    { title: "Vite", slug: "vite", hex: "646CFF" },
    { title: "Rollup", slug: "rollupdotjs", hex: "EC4A3F" },
    { title: "Babel", slug: "babel", hex: "F9DC3E" },
    { title: "ESLint", slug: "eslint", hex: "4B32C3" },
    { title: "Prettier", slug: "prettier", hex: "F7B93E" },
    { title: "Jest", slug: "jest", hex: "C21325" },
    { title: "Mocha", slug: "mocha", hex: "8D6748" },
    { title: "Cypress", slug: "cypress", hex: "17202C" },
    { title: "Playwright", slug: "playwright", hex: "2EAD33" },
    { title: "Selenium", slug: "selenium", hex: "43B02A" },
    { title: "Express", slug: "express", hex: "000000" },
    { title: "Fastify", slug: "fastify", hex: "000000" },
    { title: "NestJS", slug: "nestjs", hex: "E0234E" },
    { title: "Next.js", slug: "nextdotjs", hex: "000000" },
    { title: "Nuxt.js", slug: "nuxtdotjs", hex: "00DC82" },
    { title: "Gatsby", slug: "gatsby", hex: "663399" },
    { title: "Svelte", slug: "svelte", hex: "FF3E00" },
    { title: "Tailwind CSS", slug: "tailwindcss", hex: "06B6D4" },
    { title: "Bootstrap", slug: "bootstrap", hex: "7952B3" },
    { title: "Material UI", slug: "mui", hex: "007FFF" },
    { title: "Sass", slug: "sass", hex: "CC6699" },
    { title: "Less", slug: "less", hex: "1D365D" },
    { title: "CSS3", slug: "css3", hex: "1572B6" },
    { title: "HTML5", slug: "html5", hex: "E34F26" },
    { title: "GraphQL", slug: "graphql", hex: "E10098" },
    { title: "Apollo GraphQL", slug: "apollographql", hex: "311C87" },
    { title: "REST API", slug: "openapiinitiative", hex: "6BA539" },
    { title: "Swagger", slug: "swagger", hex: "85EA2D" },
    { title: "Postman", slug: "postman", hex: "FF6C37" },
    { title: "Insomnia", slug: "insomnia", hex: "4000BF" },
    { title: "Django", slug: "django", hex: "092E20" },
    { title: "Flask", slug: "flask", hex: "000000" },
    { title: "FastAPI", slug: "fastapi", hex: "009688" },
    { title: "Spring", slug: "spring", hex: "6DB33F" },
    { title: "Spring Boot", slug: "springboot", hex: "6DB33F" },
    { title: "Ruby", slug: "ruby", hex: "CC342D" },
    { title: "Rails", slug: "rubyonrails", hex: "CC0000" },
    { title: "PHP", slug: "php", hex: "777BB4" },
    { title: "Laravel", slug: "laravel", hex: "FF2D20" },
    { title: "Symfony", slug: "symfony", hex: "000000" },
    { title: "Go", slug: "go", hex: "00ADD8" },
    { title: "Rust", slug: "rust", hex: "000000" },
    { title: "C", slug: "c", hex: "A8B9CC" },
    { title: "C++", slug: "cplusplus", hex: "00599C" },
    { title: "C#", slug: "csharp", hex: "239120" },
    { title: ".NET", slug: "dotnet", hex: "512BD4" },
    { title: "Java", slug: "java", hex: "007396" },
    { title: "Kotlin", slug: "kotlin", hex: "7F52FF" },
    { title: "Swift", slug: "swift", hex: "F05138" },
    { title: "Dart", slug: "dart", hex: "0175C2" },
    { title: "Flutter", slug: "flutter", hex: "02569B" },
    { title: "React Native", slug: "react", hex: "61DAFB" },
    { title: "Electron", slug: "electron", hex: "47848F" },
    { title: "Tauri", slug: "tauri", hex: "24C8DB" },
    { title: "Figma", slug: "figma", hex: "F24E1E" },
    { title: "Sketch", slug: "sketch", hex: "F7B500" },
    { title: "Adobe XD", slug: "adobexd", hex: "FF61F6" },
    { title: "Canva", slug: "canva", hex: "00C4CC" },
    { title: "Notion", slug: "notion", hex: "000000" },
    { title: "Slack", slug: "slack", hex: "4A154B" },
    { title: "Discord", slug: "discord", hex: "5865F2" },
    { title: "Telegram", slug: "telegram", hex: "26A5E4" },
    { title: "WhatsApp", slug: "whatsapp", hex: "25D366" },
    { title: "Twitter", slug: "twitter", hex: "1DA1F2" },
    { title: "X", slug: "x", hex: "000000" },
    { title: "LinkedIn", slug: "linkedin", hex: "0A66C2" },
    { title: "Facebook", slug: "facebook", hex: "1877F2" },
    { title: "Instagram", slug: "instagram", hex: "E4405F" },
    { title: "YouTube", slug: "youtube", hex: "FF0000" },
    { title: "TikTok", slug: "tiktok", hex: "000000" },
    { title: "Twitch", slug: "twitch", hex: "9146FF" },
    { title: "Reddit", slug: "reddit", hex: "FF4500" },
    { title: "Medium", slug: "medium", hex: "000000" },
    { title: "Dev.to", slug: "devdotto", hex: "0A0A0A" },
    { title: "Stack Overflow", slug: "stackoverflow", hex: "F58025" },
    { title: "Hacker News", slug: "ycombinator", hex: "F0652F" },
    { title: "Vercel", slug: "vercel", hex: "000000" },
    { title: "Netlify", slug: "netlify", hex: "00C7B7" },
    { title: "Heroku", slug: "heroku", hex: "430098" },
    { title: "DigitalOcean", slug: "digitalocean", hex: "0080FF" },
    { title: "Cloudflare", slug: "cloudflare", hex: "F38020" },
    { title: "Firebase", slug: "firebase", hex: "FFCA28" },
    { title: "Supabase", slug: "supabase", hex: "3ECF8E" },
    { title: "Prisma", slug: "prisma", hex: "2D3748" },
    { title: "Drizzle", slug: "drizzle", hex: "C5F74F" },
    { title: "Apache", slug: "apache", hex: "D22128" },
    { title: "Nginx", slug: "nginx", hex: "009639" },
    { title: "Caddy", slug: "caddy", hex: "1F88C0" },
    { title: "Jenkins", slug: "jenkins", hex: "D24939" },
    { title: "GitHub Actions", slug: "githubactions", hex: "2088FF" },
    { title: "GitLab CI", slug: "gitlab", hex: "FC6D26" },
    { title: "CircleCI", slug: "circleci", hex: "343434" },
    { title: "Travis CI", slug: "travisci", hex: "3EAAAF" },
    { title: "Terraform", slug: "terraform", hex: "844FBA" },
    { title: "Ansible", slug: "ansible", hex: "EE0000" },
    { title: "Puppet", slug: "puppet", hex: "FFAE1A" },
    { title: "Chef", slug: "chef", hex: "F09820" },
    { title: "Vagrant", slug: "vagrant", hex: "1868F2" },
    { title: "Prometheus", slug: "prometheus", hex: "E6522C" },
    { title: "Grafana", slug: "grafana", hex: "F46800" },
    { title: "Datadog", slug: "datadog", hex: "632CA6" },
    { title: "New Relic", slug: "newrelic", hex: "008C99" },
    { title: "Sentry", slug: "sentry", hex: "362D59" },
    { title: "LogRocket", slug: "logrocket", hex: "764ABC" },
    { title: "Stripe", slug: "stripe", hex: "008CDD" },
    { title: "PayPal", slug: "paypal", hex: "00457C" },
    { title: "Shopify", slug: "shopify", hex: "7AB55C" },
    { title: "WooCommerce", slug: "woocommerce", hex: "96588A" },
    { title: "Magento", slug: "magento", hex: "EE672F" },
    { title: "WordPress", slug: "wordpress", hex: "21759B" },
    { title: "Ghost", slug: "ghost", hex: "15171A" },
    { title: "Hugo", slug: "hugo", hex: "FF4088" },
    { title: "Jekyll", slug: "jekyll", hex: "CC0000" },
    { title: "Markdown", slug: "markdown", hex: "000000" },
    { title: "LaTeX", slug: "latex", hex: "008080" },
    { title: "Jupyter", slug: "jupyter", hex: "F37626" },
    { title: "Anaconda", slug: "anaconda", hex: "44A833" },
    { title: "TensorFlow", slug: "tensorflow", hex: "FF6F00" },
    { title: "PyTorch", slug: "pytorch", hex: "EE4C2C" },
    { title: "scikit-learn", slug: "scikitlearn", hex: "F7931E" },
    { title: "Pandas", slug: "pandas", hex: "150458" },
    { title: "NumPy", slug: "numpy", hex: "013243" },
    { title: "OpenAI", slug: "openai", hex: "412991" },
    { title: "Hugging Face", slug: "huggingface", hex: "FFD21E" },
    { title: "Ubuntu", slug: "ubuntu", hex: "E95420" },
    { title: "Debian", slug: "debian", hex: "A81D33" },
    { title: "Fedora", slug: "fedora", hex: "51A2DA" },
    { title: "Arch Linux", slug: "archlinux", hex: "1793D1" },
    { title: "macOS", slug: "macos", hex: "000000" },
    { title: "Raspberry Pi", slug: "raspberrypi", hex: "A22846" },
    { title: "Arduino", slug: "arduino", hex: "00979D" },
    { title: "Unity", slug: "unity", hex: "FFFFFF" },
    { title: "Unreal Engine", slug: "unrealengine", hex: "0E1128" },
    { title: "Godot", slug: "godotengine", hex: "478CBF" },
    { title: "Blender", slug: "blender", hex: "F5792A" },
    { title: "Three.js", slug: "threedotjs", hex: "000000" },
    { title: "WebGL", slug: "webgl", hex: "990000" },
    { title: "OpenGL", slug: "opengl", hex: "5586A4" },
    { title: "Vulkan", slug: "vulkan", hex: "AC162C" },
    { title: "WebAssembly", slug: "webassembly", hex: "654FF0" },
    { title: "AssemblyScript", slug: "assemblyscript", hex: "007AAC" },
    { title: "Deno", slug: "deno", hex: "000000" },
    { title: "Bun", slug: "bun", hex: "000000" },
    { title: "Remix", slug: "remix", hex: "000000" },
    { title: "Astro", slug: "astro", hex: "FF5D01" },
    { title: "SolidJS", slug: "solid", hex: "2C4F7C" },
    { title: "Qwik", slug: "qwik", hex: "AC7EF4" },
    { title: "htmx", slug: "htmx", hex: "3366CC" },
    { title: "Alpine.js", slug: "alpinedotjs", hex: "8BC0D0" },
    { title: "Stimulus", slug: "stimulus", hex: "77E8B9" },
    { title: "Storybook", slug: "storybook", hex: "FF4785" },
    { title: "Chromatic", slug: "chromatic", hex: "FC521F" },
    { title: "Vercel", slug: "vercel", hex: "000000" },
    { title: "Turborepo", slug: "turborepo", hex: "EF4444" },
    { title: "Lerna", slug: "lerna", hex: "9333EA" },
    { title: "Nx", slug: "nx", hex: "143055" },
    { title: "Socket.io", slug: "socketdotio", hex: "010101" },
    { title: "RabbitMQ", slug: "rabbitmq", hex: "FF6600" },
    { title: "Apache Kafka", slug: "apachekafka", hex: "231F20" },
    { title: "MQTT", slug: "mqtt", hex: "660066" },
    { title: "gRPC", slug: "grpc", hex: "244c5a" },
    { title: "Protocol Buffers", slug: "protobuf", hex: "4285F4" },
    { title: "JSON", slug: "json", hex: "000000" },
    { title: "YAML", slug: "yaml", hex: "CB171E" },
    { title: "XML", slug: "xml", hex: "005FAD" },
    { title: "CSV", slug: "csv", hex: "239120" }
];

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
     * Load icons manifest from Simple Icons CDN with fallback
     */
    async loadIcons() {
        // First try to fetch from CDN
        try {
            const response = await fetch('https://cdn.jsdelivr.net/npm/simple-icons@latest/_data/simple-icons.json');
            if (!response.ok) throw new Error('Failed to load icons');
            
            const data = await response.json();
            const icons = data.icons || data || [];
            
            // If we got valid data from CDN, use it
            if (Array.isArray(icons) && icons.length > 0) {
                this.icons = icons;
                this.filteredIcons = [...this.icons];
                this.isLoaded = true;
                console.log(`Loaded ${this.icons.length} icons from Simple Icons CDN`);
                return this.icons;
            }
            
            // If CDN returned empty, throw to trigger fallback
            throw new Error('CDN returned empty data');
        } catch (error) {
            console.warn('CDN fetch failed, trying alternative source...', error.message);
            
            // Try alternative source
            try {
                const altResponse = await fetch('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json');
                if (altResponse.ok) {
                    const data = await altResponse.json();
                    const icons = data.icons || data || [];
                    
                    if (Array.isArray(icons) && icons.length > 0) {
                        this.icons = icons;
                        this.filteredIcons = [...this.icons];
                        this.isLoaded = true;
                        console.log(`Loaded ${this.icons.length} icons from GitHub`);
                        return this.icons;
                    }
                }
            } catch (altError) {
                console.warn('Alternative source also failed...', altError.message);
            }
            
            // Use embedded fallback data
            console.log('Using embedded fallback icon data...');
            this.icons = [...FALLBACK_ICONS];
            this.filteredIcons = [...FALLBACK_ICONS];
            this.isLoaded = true;
            console.log(`Loaded ${this.icons.length} icons from fallback data`);
            return this.icons;
        }
    }

    /**
     * Get icon URL from CDN
     * Uses jsdelivr CDN with Simple Icons which is more reliable
     * @param {string} slug - Icon slug/name
     * @param {string} color - Optional hex color (without #)
     */
    getIconUrl(slug, color = null) {
        // Use jsdelivr CDN which is more reliable and widely accessible
        // Format: https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/{slug}.svg
        return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
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
     * @returns {object|null} - The selected icon or null if invalid
     */
    selectIcon(icon) {
        if (!icon || typeof icon !== 'object') {
            console.warn('Invalid icon object provided to selectIcon');
            return null;
        }
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
