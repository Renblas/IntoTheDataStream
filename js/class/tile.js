/*
 *  Floor Class
 *  - handles logic/drawing for floors
 *  By: Caleb
 */
class Floor {
    constructor(pos, img) {
        this.pos = pos;
        this.size = new Vec2(1, 1);
        this.img = img;
        this.isRevealed = false;
    }
    draw() {
        if (this.isRevealed || !settings.FOG_OF_WAR) {
            cameraObj.drawImg(this.img, this.pos, this.size);
        }
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
 *  Floor Class
 *  - handles logic/drawing for walls
 *  By: Caleb
 */
class Wall {
    constructor(pos) {
        this.pos = pos;
        this.size = new Vec2(1, 1);
        this.img = "wall";
    }
    draw() {
        if (this.isRevealed || !settings.FOG_OF_WAR) {
            cameraObj.drawImg(this.img, this.pos, this.size);
        }
    }
    revealSelf() {
        if (!this.isRevealed) {
            this.isRevealed = true;
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
