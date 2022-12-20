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
 *  - converts neibhbor tiles obj into string
 */
function tileImgToString(input) {
    switch (input.sprite.img) {
        case "wall":
            return "w";
        case "floor":
            return "f";
        case "door":
            return "d";
        default:
            print("ERROR: Img not recognized");
            break;
    }
}

/*
 *  - returns true if neighborString matches objectNeihborString
 */
function checkNeighborTileStrings(objString, toTestString) {
    objArr = split(objString, " ");
    testArr = split(toTestString, " ");

    for (let i = 0; i < objArr.length; i++) {
        if (objArr[i] == testArr[i] || testArr[i] == "a") {
            continue;
        } else {
            return false;
        }
    }

    return true;
}

/*  String starts from top and goes clockwise
 *  Ex: "1 2 3 4 5 6 7 8"    =   8 1 2
 *                               7   3
 *  Key:                         6 5 4
 *  - f = floor
 *  - a = all
 *  - w = wall
 */

/*
 *  Sprite Config Objects
 *  - config objects for sprites
 *  By: Caleb
 */

var spriteConfig_wall = {
    center: [[2, 1], "f f f f f f f f"],
    leftWall: [[1, 1], "f a f a f a w a"],
    rightWall: [[3, 1], "f a w a f a f a"],
    upWall: [[2, 0], "w a f a f a f a"],
    downWall: [[2, 2], "f a f a w a f a"],

    leftUpCorner: [[1, 0], "w a f a f a w a"],
    leftDownCorner: [[1, 2], "f a f a w a w a"],
    rightUpCorner: [[3, 0], "w a w a f a f a"],
    rightDownCorner: [[3, 2], "f a w a w a f a"],
};

var spriteConfig_Floor = {
    center: [[2, 1], "f f f f f f f f"],
    leftWall: [[1, 1], "f a f a f a w a"],
    rightWall: [[3, 1], "f a w a f a f a"],
    upWall: [[2, 0], "w a f a f a f a"],
    downWall: [[2, 2], "f a f a w a f a"],

    leftUpCorner: [[1, 0], "w a f a f a w a"],
    leftDownCorner: [[1, 2], "f a f a w a w a"],
    rightUpCorner: [[3, 0], "w a w a f a f a"],
    rightDownCorner: [[3, 2], "f a w a w a f a"],
};
