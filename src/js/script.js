import { ArrayOfShapes } from './shapeMatrix.js';
import { Shape } from './shape.js';
import { Rotate } from './rotation.js';
import { GameBoard } from './gameBoard.js';
import { isCollide } from './collision.js';

let shapesArray = ArrayOfShapes();
let canvas = document.getElementById("testCanvas");
const shape_draw = new Shape();
let board = new GameBoard();
let ctx = canvas.getContext("2d");
let blockSize = 10;
canvas.width = blockSize * 20;
canvas.height = 400;

ctx.scale(10, 10);



//generate random 
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let randomNum = random(0, shapesArray.length - 1);

const gameBoard = board.createMatrix(20, 40);



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shape_draw.shapeDraw(gameBoard, { speedX: 0, speedY: 0 });
    shape_draw.shapeDraw(shapes.tetrominoe, shapes.speed);
}


let moveDownInterval = 50;
let moveDownCount = 0;

//move shape down and keep adding on gameboard
function movedown() {

    shapes.speed.speedY++;
    if (isCollide(gameBoard, shapes)) {
        shapes.speed.speedY--;
        board.fillgameBoard(gameBoard, shapes);
        for (let y = 0; y < gameBoard.length; y++) {
            for (let x = 0; x < gameBoard[y].length; x++) {
                if (gameBoard[0][x] !== 0) {
                    board.resetBoard(gameBoard, shapes);
                }
            }
        }
        board.updateGameBoard(gameBoard, shapes);
        updateScore();
        shapes.tetrominoe = shapesArray[random(0, shapesArray.length - 1)];
        shapes.speed.speedX = (gameBoard[0].length / 2 | 0) - (shapes.tetrominoe[0].length / 2 | 0);
        shapes.speed.speedY = 0;
    }
    moveDownCount = 0;
}



const shapes = new Shape({ speedX: 0, speedY: 0 }, shapesArray[randomNum], 0);

function update() {
    moveDownCount++;
    if (moveDownCount > moveDownInterval) {
        movedown(gameBoard, shapes);
    }
    draw();
    requestAnimationFrame(update);
}

//control horizontally
let isTouchedWall = false;

function moveLeftRight(dx) {

    shapes.speed.speedX += dx;

    if (isCollide(gameBoard, shapes)) {
        shapes.speed.speedX -= dx;
        //   isTouchedWall = true;
    }
    //return isTouchedWall;
}


function updateScore() {
    document.getElementById("score").innerHTML = "Score : " + shapes.score;
}

const rotation = new Rotate();
document.addEventListener('keydown', function(event) {

    if (event.keyCode === 37) {
        moveLeftRight(-1);
    }
    if (event.keyCode === 39) {
        moveLeftRight(1);
    }
    if (event.keyCode === 40) {
        movedown(gameBoard, shapes);
    }
    if (event.keyCode === 81) {
        rotation.rotateShapeRight(shapes);
    }
    if (event.keyCode === 87) {
        rotation.rotateShapeLeft(shapes);
    }
})

//resetBoard();
updateScore();
update();

/*
//create gameboard 
for (r = 0; r < 20; r++) {
    gameBoard[r] = [];
    for (c = 0; c < 20; c++) {
        gameBoard[r][c] = 0;
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


document.addEventListener('keydown', function(event) {
    console.log(event);
    if (event.keyCode === 37) {
        posX--;
    }
    if (event.keyCode === 38) {
        posY--;
    }
    if (event.keyCode === 39) {
        posX++;
    }
    if (event.keyCode === 40) {
        posY++;
    }
})

game.start();*/