const currentYearElement = document.querySelector('#currentYear');
const lastModifiedElement = document.querySelector('#lastModified');

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}