/*
 *  Tile Class
 *  - class for handling general tile logic
 *  By: Caleb
 */
class Tile {
    constructor(config) {
        this.pos = config.pos;
        this.size = new Vec2(1, 1);
        this.sprite = new Sprite({
            img: config.img,
            imgPos: config.imgPos,
            imgConfig: config.imgConfig,
        });
        this.type = "Tile";
        this.neighborTiles = {};

        this.hasInitialized = false;
        this.hasDeterminedImage = false;
    }
    draw() {
        if (this.hasDeterminedImage) {
            if (this.isRevealed || !settings.FOG_OF_WAR) {
                cameraObj.drawImg(this.sprite, this.pos, this.size);
            }
        }
    }
    update() {
        if (this.isRevealed || !settings.FOG_OF_WAR) {
            this.determineImage(this.sprite);
            this.hasDeterminedImage = true;
            return;
        }
    }
    revealSelf() {
        if (this.hasInitialized && !this.isRevealed) {
            this.isRevealed = true;
            return true;
        } else {
            return false;
        }
    }
    init() {
        this.neighborTiles.left = world.getTile(this.pos.x - 1, this.pos.y);
        this.neighborTiles.right = world.getTile(this.pos.x + 1, this.pos.y);
        this.neighborTiles.up = world.getTile(this.pos.x, this.pos.y - 1);
        this.neighborTiles.down = world.getTile(this.pos.x, this.pos.y + 1);
        this.neighborTiles.leftDown = world.getTile(this.pos.x - 1, this.pos.y + 1);
        this.neighborTiles.leftUp = world.getTile(this.pos.x - 1, this.pos.y - 1);
        this.neighborTiles.rightDown = world.getTile(this.pos.x + 1, this.pos.y + 1);
        this.neighborTiles.rightUp = world.getTile(this.pos.x + 1, this.pos.y - 1);
        this.neighborTiles.down2 = world.getTile(this.pos.x, this.pos.y + 2);

        this.hasInitialized = true;
    }
    determineImage(sprite) {
        var a = this.neighborTiles;
        var antiChar = sprite.char == "w" ? "w" : antiChar;

        var neighborString = "";
        neighborString += !a.up ? antiChar : tileImgToString(a.up);
        neighborString += " " + (!a.rightUp ? antiChar : tileImgToString(a.rightUp));
        neighborString += " " + (!a.right ? antiChar : tileImgToString(a.right));
        neighborString += " " + (!a.rightDown ? antiChar : tileImgToString(a.rightDown));
        neighborString += " " + (!a.down ? antiChar : tileImgToString(a.down));
        neighborString += " " + (!a.leftDown ? antiChar : tileImgToString(a.leftDown));
        neighborString += " " + (!a.left ? antiChar : tileImgToString(a.left));
        neighborString += " " + (!a.leftUp ? antiChar : tileImgToString(a.leftUp));

        // Main Global Rules
        var possibleImg = Object.keys(sprite.imgConfig);
        for (let i = 0; i < possibleImg.length; i++) {
            var currentConfig = sprite.imgConfig[possibleImg[i]];
            if (checkNeighborTileStrings(neighborString, currentConfig[1])) {
                sprite.imgPos = currentConfig[0];
                return;
            }
        }
    }
}

/*
 *  Floor Class
 *  - handles logic/drawing for floors
 *  By: Caleb
 */
class Floor extends Tile {
    constructor(pos) {
        var config = {
            pos: pos,
            imgConfig: spriteConfig_Floor,
            img: "floor",
        };
        super(config);

        this.sprite.char = "f";

        this.type = "floor";
    }
    revealSelf() {
        if (super.revealSelf()) {
            try {
                world.getTile(this.pos.x - 1, this.pos.y).revealSelf();
                world.getTile(this.pos.x - 1, this.pos.y - 1).revealSelf();
                world.getTile(this.pos.x, this.pos.y - 1).revealSelf();
                world.getTile(this.pos.x + 1, this.pos.y - 1).revealSelf();
                world.getTile(this.pos.x + 1, this.pos.y).revealSelf();
                world.getTile(this.pos.x + 1, this.pos.y + 1).revealSelf();
                world.getTile(this.pos.x, this.pos.y + 1).revealSelf();
                world.getTile(this.pos.x - 1, this.pos.y + 1).revealSelf();
            } catch (e) {}
        }
    }
}

/*
 *  Walls Class
 *  - handles logic/drawing for walls
 *  By: Caleb
 */
class Wall extends Tile {
    constructor(pos) {
        var config = {
            pos: pos,
            imgConfig: spriteConfig_Wall,
            img: "wall",
        };
        super(config);

        this.sprite.img = "wall";
        this.sprite.imgConfig = spriteConfig_Wall;
        this.sprite.char = "w";
        this.sprite.imgOffset = new Vec2(0, -22);

        this.spriteWallFace = new Sprite({
            img: "wall",
            imgConfig: null,
            char: "w",
            imgOffset: new Vec2(0, 0),
            imgPos: [0, 1],
        });

        this.type = "wall";

        this.isWallFace = false;

        this.isTopFace;
        this.transparentTimer = 0;
        this.transparentTimerMax = 0.25;
        this.minTransparency = 0.25;
    }
    draw() {
        if (this.hasDeterminedImage) {
            if (this.isRevealed || !settings.FOG_OF_WAR) {
                if (this.isWallFace) {
                    cameraObj.drawImg(this.spriteWallFace, this.pos, this.size);
                }
                cameraObj.drawImg(this.sprite, this.pos, this.size);
            }
        }
    }
    update() {
        super.update();

        if (this.isTopFace) {
            var yDist = this.pos.y - player.pos.y;
            if (yDist < 2 && yDist > 0) {
                this.transparentTimer += deltaTimeFixed;
                if (this.transparentTimer > this.transparentTimerMax) this.transparentTimer = this.transparentTimerMax;
            } else if (yDist > 2.5 || yDist < 0) {
                this.transparentTimer -= deltaTimeFixed;
                if (this.transparentTimer < 0) this.transparentTimer = 0;
            }

            this.sprite.opacity =
                0.75 * ((this.transparentTimerMax - this.transparentTimer) / this.transparentTimerMax) + 0.25;
        }
    }
    init() {
        super.init();

        // Check if is a top face
        if (this.neighborTiles.up && this.neighborTiles.up.type != "wall") {
            this.isTopFace = true;
        } else {
            this.isTopFace = false;
        }

        // Check if is bottom face
        if (this.neighborTiles.down && this.neighborTiles.down.sprite.img != "wall") {
            this.isWallFace = true;
        } else {
            this.isWallFace = false;
        }
    }
}

/*
 *  Door Class
 *  - handles logic/drawing for Doors
 *  By: Caleb
 */
class Door extends Tile {
    constructor(pos) {
        var config = {
            pos: pos,
            imgConfig: spriteConfig_Door,
            img: "door",
        };
        super(config);

        this.sprite.img = "door";
        this.sprite.imgPos = [1, 0];
        this.sprite.char = "f";
        this.sprite.imgConfig = spriteConfig_Door;
        this.sprite.imgOffset = new Vec2(0, -14);

        this.spriteDoorFloor = new Sprite({
            img: "door",
            imgPos: [0, 1],
            char: "f",
            imgConfig: spriteConfig_DoorFloor,
        });

        this.playerDetectionRange = 1.5;
        this.isOpen = false;

        this.maxOpenTime = 0.5;
        this.currentOpenTime = 0;
        this.percentOpen = 0;
    }
    update() {
        if (!this.hasDeterminedImage) {
            this.determineImage(this.sprite);
            if (this.sprite.imgPos[0] == 1 && this.sprite.imgPos[1] == 1) {
                this.horizontal = true;
            } else {
                this.horizontal = false;
            }

            //this.determineImage(this.spriteDoorFloor);
            this.hasDeterminedImage = true;
            return;
        }

        var playerDist = dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y);
        if (playerDist <= this.playerDetectionRange) {
            if (this.currentOpenTime < this.maxOpenTime && !this.isOpen) {
                this.currentOpenTime += deltaTimeFixed;
            } else {
                this.currentOpenTime = this.maxOpenTime;
                this.isOpen = true;
                this.neighborTiles.up.revealSelf();
                this.neighborTiles.down.revealSelf();
                this.neighborTiles.left.revealSelf();
                this.neighborTiles.right.revealSelf();
            }
        } else if (playerDist > this.playerDetectionRange) {
            if (this.currentOpenTime > 0 && this.isOpen) {
                this.currentOpenTime -= deltaTimeFixed;
            } else {
                this.currentOpenTime = 0;
                this.isOpen = false;
            }
        }
    }
    draw() {
        if (this.hasDeterminedImage) {
            if (this.isRevealed || !settings.FOG_OF_WAR) {
                this.percentOpen = sq(this.currentOpenTime / this.maxOpenTime);

                cameraObj.drawImg(this.spriteDoorFloor, this.pos, this.size);

                this.sprite.imgSize.set(32, 32 * (1 - this.percentOpen));
                this.sprite.imgOffset.set(0, 32 * this.percentOpen - (this.horizontal ? 22 : 14));

                cameraObj.drawImg(this.sprite, this.pos, this.size);
            }
        }
    }
    open() {
        this.isOpen = true;
        print("Opening the Door");
    }
    close() {
        this.isOpen = false;
        print("Closing the Door");
    }
}
