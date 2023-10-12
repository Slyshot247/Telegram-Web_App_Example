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
                return [lat, lng, 0.5]; 
            });

            heatmapLayer.setLatLngs(heatmapData);
        });

    // Create a legend for the map
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 0.2, 0.4, 0.6, 0.8, 1],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i]) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);

    function getColor(d) {
        return d > 1 ? '#800026' :
               d > 0.8 ? '#BD0026' :
               d > 0.6 ? '#E31A1C' :
               d > 0.4 ? '#FC4E2A' :
               d > 0.2 ? '#FD8D3C' :
                         '#FEB24C';
    }
});
