document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([32.3527, -90.8779], 13); // Vicksburg coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    const heatmapLayer = new L.heatLayer([], { radius: 25 }).addTo(map);

    fetch('https://cors-anywhere.herokuapp.com/https://vicksburgnews.com/feed/')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");
            const heatmapData = Array.from(items).map(item => {
                // Replace with actual lat and lng from your news feed
                const lat = parseFloat(item.querySelector("32.3526").textContent);
                const lng = parseFloat(item.querySelector("90.8779").textContent);
                return [lat, lng, 0.5];
            });
            heatmapLayer.setLatLngs(heatmapData);
        });

    // Adding the legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legend');
        const grades = [0, 0.2, 0.4, 0.6, 0.8, 1];
        const colors = ['#00f', '#0af', '#ff0', '#fa0', '#f00'];

        div.innerHTML += '<strong>Heatmap Intensity</strong><br>';
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);
});
