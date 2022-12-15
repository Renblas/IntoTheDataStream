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

        var minX = floor(cameraObj.pos.x - (8/cameraObj.zoom));
        var maxX = ceil(cameraObj.pos.x + (8/cameraObj.zoom));
        var minY = floor(cameraObj.pos.y - (4.5/cameraObj.zoom));
        var maxY = ceil(cameraObj.pos.y + (4.5/cameraObj.zoom));

       
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
    //TODO
}