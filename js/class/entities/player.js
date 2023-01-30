/*
 *  Player Class
 *  By: Caleb, Givens
 */
class Player extends Entity {
    constructor(config) {
        config.sprite = {
            img: "player",
            imgConfig: spriteConfig_Enemy,
        };
        super(config);

        this.type = "player";

        this.moveVec = inputManager.playerMoveVec;
        this.collision = new Collider({
            shape: "rect",
            size: this.size,
            parent: this
        });
    }
    update() {
        this.move();
        this.detectCollision();

        try {
            world.getTile(round(this.pos.x), round(this.pos.y)).revealSelf();
        } catch (e) { }

        if (this.fireCooldown < this.fireCooldownMax) {
            this.fireCooldown += deltaTimeFixed;
        } else {
            if (mouseIsPressed) {
                this.fireBullet();
                this.fireCooldown -= this.fireCooldownMax;
            }
        }
    }
}
