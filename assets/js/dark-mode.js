class DarkMode {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        // Check for saved theme preference or prefer OS theme
        const savedTheme = localStorage.getItem('theme');
        const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && osPrefersDark)) {
            this.enableDarkMode();
        }

        // Add event listener to toggle button
        this.themeToggle.addEventListener('click', () => {
            this.toggle();
        });

        // Listen for OS theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                e.matches ? this.enableDarkMode() : this.disableDarkMode();
            }
        });
    }

    enableDarkMode() {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

    disableDarkMode() {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }

    toggle() {
        if (document.documentElement.classList.contains('dark')) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkMode();
});