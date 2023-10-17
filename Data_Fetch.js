let baseLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
    }
)
let cfg = {
    "radius": 40,
    "useLocalExtrema": true,
    valueField: 'price'
};
let heatmapLayer = new HeatmapOverlay(cfg);
let min = Math.min(...sales.map(sale => sale.value))
let max = Math.max(...sales.map(sale => sale.value))

let propertyHeatMap = new L.Map('map', {
    center: new L.LatLng(39.275, -76.613),
    zoom: 15,
    layers: [baseLayer, heatmapLayer]
})

heatmapLayer.setData({
    min: min,
    max: max,
    data: sales
});
