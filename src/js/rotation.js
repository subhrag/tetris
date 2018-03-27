//rotate shape

class Rotate {

    rotateShapeLeft(shapes) {
        let result = shapes.tetrominoe;
        // if (!isTouchedWall) {
        result = shapes.tetrominoe.reverse();
        // }
        return result;
    }

    rotateShapeRight(shapes) {
        let result = shapes.tetrominoe;
        //  if (!isTouchedWall) {
        for (let y = 0; y < shapes.tetrominoe.length; y++) {
            for (let x = 0; x < y; x++) {
                let temp = shapes.tetrominoe[y][x];
                shapes.tetrominoe[y][x] = shapes.tetrominoe[x][y];
                shapes.tetrominoe[x][y] = temp;
            }
        }
        result = shapes.tetrominoe.forEach(row => row.reverse());
        //}
        return result;
    }
}
export { Rotate };