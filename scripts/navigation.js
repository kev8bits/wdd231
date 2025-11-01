// Store the selected elements we are going to use
const navButton = document.querySelector('#ham-btn');

// Main navigation functionality
const navLinks = document.querySelector('#nav-bar');




// Toggle the show class on and off
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navLinks.classList.toggle('show');
});

