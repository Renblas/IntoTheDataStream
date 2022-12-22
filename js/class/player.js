/*
 *  Player Class
 *  By: Caleb, Givens
 */
class Player {
    constructor(pos) {
        this.pos = new Vec2(pos.x, pos.y);
        this.size = new Vec2(1, 1);
        this.angle = 0;
        this.moveSpeed = 4;

        this.sprite = new Sprite({
            img: "player",
            imgPos: [0, 0],
        });
        this.sprite.imgSize.set(50, 37)

        this.standaredBullet = {
            speed: 6,
            size: 0.5,
            damage: 10,
        };
        this.fireCooldown = 0;
        this.fireCooldownMax = 0.25;
    }
    draw() {
        cameraObj.drawImg(this.sprite, this.pos, this.size);
    }
    update() {
        this.move();
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
    move() {
        this.pos.x += inputManager.playerMoveVec.x * this.moveSpeed * deltaTimeFixed;
        this.pos.y += inputManager.playerMoveVec.y * this.moveSpeed * deltaTimeFixed;
    }
    fireBullet() {
        var config = JSON.parse(JSON.stringify(this.standaredBullet));
        var coordOfClick = cameraObj.pixelToWorld(new Vec2(mouseX, mouseY));
        config.rotation = -atan2(coordOfClick.y - this.pos.y, coordOfClick.x - this.pos.x);
        config.pos = new Vec2(this.pos.x, this.pos.y);
        GlobalBulletArray.push(new Projectile(config));
    }
}
