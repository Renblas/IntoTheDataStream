/*
 *  Projectile Class
 *  - class that controls bullets
 *  By: Caleb
 */

class Projectile {
    constructor(config) {
        this.parent = config.parent;

        this.pos = config.pos;
        this.velocity = config.pos;
        this.size = config.size;

        this.range = config.range;

        this.homing = config.homing;
        this.damage = config.damage;
        this.isAreaDamage = config.isAreaDamage;
        this.damageArea = config.damageArea;

        this.img = "bullet";
    }
    draw() {}
    update() {}
}
