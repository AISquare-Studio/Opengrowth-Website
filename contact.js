// Initialize the map
const map = L.map('map').setView([37.4419, -122.1430], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker for the location
const marker = L.marker([37.4419, -122.1430]).addTo(map);

// Add a popup to the marker
marker.bindPopup("1280 Lincoln Ave, Palo Alto, CA 94301").openPopup();

// Show zoom instruction overlay on hover
const mapElement = document.getElementById('map');
const overlay = document.querySelector('.map-overlay');

mapElement.addEventListener('mouseenter', () => {
    overlay.style.opacity = '1';
});

mapElement.addEventListener('mouseleave', () => {
    overlay.style.opacity = '0';
});

// Handle contact button click
document.querySelector('.contact-btn').addEventListener('click', () => {
    document.querySelector('.contact-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
});