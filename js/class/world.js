/*
 *  World Class
 *  - responsible for handling world stuff
 *  By: Caleb
 */
class World {
    constructor(config) {
        this.map = config.map || testMap1;

        this.array = [[]];

        this.loadMap();
    }
    draw() {
        for (let i = 0; i < this.map.stringArray.length; i++) {
            for (let j = 0; j < this.map.stringArray[i].length; j++) {
                this.array[i][j].draw();
            }
        }
    }
    loadMap() {
        // Populate Array
        for (let i = 0; i < this.map.stringArray.length; i++) {
            this.array[i] = [];
            for (let j = 0; j < this.map.stringArray[i].length; j++) {
                const string = this.map.stringArray[i][j];
                switch (string) {
                    case ".":
                        this.array[i][j] = new Floor(new Vec2(j, i));
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
    constructor(pos) {
        this.pos = pos;
        this.size = new Vec2(1, 1);
        this.img = "floor";
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
