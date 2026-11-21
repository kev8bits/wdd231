export function initJoinPage() {
    const timestampInput = document.querySelector('#timestamp');
    if (timestampInput) {
        const now = new Date();
        timestampInput.value = now.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    }

    const openButtons = document.querySelectorAll('.open-modal-btn');
    const closeButtons = document.querySelectorAll('.close-modal-btn');
    const modals = document.querySelectorAll('.membership-modal');

    openButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const dialog = document.getElementById(modalId);
            if (dialog) {
                dialog.showModal();
            }
        });
    });

    closeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const dialog = btn.closest('dialog');
            if (dialog) {
                dialog.close();
            }
        });
    });

    modals.forEach((dialog) => {
        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    });
}

export function initThankYouPage() {
    const summaryContainer = document.querySelector('#submission-summary');
    if (!summaryContainer) return;

    const params = new URLSearchParams(window.location.search);

    const firstName = params.get('first') || 'Not provided';
    const lastName = params.get('last') || 'Not provided';
    const email = params.get('email') || 'Not provided';
    const phone = params.get('phone') || 'Not provided';
    const organization = params.get('organization') || 'Not provided';
    const timestamp = params.get('timestamp') || 'Not recorded';

    summaryContainer.innerHTML = `
        <ul class="summary-list">
            <li><strong>First Name:</strong> ${escapeHTML(firstName)}</li>
            <li><strong>Last Name:</strong> ${escapeHTML(lastName)}</li>
            <li><strong>Email:</strong> ${escapeHTML(email)}</li>
            <li><strong>Mobile Phone:</strong> ${escapeHTML(phone)}</li>
            <li><strong>Business / Organization:</strong> ${escapeHTML(organization)}</li>
            <li><strong>Application Submitted:</strong> ${escapeHTML(timestamp)}</li>
        </ul>
    `;
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}