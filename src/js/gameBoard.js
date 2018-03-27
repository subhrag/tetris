export class GameBoard {
    //create blank matrix
    createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }

    //add shapes in matrix
    fillgameBoard(gameBoard, shapes) {
        shapes.tetrominoe.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    gameBoard[y + shapes.speed.speedY][x + shapes.speed.speedX] = value;
                }
            });

        });
    }

    //reset
    resetBoard(gameBoard, shapes) {
        gameBoard.forEach(row => row.fill(0));
        shapes.score = 0;
        updateScore();
    }

    //reset game with score
    updateGameBoard(gameBoard, shapes) {
        let filledRow = [];
        let rowCount = 1;
        outerloop:
            for (let y = gameBoard.length - 1; y > 0; --y) {
                let boardRow = gameBoard[y];
                for (let x = 0; x < boardRow.length; ++x) {
                    if (gameBoard[y][x] === 0) {
                        continue outerloop;
                    }
                }
                filledRow = gameBoard.splice(y, 1)[0].fill(0);
                console.log('fill', filledRow);
                gameBoard.unshift(filledRow);
                ++y;
                shapes.score += rowCount * 10;
                rowCount++;
            }
    }

}