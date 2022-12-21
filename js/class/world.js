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
    init() {
        for (let i = 0; i < this.array.length; i++) {
            try {
                for (let j = 0; j < this.array[i].length; j++) {
                    try {
                        this.array[i][j].init();
                    } catch (e) {}
                }
            } catch (e) {}
        }
    }
    getTile(x, y) {
        if (x >= 0 && y >= 0) {
            if (y < this.array.length && x < this.array[y].length) {
                return this.array[y][x];
            }
        }
        return null;
    }
    loadMap() {
        // Populate Array
        for (let i = 0; i < this.map.stringArray.length; i++) {
            string = split(this.map.stringArray[i], " ");
            this.array[i] = [];
            for (let j = 0; j < string.length; j++) {
                const char = string[j];
                switch (char) {
                    case "f":
                        this.array[i][j] = new Floor(new Vec2(j, i), "floor");
                        break;

                    case "k":
                        this.array[i][j] = new Floor(new Vec2(j, i), "koransGrave");
                        break;

                    case "w":
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
