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

        this.isAnimatable = config.isAnimatable ? config.isAnimatable : false;

        if (this.isAnimatable) {
            this.animation = this.imgConfig.animation;
            this.animation.time = 100;
            this.animation.timeCurr = 0;
            this.animation.frameCount = 0;
        }
    }
    update(state) {
        if (!this.isAnimatable) return;

        if (this.animation.state != state) {
            this.animation.state = state;

            this.animation.frameCount = 0;
            this.animation.timeCurr = 0;
        }

        this.animation.currentState = this.animation[this.animation.state];
        this.imgPos = this.animation.currentState[this.animation.frameCount];

        this.animation.timeCurr += deltaTimeFixed;
        if (this.animation.timeCurr >= this.animation.time) {
            this.animation.frameCount += 1;
            if (this.animation.frameCount >= this.animation.currentState.length) {
                this.animation.frameCount = 0;
            }
            this.animation.timeCurr -= this.animation.time;
        }
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

// Tiles
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

// Entity Sprites
const spriteConfig_Enemy = {
    down1: [0, 0],
    down2: [1, 0],
    down3: [2, 0],
    down4: [3, 0],

    right1: [4, 0],
    right2: [5, 0],
    right3: [6, 0],
    right4: [7, 0],

    up1: [8, 0],
    up2: [9, 0],
    up3: [10, 0],
    up4: [11, 0],

    left1: [12, 0],
    left2: [13, 0],
    left3: [14, 0],
    left4: [15, 0],
};
spriteConfig_Enemy.animation = {
    down: [spriteConfig_Enemy.down1, spriteConfig_Enemy.down2, spriteConfig_Enemy.down3, spriteConfig_Enemy.down4],
    left: [spriteConfig_Enemy.left1, spriteConfig_Enemy.left2, spriteConfig_Enemy.left3, spriteConfig_Enemy.left3],
    up: [spriteConfig_Enemy.up1, spriteConfig_Enemy.up2, spriteConfig_Enemy.up3, spriteConfig_Enemy.up4],
    right: [spriteConfig_Enemy.right1, spriteConfig_Enemy.right2, spriteConfig_Enemy.right3, spriteConfig_Enemy.right4],
};
