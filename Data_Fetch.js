document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([32.3527, -90.8779], 13); // Vicksburg coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    const heatmapLayer = new L.heatLayer([], {radius: 25}).addTo(map);

    fetch('https://cors-anywhere.herokuapp.com/https://vicksburgnews.com/feed/')

        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");
            const heatmapData = Array.from(items).map(item => {
                // For simplicity, generate random coords around Vicksburg
                const lat = 32.3527 + (Math.random() - 0.5) * 0.1;
                const lng = -90.8779 + (Math.random() - 0.5) * 0.1;
                return [lat, lng, 0.5]; // 0.5 is the intensity; you can modify this based on some news metric if needed
            });

            heatmapLayer.setLatLngs(heatmapData);
        });
});
