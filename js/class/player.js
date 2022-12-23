/*
 *  Player Class
 *  By: Caleb, Givens
 */
var hit;
class Player {
    constructor(pos) {
        this.pos = new Vec2(pos.x, pos.y);
        this.size = new Vec2(0.5, 0.5);
        this.angle = 0;
        this.moveSpeed = 3;

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

        this.collisionArrayWorld = [];
    }
    draw() {
        cameraObj.drawImg(this.sprite, this.pos, this.size);
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
    detectColision() {
        var intPos = new Vec2(Math.floor(this.pos.x), Math.floor(this.pos.y));
        var hit = false;
        var hitCounter = 0;
        for (var i = intPos.y - 2; i < intPos.y + 3; i++) {
            for (var b = intPos.x - 2; b < intPos.x + 3; b++) {
                try {
                    if (world.getTile(b, i).type == "wall") {
                        hit = collideRectRect(this.pos.x + 0.25, this.pos.y + 0.25, 0.5, 0.5, b, i - 0.5, 1, 1.5);
                    } else { hit = false }
                    if (hit) { hitCounter += 1; }
                    if (hitCounter > 0) { console.log(hitCounter); this.sprite.img = "enemy"; } else { this.sprite.img = "player"; }
                    console.log(world.getTile(b, i));
                } catch (e) { }
            }
        }
    }
}
