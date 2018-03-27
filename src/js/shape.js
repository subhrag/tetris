let canvas = document.getElementById("testCanvas");
let ctx = canvas.getContext("2d");
let color = "red";
export class Shape {

    constructor(speed, tetrominoe, score) {
        this.speed = speed;
        this.tetrominoe = tetrominoe;
        this.score = score;
    }

    //draw shape 
    shapeDraw(shape, speed) {
        shape.forEach(function(row, y) {
            row.forEach(function(value, x) {
                if (value !== 0) {
                    ctx.fillStyle = color;
                    // ctx.fillRect((x * blockSize) + x, (y * blockSize) + y, blockSize, blockSize);
                    ctx.fillRect(x + speed.speedX, y + speed.speedY, 1, 1);
                }
            });
        });
    }
}

//export const shapes = new Shape({ speedX: 0, speedY: 0 }, shapesArray[randomNum], 0);