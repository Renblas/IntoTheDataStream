/*
 *  Tile Class
 *  - class for handling general tile logic
 *  By: Caleb
 */
class Tile {
    constructor(pos) {
        this.pos = pos;
        this.size = new Vec2(1, 1);
        this.sprite = new Sprite({
            img: "default",
            imgPos: [0, 0],
            imgConfig: null,
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
        if (!this.hasInitialized) {
            this.init();
            this.hasInitialized = true;
            return;
        }
        if (!this.hasDeterminedImage) {
            this.determineImage();
            this.hasDeterminedImage = true;
            return;
        }
    }
    revealSelf() {
        if (!this.isRevealed) {
            this.isRevealed = true;
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

        if (this.sprite.img == "wall") {
            if (this.neighborTiles.down && this.neighborTiles.down.sprite.img == "floor") {
                this.isWallFace = true;
            } else {
                this.isWallFace = false;
            }
        }
    }
    determineImage() {
        var a = this.neighborTiles;
        var antiChar = this.sprite.char == "f" ? "w" : "f";

        var neighborString = "";
        neighborString += !a.up ? antiChar : tileImgToString(a.up, antiChar);
        neighborString += " " + (!a.rightUp ? antiChar : tileImgToString(a.rightUp, antiChar));
        neighborString += " " + (!a.right ? antiChar : tileImgToString(a.right, antiChar));
        neighborString += " " + (!a.rightDown ? antiChar : tileImgToString(a.rightDown, antiChar));
        neighborString += " " + (!a.down ? antiChar : tileImgToString(a.down, antiChar));
        neighborString += " " + (!a.leftDown ? antiChar : tileImgToString(a.leftDown, antiChar));
        neighborString += " " + (!a.left ? antiChar : tileImgToString(a.left, antiChar));
        neighborString += " " + (!a.leftUp ? antiChar : tileImgToString(a.leftUp, antiChar));

        // Special Rules for Walls
        if (this.sprite.char == "w") {
            if (a.down && a.down.sprite.img == "floor") {
                this.sprite.imgPos = [0, 1];
                return;
            }

            if (a.down2 && a.down2.sprite.img == "floor") {
                neighborString = neighborString.replaceAt(8, "f");
            }
        }

        this.nt = neighborString;

        // Main Global Rules
        var possibleImg = Object.keys(this.sprite.imgConfig);
        for (let i = 0; i < possibleImg.length; i++) {
            var currentConfig = this.sprite.imgConfig[possibleImg[i]];
            if (checkNeighborTileStrings(neighborString, currentConfig[1])) {
                this.sprite.imgPos = currentConfig[0];
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
        super(pos);

        this.sprite.img = "floor";
        this.sprite.imgConfig = spriteConfig_Floor;
        this.sprite.char = "f";

        this.type = "floor";
    }
    revealSelf() {
        if (!this.isRevealed) {
            this.isRevealed = true;

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
        super(pos);

        this.sprite.img = "wall";
        this.sprite.imgConfig = spriteConfig_Wall;
        this.sprite.char = "w";

        this.type = "wall";
    }
    /*determineImage() {
        var a = this.neighborTiles;

        var l = (a.left ? a.left.sprite.img : "void") == "wall";
        var r = (a.right ? a.right.sprite.img : "void") == "wall";
        var u = (a.up ? a.up.sprite.img : "void") == "wall";
        var d = (a.down ? a.down.sprite.img : "void") == "wall";
        var ld = (a.leftDown ? a.leftDown.sprite.img : "void") == "wall";
        var rd = (a.rightDown ? a.rightDown.sprite.img : "void") == "wall";
        var lu = (a.leftUp ? a.leftUp.sprite.img : "void") == "wall";
        var ru = (a.rightUp ? a.rightUp.sprite.img : "void") == "wall";
        var d2 = (a.down2 ? a.down2.sprite.img : "void") == "wall";

        if (!d) {
            this.sprite.imgPos = [0, 1];
            return;
        }
        if (!d2) {
            // connected to wall face
            if (!u) {
                // and up is a floor
                if (!l) {
                    // and left is a floor
                    if (!r) {
                        // and right is a floor
                        this.sprite.imgPos = [0, 0];
                        return;
                    }
                    this.sprite.imgPos = [7, 2];
                    return;
                }
                if (!r) {
                    // and right is a floor
                    this.sprite.imgPos = [8, 2];
                    return;
                }
                this.sprite.imgPos = [8, 1];
                return;
            }
            if (!l) {
                if (!r) {
                    this.sprite.imgPos = [7, 1];
                    return;
                }
                this.sprite.imgPos = [1, 2];
                return;
            }
            if (!r) {
                this.sprite.imgPos = [3, 2];
                return;
            }
            this.sprite.imgPos = [2, 2];
            return;
        }
        // not connected to wall face
        if (!u) {
            // and up is a floor
            if (!l) {
                // and left is a floor
                if (!r) {
                    // and right is a floor
                    this.sprite.imgPos = [7, 0];
                    return;
                }
                this.sprite.imgPos = [1, 0];
                return;
            }
            if (!r) {
                // and right is a floor
                this.sprite.imgPos = [3, 0];
                return;
            }
            this.sprite.imgPos = [2, 0];
            return;
        }
        if (!l) {
            if (!r) {
                this.sprite.imgPos = [7, 1];
                return;
            }
            this.sprite.imgPos = [1, 1];
            return;
        }
        if (!r) {
            this.sprite.imgPos = [3, 1];
            return;
        }
        this.sprite.imgPos = [2, 1];
        return;
    }*/
}

/*
 *  Floor Class
 *  - handles logic/drawing for Doors
 *  By: Caleb
 */
class Door {
    constructor(pos) {
        this.pos = pos;
        this.posAdjust = new Vec2(pos.x - 0.5, pos.y - 0.5);
        this.size = new Vec2(1, 1);
        this.imgFloor = "floor";
        this.img = "door_base";
        this.imgMoving = "door_moving";

        this.direction = 90;

        this.playerDetectionRange = 1;
        this.isOpen = false;

        this.hasInitialized = false;
    }
    init() {
        // find door
        if (world.array[this.pos.y][this.pos.x - 1].img == "wall") {
            this.direction = 90;
        } else if (world.array[this.pos.y + 1][this.pos.x].img == "wall") {
            this.direction = 180;
        } else if (world.array[this.pos.y][this.pos.x + 1].img == "wall") {
            this.direction = 270;
        } else if (world.array[this.pos.y - 1][this.pos.x].img == "wall") {
            this.direction = 0;
        } else {
            print("no wall found");
            this.direction = 0;
        }

        if (world.array[this.pos.y][this.pos.x - 1].img == "door_base") {
            this.connectedDoor = world.array[this.pos.y][this.pos.x - 1];
        } else if (world.array[this.pos.y + 1][this.pos.x].img == "door_base") {
            this.connectedDoor = world.array[this.pos.y + 1][this.pos.x];
        } else if (world.array[this.pos.y][this.pos.x + 1].img == "door_base") {
            this.connectedDoor = world.array[this.pos.y][this.pos.x + 1];
        } else if (world.array[this.pos.y - 1][this.pos.x].img == "door_base") {
            this.connectedDoor = world.array[this.pos.y - 1][this.pos.x];
        }

        this.hasInitialized = true;
    }
    update() {
        if (!this.hasInitialized) {
            this.init();
        }

        var playerDist = dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y);
        if (playerDist < this.playerDetectionRange && !this.isOpen) {
            this.open();
            this.connectedDoor.open();
        } else if (playerDist > this.playerDetectionRange + 1 && this.isOpen) {
            this.close();
            this.connectedDoor.close();
        }
    }
    draw() {
        if (this.isRevealed || !settings.FOG_OF_WAR) {
            if (this.isOpen) {
                cameraObj.drawImg(this.imgFloor, this.pos, this.size);
                cameraObj.drawImgRotate(this.img, this.pos, this.size, this.direction);
            } else {
                cameraObj.drawImg(this.imgFloor, this.pos, this.size);
                cameraObj.drawImgRotate(this.imgMoving, this.pos, this.size, this.direction);
                cameraObj.drawImgRotate(this.img, this.pos, this.size, this.direction);
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
    revealSelf() {
        if (!this.isRevealed) {
            this.isRevealed = true;
        }
    }
}
