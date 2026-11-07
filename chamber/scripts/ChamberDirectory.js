export default class ChamberDirectory {
    constructor(url, containerSelector, gridBtnSelector, listBtnSelector) {
        this.membersUrl = url;
        this.container = document.querySelector(containerSelector);
        this.gridBtn = document.querySelector(gridBtnSelector);
        this.listBtn = document.querySelector(listBtnSelector);

        this.init();
    }

    async init() {
        this.setupViewToggles();
        await this.fetchAndRenderMembers();
    }

    setupViewToggles() {
        if (!this.gridBtn || !this.listBtn) return;

        this.gridBtn.addEventListener('click', () => this.toggleView('grid'));
        this.listBtn.addEventListener('click', () => this.toggleView('list'));
    }

    toggleView(viewType) {
        if (viewType === 'grid') {
            this.container.classList.add('grid-layout');
            this.container.classList.remove('list-layout');
            this.gridBtn.classList.add('active');
            this.listBtn.classList.remove('active');
        } else {
            this.container.classList.add('list-layout');
            this.container.classList.remove('grid-layout');
            this.listBtn.classList.add('active');
            this.gridBtn.classList.remove('active');
        }
    }

    async fetchAndRenderMembers() {
        try {
            const response = await fetch(this.membersUrl);
            if (!response.ok) {
                throw new Error(`HTTP Error Status: ${response.status}`);
            }
            const data = await response.json();
            this.render(data.members);
        } catch (error) {
            console.error('Failed to load chamber members:', error.message);
            this.container.innerHTML = `<p class="error-msg">Unable to load business directory. Please try again later.</p>`;
        }
    }

    getMembershipName(level) {
        switch (level) {
            case 3: return 'Gold Member';
            case 2: return 'Silver Member';
            case 1: default: return 'Member';
        }
    }

    render(members) {
        this.container.innerHTML = '';

        members.forEach((member, index) => {
            const card = document.createElement('section');
            card.classList.add('member-card');

            const filterClass = member.isWhiteLogo ? 'class="invert-filter"' : '';
            
            
            const loadingAttribute = index === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" ${loadingAttribute} width="200" height="100" ${filterClass}>
                <h2>${member.name}</h2>
                <p class="address">${member.address}</p>
                <p class="phone">${member.phone}</p>
                <p class="membership-level">${this.getMembershipName(member.membershipLevel)}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
            `;

            this.container.appendChild(card);
        });
    }
}