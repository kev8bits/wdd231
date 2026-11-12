import { initWeather } from './home-weather.mjs';
import { initSpotlights } from './spotlights.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamBtn = document.querySelector('#ham-btn');
    const navBar = document.querySelector('#nav-bar');

    if (hamBtn && navBar) {
        hamBtn.addEventListener('click', () => {
            const isOpen = navBar.classList.toggle('open');
            hamBtn.classList.toggle('open');
            hamBtn.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Footer Dates
    const yearEl = document.querySelector('#currentYear');
    const lastModEl = document.querySelector('#lastModified');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    if (lastModEl) {
        lastModEl.textContent = `Last Modified: ${document.lastModified}`;
    }

    // Home Page Modules
    initWeather();
    initSpotlights();
});