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
        this.sizeX = 0;
        this.sizeY = 0;

        this.determineImageThisFrame = false;

        this.loadMap();
    }
    draw() {
        var minX = floor(cameraObj.pos.x - 8 / cameraObj.zoom);
        var maxX = ceil(cameraObj.pos.x + 8 / cameraObj.zoom);
        var minY = floor(cameraObj.pos.y - 4.5 / cameraObj.zoom);
        var maxY = ceil(cameraObj.pos.y + 4.5 / cameraObj.zoom + 1);

        minX = minX < 0 ? 0 : minX;
        maxX = maxX > this.sizeX - 1 ? this.sizeX - 1 : maxX;
        minY = minY < 0 ? 0 : minY;
        maxY = maxY > this.sizeY - 1 ? this.sizeY - 1 : maxY;

        for (let i = minY; i < maxY; i++) {
            for (let j = minX; j < maxX; j++) {
                try {
                    this.array[i][j].draw();
                } catch (e) {
                    print(e);
                }
            }
        }
    }
    update() {
        var minX = floor(cameraObj.pos.x - 8 / cameraObj.zoom);
        var maxX = ceil(cameraObj.pos.x + 8 / cameraObj.zoom);
        var minY = floor(cameraObj.pos.y - 4.5 / cameraObj.zoom);
        var maxY = ceil(cameraObj.pos.y + 4.5 / cameraObj.zoom + 1);

        minX = minX < 0 ? 0 : minX;
        maxX = maxX > this.sizeX - 1 ? this.sizeX - 1 : maxX;
        minY = minY < 0 ? 0 : minY;
        maxY = maxY > this.sizeY - 1 ? this.sizeY - 1 : maxY;

        for (let i = minY; i < maxY; i++) {
            for (let j = minX; j < maxX; j++) {
                try {
                    this.array[i][j].update();
                } catch (e) {
                    print(e);
                }
            }
        }
    }
    init() {
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array[i].length; j++) {
                try {
                    this.array[i][j].init();
                } catch (e) {
                    print(e);
                }
            }
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
            this.sizeY++;
            this.array[i] = [];
            for (let j = 0; j < string.length; j++) {
                this.sizeX++;
                const char = string[j];
                switch (char) {
                    case "f":
                        this.array[i][j] = new Floor(new Vec2(j, i), "floor");
                        break;

                    case "w":
                        this.array[i][j] = new Wall(new Vec2(j, i));
                        break;

                    case "d":
                        this.array[i][j] = new Door(new Vec2(j, i));
                        break;

                    case "e":
                        this.array[i][j] = new Floor(new Vec2(j, i), "floor");
                        GlobalEntityArray.push(
                            new Enemy({
                                pos: new Vec2(j, i),
                                sprite: {
                                    img: "enemy",
                                    imgConfig: spriteConfig_Enemy,
                                },
                            })
                        );
                        break;

                    default:
                        console.log("ERROR: map string symbol not recognized");
                        break;
                }
            }
        }
    }
}
