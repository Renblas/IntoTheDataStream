/*
 *  World Class
 *  - responsible for handling world stuff
 *  By: Caleb
 */
class World {
    constructor(config) {
        this.mapStringArray = config.map.stringArray;
        this.startingPlayerPos = config.map.startingPlayerPos || new Vec2(1, 1);

        this.array = [[]];
    }
    draw() {
        
    }
}
