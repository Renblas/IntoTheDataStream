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
        this.rememberWallCollision = {
            up: false,
            down: false,
            left: false,
            right: false,
        }
    }
    update() {
        this.move();
        checkCollisions();
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

    checkCollisions() {
        //wall
        var intPos = new Vec2(Math.floor(this.pos.x), Math.floor(this.pos.y));
        for (var i = intPos.y - 2; i < intPos.y + 3; i++) {
            for (var b = intPos.x - 2; b < intPos.x + 3; b++) {
                try {
                    if (world.getTile(b, i).type == "wall") {
                        this.collision.detectCollision(world.getTile(b, i), true);
                    }
                } catch (e) { }
            }
        }

    }
}
