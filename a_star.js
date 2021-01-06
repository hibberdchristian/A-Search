// Variable to store the dimension of the grid
var x = 25;
var y = 25;

// Variable to store the openSet and a random Start and End point
var openSet = []
var start = {
    x: random_integer(0,x-1),
    y: random_integer(0,y-1)
}
var end = {
    x: random_integer(0,x-1),
    y: random_integer(0,y-1)
}

// Function to remove an item from an array
function remove_item(arr, item) {
    for (i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == item) {
            arr.splice(i, 1);
        }
    }
}

// Function to generate random number
function random_integer(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to create a matrix and populate each node with an object
function create_matrix(x, y) {
    var matrix = [];

    // Create a object to represent each node on the grid
    function Node(x, y) {
        this.x = x // x coordinate of the node
        this.y = y // y coordinate of the node
        this.f_score = Infinity // f_score = g_score + h_score
        this.g_score = Infinity // distance from the start
        this.h_score = 0 // heuristic function to estimate the distance to the end
        this.parent = null // the node from which we came from
        this.neighbours = [] // the surrounding nodes
        this.block = true_or_false(0.25)
    }

    // Generate each node on the grid
    for (i = 0; i < x; i++) {
        matrix[i] = [];
        for (j = 0; j < y; j++) {
            matrix[i][j] = new Node(i, j)
        }
    }

    
    for (i = 0; i < x; i++) {
        for (j = 0; j < y; j++) {
            // Indentify the neighbours
            if (i > 0) {matrix[i][j].neighbours.push(matrix[i - 1][j])} // Above
            if (j > 0) {matrix[i][j].neighbours.push(matrix[i][j - 1])} // Below
            if (i < x - 1) {matrix[i][j].neighbours.push(matrix[i + 1][j])} // Left
            if (j < y - 1) {matrix[i][j].neighbours.push(matrix[i][j + 1])} // Right
            // Mark the blocks in grey
            if (matrix[i][j].block) {colour(matrix[i][j],"grey")}
        }
    }

    // Randomly true or false based on a probability
    function true_or_false(probability) {
        if(Math.random() < 0.25) {
            return true;
        } else {
            return false;
        }
    }

    return matrix;
}

// Heuristic function - Pythagorean theorem
function heuristic(node) {
    var a = Math.abs(node.x - end.x)
    var b = Math.abs(node.y - end.y)
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
    return c;
}

// Main function for the A* Algorithm
// https://en.wikipedia.org/wiki/A*_search_algorithm
function a_star(start, end) {
    // Initialize the variables
    openSet.push(start);
    start.g_score = 0;
    start.h_score = heuristic(start);
    end.block = false
    colour(start,"red")
    colour(end,"green")

    while (openSet.length > 0) {

        openSet.sort(function (a, b) { return a.f_score - b.f_score }) // sort the openSet by f_score
        var current = openSet[0];
        remove_item(openSet, current);

        // When finished return the optimal path
        if (current.x == end.x && current.y == end.y) {
            var path = [current]
            var position = current;
            while(position.parent) {
                path.push(position.parent)
                position = position.parent
            }
            return path
        }

        // Loop through each neighbour
        for (var i = 0; i < current.neighbours.length; i++) {
                var temp_g_score = current.g_score + 1
                // If this path is better than any previous and the node is not a block then evaluate it
                if (temp_g_score < current.neighbours[i].g_score && current.neighbours[i].block == false) { 
                    current.neighbours[i].parent = current
                    current.neighbours[i].g_score = temp_g_score
                    current.neighbours[i].f_score = current.neighbours[i].g_score + heuristic(current.neighbours[i])
                    if (!openSet.includes(current.neighbours[i])) {
                        openSet.push(current.neighbours[i]);
                    }
                }
        }
    }
}

var matrix = create_matrix(x, y); // Create the matrix to represent the grid
var optimum_path = a_star(matrix[start.x][start.y], matrix[end.x][end.y]); // Execute the algorithm
draw_path(optimum_path); // Draw the optimal path