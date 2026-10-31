// Store the selected elements we are going to use
const navButton = document.querySelector('#ham-btn');

// Main navigation functionality
const navBar = document.querySelector('#nav-bar');




// Toggle the show class on and off
navButton.addEventListener('click', () => {
    const isOpen = navButton.classList.toggle('show');
    navButton.setAttribute('aria-expanded', isOpen);
});

navButton.addEventListener('click', () => {
    const isOpen = navButton.classList.toggle('show');
    navButton.setAttribute('aria-expanded', isOpen);
    navBar.classList.toggle('show');
});

