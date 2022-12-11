/*
 *  GameObject Class
 *  - foundation for everything else in game
 *  By: Caleb
 */

class GameObject {
    // takes in config object
    constructor(config) {
        // Transform        
        this.pos = config.pos || new Vec2(0, 0); // position equals assigned pos with (0,0) as default
        this.size = config.size || new Vec2(1, 1); // use declared size or default to 1, 1 tile
        
        this.img = config.img || "noImage";
    }
    draw() {
        cameraObj.drawImg(this.img, this.pos, this.size);
    }
}