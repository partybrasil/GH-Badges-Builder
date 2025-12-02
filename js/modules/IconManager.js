/**
 * IconManager - Handles loading and displaying Simple Icons from CDN
 */

// Fallback icons data - Popular icons for when CDN is unavailable
const FALLBACK_ICONS = [
    // Languages
    { title: "JavaScript", slug: "javascript", hex: "F7DF1E" },
    { title: "TypeScript", slug: "typescript", hex: "3178C6" },
    { title: "Python", slug: "python", hex: "3776AB" },
    { title: "Java", slug: "java", hex: "007396" },
    { title: "C++", slug: "cplusplus", hex: "00599C" },
    { title: "C#", slug: "csharp", hex: "239120" },
    { title: "Go", slug: "go", hex: "00ADD8" },
    { title: "Rust", slug: "rust", hex: "000000" },
    { title: "Ruby", slug: "ruby", hex: "CC342D" },
    { title: "PHP", slug: "php", hex: "777BB4" },
    { title: "Swift", slug: "swift", hex: "F05138" },
    { title: "Kotlin", slug: "kotlin", hex: "7F52FF" },
    { title: "Dart", slug: "dart", hex: "0175C2" },
    { title: "Scala", slug: "scala", hex: "DC322F" },
    { title: "R", slug: "r", hex: "276DC3" },
    { title: "Lua", slug: "lua", hex: "2C2D72" },
    { title: "Perl", slug: "perl", hex: "39457E" },
    { title: "Haskell", slug: "haskell", hex: "5D4F85" },
    { title: "Elixir", slug: "elixir", hex: "4B275F" },
    { title: "Clojure", slug: "clojure", hex: "5881D8" },
    // Frameworks Frontend
    { title: "React", slug: "react", hex: "61DAFB" },
    { title: "Vue.js", slug: "vuedotjs", hex: "4FC08D" },
    { title: "Angular", slug: "angular", hex: "DD0031" },
    { title: "Svelte", slug: "svelte", hex: "FF3E00" },
    { title: "Next.js", slug: "nextdotjs", hex: "000000" },
    { title: "Nuxt.js", slug: "nuxtdotjs", hex: "00DC82" },
    { title: "Astro", slug: "astro", hex: "FF5D01" },
    { title: "Remix", slug: "remix", hex: "000000" },
    { title: "Solid", slug: "solid", hex: "2C4F7C" },
    { title: "Ember.js", slug: "emberdotjs", hex: "E04E39" },
    { title: "Backbone.js", slug: "backbonedotjs", hex: "0071B5" },
    { title: "Alpine.js", slug: "alpinedotjs", hex: "8BC0D0" },
    { title: "Preact", slug: "preact", hex: "673AB8" },
    { title: "Lit", slug: "lit", hex: "324FFF" },
    // Frameworks Backend
    { title: "Node.js", slug: "nodedotjs", hex: "339933" },
    { title: "Express", slug: "express", hex: "000000" },
    { title: "NestJS", slug: "nestjs", hex: "E0234E" },
    { title: "Fastify", slug: "fastify", hex: "000000" },
    { title: "Django", slug: "django", hex: "092E20" },
    { title: "Flask", slug: "flask", hex: "000000" },
    { title: "FastAPI", slug: "fastapi", hex: "009688" },
    { title: "Spring", slug: "spring", hex: "6DB33F" },
    { title: "Spring Boot", slug: "springboot", hex: "6DB33F" },
    { title: "Laravel", slug: "laravel", hex: "FF2D20" },
    { title: "Symfony", slug: "symfony", hex: "000000" },
    { title: "Ruby on Rails", slug: "rubyonrails", hex: "CC0000" },
    { title: ".NET", slug: "dotnet", hex: "512BD4" },
    { title: "ASP.NET", slug: "dotnet", hex: "512BD4" },
    // Databases
    { title: "MySQL", slug: "mysql", hex: "4479A1" },
    { title: "PostgreSQL", slug: "postgresql", hex: "4169E1" },
    { title: "MongoDB", slug: "mongodb", hex: "47A248" },
    { title: "Redis", slug: "redis", hex: "DC382D" },
    { title: "SQLite", slug: "sqlite", hex: "003B57" },
    { title: "Oracle", slug: "oracle", hex: "F80000" },
    { title: "Microsoft SQL Server", slug: "microsoftsqlserver", hex: "CC2927" },
    { title: "MariaDB", slug: "mariadb", hex: "003545" },
    { title: "Cassandra", slug: "apachecassandra", hex: "1287B1" },
    { title: "Elasticsearch", slug: "elasticsearch", hex: "005571" },
    { title: "Neo4j", slug: "neo4j", hex: "4581C3" },
    { title: "Firebase", slug: "firebase", hex: "FFCA28" },
    { title: "Supabase", slug: "supabase", hex: "3ECF8E" },
    { title: "PlanetScale", slug: "planetscale", hex: "000000" },
    // DevOps & Cloud
    { title: "Docker", slug: "docker", hex: "2496ED" },
    { title: "Kubernetes", slug: "kubernetes", hex: "326CE5" },
    { title: "AWS", slug: "amazonaws", hex: "232F3E" },
    { title: "Google Cloud", slug: "googlecloud", hex: "4285F4" },
    { title: "Microsoft Azure", slug: "microsoftazure", hex: "0078D4" },
    { title: "Vercel", slug: "vercel", hex: "000000" },
    { title: "Netlify", slug: "netlify", hex: "00C7B7" },
    { title: "Heroku", slug: "heroku", hex: "430098" },
    { title: "DigitalOcean", slug: "digitalocean", hex: "0080FF" },
    { title: "Cloudflare", slug: "cloudflare", hex: "F38020" },
    { title: "Terraform", slug: "terraform", hex: "7B42BC" },
    { title: "Ansible", slug: "ansible", hex: "EE0000" },
    { title: "Jenkins", slug: "jenkins", hex: "D24939" },
    { title: "CircleCI", slug: "circleci", hex: "343434" },
    { title: "Travis CI", slug: "travisci", hex: "3EAAAF" },
    { title: "GitHub Actions", slug: "githubactions", hex: "2088FF" },
    { title: "GitLab CI", slug: "gitlab", hex: "FC6D26" },
    // Tools & Platforms
    { title: "GitHub", slug: "github", hex: "181717" },
    { title: "GitLab", slug: "gitlab", hex: "FC6D26" },
    { title: "Bitbucket", slug: "bitbucket", hex: "0052CC" },
    { title: "Git", slug: "git", hex: "F05032" },
    { title: "VS Code", slug: "visualstudiocode", hex: "007ACC" },
    { title: "Visual Studio", slug: "visualstudio", hex: "5C2D91" },
    { title: "IntelliJ IDEA", slug: "intellijidea", hex: "000000" },
    { title: "WebStorm", slug: "webstorm", hex: "000000" },
    { title: "PyCharm", slug: "pycharm", hex: "000000" },
    { title: "Sublime Text", slug: "sublimetext", hex: "FF9800" },
    { title: "Atom", slug: "atom", hex: "66595C" },
    { title: "Vim", slug: "vim", hex: "019733" },
    { title: "Neovim", slug: "neovim", hex: "57A143" },
    { title: "Postman", slug: "postman", hex: "FF6C37" },
    { title: "Insomnia", slug: "insomnia", hex: "4000BF" },
    { title: "Figma", slug: "figma", hex: "F24E1E" },
    { title: "Sketch", slug: "sketch", hex: "F7B500" },
    { title: "Adobe XD", slug: "adobexd", hex: "FF61F6" },
    { title: "Notion", slug: "notion", hex: "000000" },
    { title: "Slack", slug: "slack", hex: "4A154B" },
    { title: "Discord", slug: "discord", hex: "5865F2" },
    { title: "Jira", slug: "jira", hex: "0052CC" },
    { title: "Trello", slug: "trello", hex: "0052CC" },
    // CSS & UI
    { title: "CSS3", slug: "css3", hex: "1572B6" },
    { title: "Sass", slug: "sass", hex: "CC6699" },
    { title: "Less", slug: "less", hex: "1D365D" },
    { title: "Tailwind CSS", slug: "tailwindcss", hex: "06B6D4" },
    { title: "Bootstrap", slug: "bootstrap", hex: "7952B3" },
    { title: "Material UI", slug: "mui", hex: "007FFF" },
    { title: "Chakra UI", slug: "chakraui", hex: "319795" },
    { title: "Ant Design", slug: "antdesign", hex: "0170FE" },
    { title: "Styled Components", slug: "styledcomponents", hex: "DB7093" },
    // Build Tools
    { title: "Webpack", slug: "webpack", hex: "8DD6F9" },
    { title: "Vite", slug: "vite", hex: "646CFF" },
    { title: "Rollup", slug: "rollupdotjs", hex: "EC4A3F" },
    { title: "esbuild", slug: "esbuild", hex: "FFCF00" },
    { title: "Parcel", slug: "parcel", hex: "21374B" },
    { title: "Babel", slug: "babel", hex: "F9DC3E" },
    { title: "npm", slug: "npm", hex: "CB3837" },
    { title: "Yarn", slug: "yarn", hex: "2C8EBB" },
    { title: "pnpm", slug: "pnpm", hex: "F69220" },
    // Testing
    { title: "Jest", slug: "jest", hex: "C21325" },
    { title: "Mocha", slug: "mocha", hex: "8D6748" },
    { title: "Cypress", slug: "cypress", hex: "17202C" },
    { title: "Playwright", slug: "playwright", hex: "2EAD33" },
    { title: "Selenium", slug: "selenium", hex: "43B02A" },
    { title: "Testing Library", slug: "testinglibrary", hex: "E33332" },
    { title: "Vitest", slug: "vitest", hex: "6E9F18" },
    { title: "Pytest", slug: "pytest", hex: "0A9EDC" },
    { title: "JUnit", slug: "junit5", hex: "25A162" },
    // Mobile
    { title: "React Native", slug: "react", hex: "61DAFB" },
    { title: "Flutter", slug: "flutter", hex: "02569B" },
    { title: "Expo", slug: "expo", hex: "000020" },
    { title: "Android", slug: "android", hex: "3DDC84" },
    { title: "iOS", slug: "ios", hex: "000000" },
    { title: "Ionic", slug: "ionic", hex: "3880FF" },
    { title: "Capacitor", slug: "capacitor", hex: "119EFF" },
    // AI & ML
    { title: "TensorFlow", slug: "tensorflow", hex: "FF6F00" },
    { title: "PyTorch", slug: "pytorch", hex: "EE4C2C" },
    { title: "OpenAI", slug: "openai", hex: "412991" },
    { title: "Hugging Face", slug: "huggingface", hex: "FFD21E" },
    { title: "scikit-learn", slug: "scikitlearn", hex: "F7931E" },
    { title: "Jupyter", slug: "jupyter", hex: "F37626" },
    { title: "NumPy", slug: "numpy", hex: "013243" },
    { title: "Pandas", slug: "pandas", hex: "150458" },
    // Social & Media
    { title: "Twitter", slug: "twitter", hex: "1DA1F2" },
    { title: "X", slug: "x", hex: "000000" },
    { title: "Facebook", slug: "facebook", hex: "1877F2" },
    { title: "Instagram", slug: "instagram", hex: "E4405F" },
    { title: "LinkedIn", slug: "linkedin", hex: "0A66C2" },
    { title: "YouTube", slug: "youtube", hex: "FF0000" },
    { title: "TikTok", slug: "tiktok", hex: "000000" },
    { title: "Reddit", slug: "reddit", hex: "FF4500" },
    { title: "Medium", slug: "medium", hex: "000000" },
    { title: "Dev.to", slug: "devdotto", hex: "0A0A0A" },
    { title: "Stack Overflow", slug: "stackoverflow", hex: "F58025" },
    { title: "Hashnode", slug: "hashnode", hex: "2962FF" },
    // Misc
    { title: "HTML5", slug: "html5", hex: "E34F26" },
    { title: "Markdown", slug: "markdown", hex: "000000" },
    { title: "JSON", slug: "json", hex: "000000" },
    { title: "GraphQL", slug: "graphql", hex: "E10098" },
    { title: "Apollo GraphQL", slug: "apollographql", hex: "311C87" },
    { title: "REST API", slug: "openapiinitiative", hex: "6BA539" },
    { title: "Swagger", slug: "swagger", hex: "85EA2D" },
    { title: "GNU Bash", slug: "gnubash", hex: "4EAA25" },
    { title: "PowerShell", slug: "powershell", hex: "5391FE" },
    { title: "Linux", slug: "linux", hex: "FCC624" },
    { title: "Ubuntu", slug: "ubuntu", hex: "E95420" },
    { title: "Debian", slug: "debian", hex: "A81D33" },
    { title: "Windows", slug: "windows", hex: "0078D6" },
    { title: "macOS", slug: "macos", hex: "000000" },
    { title: "Arch Linux", slug: "archlinux", hex: "1793D1" },
    { title: "CentOS", slug: "centos", hex: "262577" },
    { title: "Red Hat", slug: "redhat", hex: "EE0000" },
    { title: "Nginx", slug: "nginx", hex: "009639" },
    { title: "Apache", slug: "apache", hex: "D22128" },
    { title: "Caddy", slug: "caddy", hex: "1F88C0" },
    { title: "RabbitMQ", slug: "rabbitmq", hex: "FF6600" },
    { title: "Apache Kafka", slug: "apachekafka", hex: "231F20" },
    { title: "Stripe", slug: "stripe", hex: "008CDD" },
    { title: "PayPal", slug: "paypal", hex: "00457C" },
    { title: "Shopify", slug: "shopify", hex: "7AB55C" },
    { title: "WordPress", slug: "wordpress", hex: "21759B" },
    { title: "Drupal", slug: "drupal", hex: "0678BE" },
    { title: "Contentful", slug: "contentful", hex: "2478CC" },
    { title: "Sanity", slug: "sanity", hex: "F03E2F" },
    { title: "Strapi", slug: "strapi", hex: "2F2E8B" },
    { title: "Prisma", slug: "prisma", hex: "2D3748" },
    { title: "Drizzle", slug: "drizzle", hex: "C5F74F" },
    { title: "Three.js", slug: "threedotjs", hex: "000000" },
    { title: "D3.js", slug: "d3dotjs", hex: "F9A03C" },
    { title: "Chart.js", slug: "chartdotjs", hex: "FF6384" },
    { title: "Socket.io", slug: "socketdotio", hex: "010101" },
    { title: "WebSocket", slug: "websocket", hex: "000000" },
    { title: "gRPC", slug: "grpc", hex: "244C5A" },
    { title: "Protocol Buffers", slug: "protobuf", hex: "4285F4" },
    { title: "OAuth", slug: "oauth", hex: "000000" },
    { title: "Auth0", slug: "auth0", hex: "EB5424" },
    { title: "Okta", slug: "okta", hex: "007DC1" },
    { title: "Sentry", slug: "sentry", hex: "362D59" },
    { title: "Datadog", slug: "datadog", hex: "632CA6" },
    { title: "Grafana", slug: "grafana", hex: "F46800" },
    { title: "Prometheus", slug: "prometheus", hex: "E6522C" },
    { title: "New Relic", slug: "newrelic", hex: "008C99" },
    { title: "Splunk", slug: "splunk", hex: "000000" }
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
     * Load icons manifest from Simple Icons CDN
     */
    async loadIcons() {
        try {
            // Fetch the icons data from Simple Icons npm package
            const response = await fetch('https://cdn.jsdelivr.net/npm/simple-icons@latest/_data/simple-icons.json');
            if (!response.ok) throw new Error('Failed to load icons');
            
            const data = await response.json();
            this.icons = data.icons || [];
            
            // If no icons loaded from CDN, use fallback
            if (this.icons.length === 0) {
                console.log('CDN returned empty icons data, using fallback');
                this.icons = [...FALLBACK_ICONS];
            } else {
                console.log(`Loaded ${this.icons.length} icons from Simple Icons CDN`);
            }
            
            this.filteredIcons = [...this.icons];
            this.isLoaded = true;
            return this.icons;
        } catch (error) {
            console.error('Error loading icons from primary source:', error);
            // Try alternative source
            try {
                const altResponse = await fetch('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json');
                if (altResponse.ok) {
                    const data = await altResponse.json();
                    this.icons = data.icons || [];
                    
                    if (this.icons.length > 0) {
                        this.filteredIcons = [...this.icons];
                        this.isLoaded = true;
                        console.log(`Loaded ${this.icons.length} icons from alternative source`);
                        return this.icons;
                    }
                }
            } catch (altError) {
                console.error('Alternative source also failed:', altError);
            }
            
            // Use fallback icons when CDN is unavailable or returns empty data
            console.log('Using fallback icons data (200+ popular icons)');
            this.icons = [...FALLBACK_ICONS];
            this.filteredIcons = [...this.icons];
            this.isLoaded = true;
            return this.icons;
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
