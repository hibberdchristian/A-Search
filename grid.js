var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Function to colour nodes
function colour(node, colour) {
    ctx.fillStyle = colour
    ctx.fillRect(node.x * 20, node.y * 20, 20, 20)
}

// Function to draw our grid
function draw_grid() {
    // Create a grid
    for (i = 0; i < x; i++) {
        for (j = 0; j < y; j++) {
            // Draw node
            ctx.strokeRect(i * 20, j * 20, 20, 20)
        }
    }
}

// Function to animate the path
function draw_path(path) {
    for(var i = 1; i<path.length-1; i++) {
        setTimeout(function(i, path) {
            colour(path[i],"blue");
        }, 100*i,i,path)
    }
}