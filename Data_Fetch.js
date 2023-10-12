document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([32.3527, -90.8779], 13); // Vicksburg coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
});
