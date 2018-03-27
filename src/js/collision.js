// check collide
export function isCollide(gameBoard, shapes) {
    const s = shapes.tetrominoe;
    const p = shapes.speed;
    for (let y = 0; y < s.length; ++y) {
        for (let x = 0; x < s[y].length; ++x) {
            if (s[y][x] !== 0) {
                if ((gameBoard[y + p.speedY] &&
                        gameBoard[y + p.speedY][x + p.speedX]) !== 0) {
                    return true;
                }
            }
        }
    }
    return false;

}