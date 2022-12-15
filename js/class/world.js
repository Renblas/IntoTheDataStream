/*
 *  World Class
 *  - responsible for handling world stuff
 *  By: Caleb
 */
var string;

class World {
    constructor(config) {
        this.map = config.map || testMap1;

        this.array = [[]];

        this.loadMap();
    }
    draw() {
        var minX = floor(cameraObj.pos.x - 8 / cameraObj.zoom);
        var maxX = ceil(cameraObj.pos.x + 8 / cameraObj.zoom);
        var minY = floor(cameraObj.pos.y - 4.5 / cameraObj.zoom);
        var maxY = ceil(cameraObj.pos.y + 4.5 / cameraObj.zoom);

        for (let i = minY; i < maxY; i++) {
            try {
                for (let j = minX; j < maxX; j++) {
                    try {
                        this.array[i][j].draw();
                    } catch (e) {}
                }
            } catch (e) {}
        }
    }
    update() {
        var minX = floor(cameraObj.pos.x - 8 / cameraObj.zoom);
        var maxX = ceil(cameraObj.pos.x + 8 / cameraObj.zoom);
        var minY = floor(cameraObj.pos.y - 4.5 / cameraObj.zoom);
        var maxY = ceil(cameraObj.pos.y + 4.5 / cameraObj.zoom);

        for (let i = minY; i < maxY; i++) {
            try {
                for (let j = minX; j < maxX; j++) {
                    try {
                        this.array[i][j].update();
                    } catch (e) {}
                }
            } catch (e) {}
        }
    }
    loadMap() {
        // Populate Array
        for (let i = 0; i < this.map.stringArray.length; i++) {
            string = this.map.stringArray[i];
            this.array[i] = [];
            for (let j = 0; j < string.length; j++) {
                const char = string[j];
                switch (char) {
                    case ".":
                        this.array[i][j] = new Floor(new Vec2(j, i), "floor");
                        break;

                    case "k":
                        this.array[i][j] = new Floor(new Vec2(j, i), "koransGrave");
                        break;

                    case "=":
                        this.array[i][j] = new Wall(new Vec2(j, i));
                        break;

                    case "d":
                        this.array[i][j] = new Door(new Vec2(j, i));
                        break;

                    default:
                        console.log("ERROR: map string symbol not recognized");
                        break;
                }
            }
        }
    }
}

class Floor {
    constructor(pos, img) {
        this.pos = pos;
        this.size = new Vec2(1, 1);
        this.img = img;
    }
    draw() {
        cameraObj.drawImg(this.img, this.pos, this.size);
    }
}

class Wall {
    constructor(pos) {
        this.pos = pos;
        this.size = new Vec2(1, 1);
        this.img = "wall";
    }
    draw() {
        cameraObj.drawImg(this.img, this.pos, this.size);
    }
}

class Door {
    constructor(pos) {
        this.pos = pos;
        this.size = new Vec2(1, 1);
        this.imgFloor = "floor";
        this.imgBase = "door_base";
        this.imgMoving = "door_moving";

        this.direction = 0;

        this.playerDetectionRange = 2;
        this.isOpen = false;

        this.hasInitialized = false;
    }
    init() {
        if (world.array[this.pos.y][this.pos.x - 1].img == "wall") {
            this.direction = 270;
        } else if (world.array[this.pos.y + 1][this.pos.x].img == "wall") {
            this.direction = 0;
        } else if (world.array[this.pos.y][this.pos.x + 1].img == "wall") {
            this.direction = 90;
        } else if (world.array[this.pos.y - 1][this.pos.x].img == "wall") {
            this.direction = 180;
        } else {
            print("no wall found")
            this.direction = 0;
        }

        this.hasInitialized = true;
    }
    update() {
        if (!this.hasInitialized) {
            this.init();
        }

        if (dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) <= this.playerDetectionRange) {
            this.open();
        } else {
            this.close();
        }
    }
    draw() {
        if (this.isOpen) {
            cameraObj.drawImg(this.imgFloor, this.pos, this.size);
            cameraObj.drawImgRotate(this.imgBase, this.pos, this.size, this.direction);
        } else {
            cameraObj.drawImg(this.imgFloor, this.pos, this.size);
            cameraObj.drawImgRotate(this.imgMoving, this.pos, this.size, this.direction);
            cameraObj.drawImgRotate(this.imgBase, this.pos, this.size, this.direction);
        }
    }
    open() {
        this.isOpen = true;
    }
    close() {
        this.isOpen = false;
    }
}
