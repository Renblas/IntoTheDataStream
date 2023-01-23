/*
 *  Enemy Class
 *  - class for enemies
 *  By: Caleb
 */
class Enemy extends Entity {
    constructor(pos) {
        super(pos);
        this.type = "enemy";

        this.sprite.img = "enemy";
    }
}
