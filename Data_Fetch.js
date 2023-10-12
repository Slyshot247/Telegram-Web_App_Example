document.addEventListener("DOMContentLoaded", function() {
    // ... [Your previous map initialization code]

    // Adding the legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legend');
        const grades = [0, 0.2, 0.4, 0.6, 0.8, 1];
        const colors = ['#00f', '#0af', '#ff0', '#fa0', '#f00'];
        
        // Title for the legend
        div.innerHTML += '<strong>Heatmap Intensity</strong><br>';
        
        // Generating a color square for each intensity
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML += 
                '<i style="background:' + colors[i] + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);
});
