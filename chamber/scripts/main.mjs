// scripts/main.js

import ChamberDirectory from './ChamberDirectory.mjs';
import { NavigationController, FooterController } from './UIControllers.mjs';
import { initJoinPage, initThankYouPage } from './joinForm.mjs';

document.addEventListener('DOMContentLoaded', () => {
    new NavigationController('#ham-btn', '#nav-bar');

    // Only initialize the directory if we are on the directory page
    const directoryContainer = document.querySelector('#directory-container');
    if (directoryContainer) {
        new ChamberDirectory('data/members.json', '#directory-container', '#grid-view', '#list-view');
    }

    // Only initialize join page logic (timestamp & modals) if we are on join.html
    if (document.querySelector('.wf1')) {
        initJoinPage();
    }

    // Only initialize thank you summary if we are on thankyou.html
    if (document.querySelector('#submission-summary')) {
        initThankYouPage();
    }

    FooterController.populateDates();
});