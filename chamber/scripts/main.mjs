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


//this evades render-blocking requests on lighthouse reports
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap';
document.head.appendChild(fontLink);