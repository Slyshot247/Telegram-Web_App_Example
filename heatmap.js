// Create a Leaflet map
var map = L.map('map').setView([51.505, -0.09], 13);

// Add a tile layer to the map (you can choose your preferred tile provider)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Sample heatmap data
var heatMapData = [
    [51.5, -0.09, 1], // Latitude, Longitude, Intensity
    [51.51, -0.1, 0.5],
    [51.52, -0.12, 0.8],
    // Add more data points here
];

// Create a Heatmap layer and add it to the map
var heat = L.heatLayer(heatMapData, { radius: 25 }).addTo(map);
