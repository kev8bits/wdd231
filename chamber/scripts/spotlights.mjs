const MEMBERS_URL = 'data/members.json';

export async function initSpotlights() {
    const container = document.querySelector('#spotlights-container');
    if (!container) return;

    try {
        const response = await fetch(MEMBERS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const eligibleMembers = data.members.filter(
            (member) => member.membershipLevel === 3 || member.membershipLevel === 2
        );

        const selected = shuffleArray(eligibleMembers).slice(0, 3);
        renderSpotlights(selected, container);
    } catch (error) {
        console.error('Spotlights error:', error);
        container.innerHTML = '<p>Unable to load member spotlights.</p>';
    }
}

function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

const SMALL_LOGO_MAP = {
    'images/rio-logo.webp': 'images/rio-logo_small.webp',
    'images/logo-malmo.webp': 'images/logo-malmo_small.webp',
    'images/fullpond-logo.webp': 'images/fullpond-logo_small.webp'
};

function renderSpotlights(members, container) {
    container.innerHTML = members
        .map((member) => {
            const isGold = member.membershipLevel === 3;
            const levelLabel = isGold ? 'Gold Member' : 'Silver Member';
            const badgeClass = isGold ? 'badge-gold' : 'badge-silver';
            const logoWrapClass = member.isWhiteLogo ? 'spotlight-logo-wrap dark-bg' : 'spotlight-logo-wrap';
            const logoSrc = SMALL_LOGO_MAP[member.image] || member.image;

            return `
                <article class="spotlight-card">
                    <div class="spotlight-header">
                        <h3>${member.name}</h3>
                        <span class="membership-badge ${badgeClass}">${levelLabel}</span>
                    </div>
                    <div class="${logoWrapClass}">
                        <img src="${logoSrc}" alt="${member.name} logo" width="140" height="80" loading="lazy">
                    </div>
                    <div class="spotlight-details">
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><a href="${member.website}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${member.name} website">Visit Website</a></p>
                    </div>
                </article>
            `;
        })
        .join('');
}