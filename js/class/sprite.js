/*
 *  Sprite Class
 *  - class that handles all sprites
 *  By: Caleb
 */
class Sprite {
    constructor(config) {
        this.img = config.img || "default";
        this.imgPos = config.imgPos || [0, 0];
    }
}

/*
 *  Sprite Config Objects
 *  - config objects for sprites
 *  By: Caleb
 */
var spriteConfig_wall = {
    leftWall: [[(1, 1)], [(1, 1, 1, 1, 1, 0, 0, 0)]],
};

var spriteConfig_floor = {

    center: [[(1, 1)], [(1, 1, 1, 1, 1, 0, 0, 0)]],
    leftWall: [[(1, 1)], [(1, 1, 1, 1, 1, 0, 0, 0)]],
    leftWall: [[(1, 1)], [(1, 1, 1, 1, 1, 0, 0, 0)]],
    leftWall: [[(1, 1)], [(1, 1, 1, 1, 1, 0, 0, 0)]],
    leftWall: [[(1, 1)], [(1, 1, 1, 1, 1, 0, 0, 0)]],

    leftUpCorner: [[(1, 1)], [(1, 1, 1, 1, 1, 0, 0, 0)]],
    leftDownCorner: [[(1, 1)], [(1, 1, 1, 1, 1, 0, 0, 0)]],
    rightUpCorner: [[(1, 1)], [(1, 1, 1, 1, 1, 0, 0, 0)]],
    rightDownCorner: [[(1, 1)], [(1, 1, 1, 1, 1, 0, 0, 0)]],
};
