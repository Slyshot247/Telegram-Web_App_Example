document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([32.3527, -90.8779], 13); // Vicksburg coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    const heatmapLayer = new L.heatLayer([], {radius: 25}).addTo(map);

    fetch('https://cors-anywhere.herokuapp.com/https://vicksburgnews.com/feed/', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })
    .then(str => new
