/*
 *  Projectile Class
 *  - class that controls bullets
 *  By: Caleb
 */

class Projectile {
    constructor(config) {
        this.parent = config.parent;

        this.distanceTraveled = 0;
        this.pos = config.pos;
        this.rotation = config.rotation;
        this.velocity = new Vec2(0, 0);
        this.velocity.setComponents(config.speed, this.rotation);
        this.size = new Vec2(config.size, config.size) || new Vec2(1, 1);
        this.path = [this.pos];

        this.range = config.range || 4;

        this.homing = config.homing || 0;
        this.damage = config.damage || 1;
        this.isAreaDamage = config.isAreaDamage || false;
        this.damageAreaSize = config.damageAreaSize || 0;
        this.damageArea = config.damageArea || 0;

        this.sprite = new Sprite({
            img: "bullet",
            imgPos: [0, 0],
        });
    }
    draw() {
        cameraObj.drawImgRotate(this.sprite, this.pos, this.size, this.rotation);
    }
    update() {
        this.pos.x += this.velocity.x * deltaTimeFixed;
        this.pos.y += this.velocity.y * deltaTimeFixed;
        this.distanceTraveled += this.velocity.mag() * deltaTimeFixed;

        if (this.distanceTraveled >= this.range) {
            this.delete();
        }
    }
    delete() {
        GlobalEntityArray.splice(GlobalEntityArray.indexOf(this), 1);
    }
}
