/*
 *  Enemy Class
 *  - class for enemies
 *  By: Caleb
 */
class Enemy extends Entity {
    constructor(config) {
        super(config);
        this.type = "enemy";

        this.sprite.img = "enemy";
    }
}
