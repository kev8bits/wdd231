// scripts/home.mjs

import { NavigationController, FooterController } from './ui-controllers.mjs';
import { initWeather } from './home-weather.mjs';
import { initSpotlights } from './spotlights.mjs';

document.addEventListener('DOMContentLoaded', () => {
    new NavigationController('#ham-btn', '#nav-bar');
    FooterController.populateDates();

    initWeather();
    initSpotlights();
});