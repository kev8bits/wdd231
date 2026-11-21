// scripts/main.js

import ChamberDirectory from './ChamberDirectory.mjs';
import { NavigationController, FooterController } from './UIControllers.mjs';


document.addEventListener('DOMContentLoaded', () => {
    new NavigationController('#ham-btn', '#nav-bar');
    
    // Only initialize the directory if we are on the directory page
    const directoryContainer = document.querySelector('#directory-container');
    if (directoryContainer) {
        new ChamberDirectory('data/members.json', '#directory-container', '#grid-view', '#list-view');
    }

    FooterController.populateDates();
});