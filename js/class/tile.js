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
        });
        this.type = "Tile";
        this.neighborTiles = {};

        this.hasInitialized = false;
    }
    draw() {
        if (this.isRevealed || !settings.FOG_OF_WAR) {
            cameraObj.drawImg(this.sprite, this.pos, this.size);
        }
    }
    update() {
        if (!this.hasInitialized) {
            this.init();
            this.hasInitialized = true;
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
        this.neighborTiles.down2 = world.getTile(this.pos.x, this.pos.y + 2);

        this.determineImage();
    }
    determineImage() {}
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
    init() {}
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
        this.type = "wall";
    }
    determineImage() {
        var a = this.neighborTiles;

        // sides not exist
        if (!a.down) {
            if (!a.left) {
                this.sprite.imgPos = [1, 2];
                return;
            }
            if (!a.right) {
                this.sprite.imgPos = [3, 2];
                return;
            }
            this.sprite.imgPos = [2, 2];
            return;
        }
        if (!a.up) {
            if (!a.left) {
                this.sprite.imgPos = [1, 0];
                return;
            }
            if (!a.right) {
                this.sprite.imgPos = [3, 0];
                return;
            }
            this.sprite.imgPos = [2, 0];
            return;
        }
        if (!a.left) {
            this.sprite.imgPos = [1, 1];
            return;
        }
        if (!a.right) {
            this.sprite.imgPos = [3, 1];
            return;
        }

        // Check sides for floor
        if (a.down && a.down.type != "wall") {
            this.sprite.imgPos = [0, 1];
            return;
        }
        if (a.up && a.up.type != "wall") {
            if (a.down2 && a.down2.img != "wall") {
                this.sprite.imgPos = [0, 0];
                return;
            }
            this.sprite.imgPos = [2, 0];
            return;
        }
    }
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