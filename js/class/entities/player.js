/*
 *  Player Class
 *  By: Caleb, Givens
 */
class Player extends Entity {
    constructor(pos) {
        super(pos);

        this.sprite.img = "player";

        this.moveVec = inputManager.playerMoveVec;
    }
    update() {
        this.move();
        this.detectColision();

        try {
            world.getTile(round(this.pos.x), round(this.pos.y)).revealSelf();
        } catch (e) {}

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
