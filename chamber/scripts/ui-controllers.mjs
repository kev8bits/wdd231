export class NavigationController {
    constructor(btnSelector, navSelector) {
        this.navButton = document.querySelector(btnSelector);
        this.navBar = document.querySelector(navSelector);
        this.setup();
    }

    setup() {
        if (!this.navButton || !this.navBar) return;

        this.navButton.addEventListener('click', () => {
            const isOpen = this.navButton.classList.toggle('show');
            this.navBar.classList.toggle('show');
            this.navButton.setAttribute('aria-expanded', isOpen);
        });
    }
}

export class FooterController {
    static populateDates() {
        const currentYearEl = document.querySelector('#currentYear');
        const lastModifiedEl = document.querySelector('#lastModified');

        if (currentYearEl) {
            currentYearEl.textContent = new Date().getFullYear();
        }
        if (lastModifiedEl) {
            lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
        }
    }
}