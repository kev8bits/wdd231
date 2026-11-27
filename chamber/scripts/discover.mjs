import { discoverPlaces } from '../data/discover.mjs';

const VISIT_STORAGE_KEY = 'sfChamberDiscoverLastVisit';
const MS_PER_DAY = 86400000;

function renderVisitMessage() {
    const visitBanner = document.querySelector('#visit-banner');
    const visitMessage = document.querySelector('#visit-message');
    const closeVisitButton = document.querySelector('#close-visit-btn');

    if (!visitBanner || !visitMessage) {
        return;
    }

    const now = Date.now();
    const storedVisit = localStorage.getItem(VISIT_STORAGE_KEY);

    if (!storedVisit) {
        visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const previousTimestamp = Number(storedVisit);
        const elapsedMs = now - previousTimestamp;

        if (Number.isNaN(previousTimestamp) || elapsedMs < MS_PER_DAY) {
            visitMessage.textContent = 'Back so soon! Awesome!';
        } else {
            const daysElapsed = Math.floor(elapsedMs / MS_PER_DAY);
            const dayLabel = daysElapsed === 1 ? 'day' : 'days';
            visitMessage.textContent = `You last visited ${daysElapsed} ${dayLabel} ago.`;
        }
    }

    localStorage.setItem(VISIT_STORAGE_KEY, String(now));

    if (closeVisitButton) {
        closeVisitButton.addEventListener('click', () => {
            visitBanner.classList.add('is-hidden');
        });
    }
}

function openPlaceModal(place) {
    const dialog = document.querySelector('#place-dialog');
    const title = document.querySelector('#dialog-title');
    const image = document.querySelector('#dialog-image');
    const category = document.querySelector('#dialog-category');
    const address = document.querySelector('#dialog-address');
    const description = document.querySelector('#dialog-description');
    const highlight = document.querySelector('#dialog-highlight');

    if (!dialog) {
        return;
    }

    title.textContent = place.name;
    image.src = place.image;
    image.alt = `${place.name} in Santa Fe, Argentina`;
    image.width = place.width;
    image.height = place.height;
    category.textContent = place.category;
    address.textContent = place.address;
    description.textContent = place.description;
    highlight.textContent = place.highlight;

    dialog.showModal();
}

function initModalEvents() {
    const dialog = document.querySelector('#place-dialog');
    const closeDialogButton = document.querySelector('#close-dialog-btn');

    if (!dialog || !closeDialogButton) {
        return;
    }

    closeDialogButton.addEventListener('click', () => {
        dialog.close();
    });

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}

function renderDiscoverCards(places) {
    const gridContainer = document.querySelector('#discover-grid');

    if (!gridContainer) {
        return;
    }

    const fragment = document.createDocumentFragment();

    places.forEach((place, index) => {
        const card = document.createElement('article');
        card.className = 'discover-card';
        card.dataset.area = place.id;

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = place.image;
        img.alt = `${place.name} in Santa Fe`;
        img.width = place.width;
        img.height = place.height;
        if (index > 1) {
            img.loading = 'lazy';
        }
        figure.appendChild(img);

        const content = document.createElement('div');
        content.className = 'card-content';

        const heading = document.createElement('h2');
        heading.textContent = place.name;

        const address = document.createElement('address');
        address.textContent = place.address;

        const description = document.createElement('p');
        description.textContent = place.description;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'learn-more-btn';
        button.textContent = 'Learn More';
        button.addEventListener('click', () => {
            openPlaceModal(place);
        });

        content.append(heading, address, description, button);
        card.append(figure, content);
        fragment.appendChild(card);
    });

    gridContainer.replaceChildren(fragment);
}

export function initDiscoverPage() {
    renderVisitMessage();
    initModalEvents();
    renderDiscoverCards(discoverPlaces);
}