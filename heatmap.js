document.getElementById("heatmap").addEventListener("mousemove", function(e) {
    // Get the position of the mouse pointer relative to the heatmap
    var x = e.offsetX / this.clientWidth;
    var y = e.offsetY / this.clientHeight;
    
    // Calculate the RGB color based on the position
    var r = 255 * y;
    var g = 255 - 255 * y;
    var b = 0;
    
    // Set the background color of the heatmap element
    this.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
});
