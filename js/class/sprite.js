/*
 *  Sprite Class
 *  - class that handles all sprites
 *  By: Caleb
 */
class Sprite {
    constructor(config) {
        this.img = config.img || "default";
        this.imgPos = config.imgPos || [0, 0];
        this.imgSize = config.imgSize || new Vec2(32, 32);
        this.imgOffset = config.imgOffset || new Vec2(0, 0);

        this.imgConfig = config.imgConfig;

        this.animation = this.imgConfig.animation;
        this.animationTime = 100;
        this.animationTimeCurr = 0;
    }
    update() {

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
            return "f";
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
        var o = objArr[i];
        var t = testArr[i];

        var isEqual = o == t;

        if (!(isEqual || t == "a")) {
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

const spriteConfig_Wall = {
    leftUpCornerTip: [[6, 2], "w w w w w w w f"],
    leftDownCornerTip: [[6, 0], "w w w w w f w w"],
    rightUpCornerTip: [[4, 2], "w f w w w w w w"],
    rightDownCornerTip: [[4, 0], "w w w f w w w w"],

    verticalShaft: [[8, 1], "f a w a f a w a"],
    horizontalShaft: [[8, 0], "w a f a w a f a"],

    upEndCap: [[7, 0], "f a f a w a f a"],
    downEndCap: [[7, 1], "w a f a f a f a"],
    leftEndCap: [[7, 2], "f a w a f a f a"],
    rightEndCap: [[8, 2], "f a f a f a w a"],

    leftUpCorner: [[1, 0], "f a w a w a f a"],
    leftDownCorner: [[1, 2], "w a w a f a f a"],
    rightUpCorner: [[3, 0], "f a f a w a w a"],
    rightDownCorner: [[3, 2], "w a f a f a w a"],

    center: [[2, 1], "w a w a w a w a"],
    leftWall: [[1, 1], "w a w a w a f a"],
    rightWall: [[3, 1], "w a f a w a w a"],
    upWall: [[2, 0], "f a w a w a w a"],
    downWall: [[2, 2], "w a w a f a w a"],
};

const spriteConfig_Floor = {
    center: [[2, 1], "f a f a f a f a"],

    leftUpCorner: [[1, 0], "w a f a f a w a"],
    leftDownCorner: [[1, 2], "f a f a w a w a"],
    rightUpCorner: [[3, 0], "w a w a f a f a"],
    rightDownCorner: [[3, 2], "f a w a w a f a"],

    singleVertical: [[5, 0], "f a w a f a w a"],
    singleHorizontal: [[4, 1], "w a f a w a f a"],

    leftWall: [[1, 1], "f a f a f a w a"],
    rightWall: [[3, 1], "f a w a f a f a"],
    upWall: [[2, 0], "w a f a f a f a"],
    downWall: [[2, 2], "f a f a w a f a"],
};

const spriteConfig_Door = {
    verticalUnlocked: [[1, 0], "f a w a f a w a"],
    horizontalUnlocked: [[1, 1], "w a f a w a f a"],
};

const spriteConfig_DoorFloor = {
    vertical: [[0, 1], "f a w a f a w a"],
    horizontal: [[0, 2], "w a f a w a f a"],
};

const spriteConfig_Enemy = {
    
} 
