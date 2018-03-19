var canvas = document.getElementById("testCanvas");
var ctx = canvas.getContext("2d");
var blockSize = 10;
//var canvas_width = 400;
//var canvas_height = 300;
canvas.width = blockSize * 20;
canvas.height = blockSize * 20;
var color = "red";

var gameBoard = [];
var speedX = 2;
var speedY = 10;
var shapes = [];
var shape1 = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
];
var shape2 = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1]
];
var shape3 = [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
];
var shape4 = [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0]
];
var shapesArray1 = [shape1, shape2, shape3, shape4];

//generate random 
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//create gameboard 
for (r = 0; r < 20; r++) {
    gameBoard[r] = [];
    for (c = 0; c < 20; c++) {
        gameBoard[r][c] = "";
        //  console.log(gameBoard[r][c]);
    }
}

function drawBoard() {
    for (r = 0; r < 20; r++) {
        gameBoard[r] = [];
        for (c = 0; c < 20; c++) {
            gameBoard[r][c] = "blue";

        }
    }
}

var game = {
    start: function() {
        var newShape = new Shape();
        newShape.drawRect(newShape.posX, newShape.posY);
        shapes.push(newShape);

        newShape.moveShape();
    }
}


function Shape() {
    this.posX = canvas_width / 2 - 10;
    this.posY = 0;
    this.activeShape = true;

}

Shape.prototype.moveShape = function() {
    var x = this.posX;
    var y = this.posY;
    var activeShape = this.activeShape;
    // console.log('shapes', this);
    shapes.forEach(function(shape, index) {
        if (activeShape) {
            y += speedY;
        }
    });

    updateBoard();
    this.drawRect(x, y);
    // this.moveShape();
}

Shape.prototype.drawRect = function(x, y) {
    // var x = this.posX;
    //var y = this.posY;
    var ramdomNum = random(0, shapesArray1.length - 1);
    shapesArray1[ramdomNum].forEach(function(shapeItem, shapeIndex) {
        shapeItem.forEach(function(block, blockIndex) {
            if (block !== 0) {
                ctx.fillStyle = color;
                ctx.fillRect((blockIndex * blockSize) + x, (shapeIndex * blockSize) + y, blockSize, blockSize);

            }
        });
    });
}

function updateBoard() {

    clearBoard();
    shapes.forEach(function(shape, index) {
        shape.drawRect(shape.posX, shape.posY);
    });
    window.requestAnimationFrame(updateBoard);
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
}

game.start();