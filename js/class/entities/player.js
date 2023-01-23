/*
 *  Player Class
 *  By: Caleb, Givens
 */
class Player extends Entity{
    constructor(pos) {
        super(pos);

        this.sprite.img = "player";
        this.sprite.imgSize.set(32, 32)

        this.standardBullet = {
            speed: 6,
            size: 0.5,
            damage: 10,
        };
        this.fireCooldown = 0;
        this.fireCooldownMax = 0.25;

        this.health = 100;
        this.maxHealth = 100;

        this.moveVec = inputManager.playerMoveVec;
    }
    update() {
        this.move();
        this.detectColision();

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
