// scripts/main.js

import { NavigationController, FooterController } from './UIControllers.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    new NavigationController('#ham-btn', '#nav-bar');

    // Only initialize the directory if we are on the directory page
    const directoryContainer = document.querySelector('#directory-container');
    if (directoryContainer) {
        const { default: ChamberDirectory } = await import('./ChamberDirectory.mjs');
        new ChamberDirectory('data/members.json', '#directory-container', '#grid-view', '#list-view');
    }

    // Only initialize join page logic (timestamp & modals) if we are on join.html
    if (document.querySelector('.wf1')) {
        const { initJoinPage } = await import('./joinForm.mjs');
        initJoinPage();
    }

    // Only initialize thank you summary if we are on thankyou.html
    if (document.querySelector('#submission-summary')) {
        const { initThankYouPage } = await import('./joinForm.mjs');
        initThankYouPage();
    }

    // Only initialize discover page if we are on discover.html
    if (document.querySelector('#discover-grid')) {
        const { initDiscoverPage } = await import('./discover.mjs');
        initDiscoverPage();
    }

    FooterController.populateDates();
});