/*
 *  Player Class
 *  By: Caleb, Givens
 */
var collidedWall;
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
        this.move(false);
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
    move(reversed) {
        if (!reversed) {
            this.pos.x += inputManager.playerMoveVec.x * this.moveSpeed * deltaTimeFixed;
            this.pos.y += inputManager.playerMoveVec.y * this.moveSpeed * deltaTimeFixed;
        } else {
            this.pos.x += inputManager.playerMoveVec.x * this.moveSpeed * deltaTimeFixed * -1;
            this.pos.y += inputManager.playerMoveVec.y * this.moveSpeed * deltaTimeFixed * -1;
        }
    }
    fireBullet() {
        var config = JSON.parse(JSON.stringify(this.standaredBullet));
        var coordOfClick = cameraObj.pixelToWorld(new Vec2(mouseX, mouseY));
        config.rotation = -atan2(coordOfClick.y - this.pos.y, coordOfClick.x - this.pos.x);
        config.pos = new Vec2(this.pos.x, this.pos.y);
        GlobalBulletArray.push(new Projectile(config));
    }
    detectColision() {
        //this is all for wall collisions
        var intPos = new Vec2(Math.floor(this.pos.x), Math.floor(this.pos.y));
        var hit = false;
        var hitCounter = 0;
        directionLock.up = false;
        directionLock.down = false;
        directionLock.left = false;
        directionLock.right = false;
        for (var i = intPos.y - 2; i < intPos.y + 3; i++) {
            for (var b = intPos.x - 2; b < intPos.x + 3; b++) {
                try {
                    if (world.getTile(b, i).type == "wall") {
                        var tileSize = world.getTile(b, i).size;
                        collidedWall = collideRectRect(this.pos.x - (this.size.x / 2), this.pos.y - (this.size.y / 2), this.size.x, this.size.y, b - (tileSize.x / 2), i - (tileSize.y / 2), tileSize.x, tileSize.y);

                        if (collidedWall) {
                            if (this.pos.x - (this.size.x / 2) < b - (tileSize.x / 2)) {
                                this.pos.x += inputManager.playerMoveVec.x * this.moveSpeed * deltaTimeFixed * -1;
                            }

                            if (this.pos.x + (this.size.x) > b + (tileSize.x)) {
                                this.pos.x += inputManager.playerMoveVec.x * this.moveSpeed * deltaTimeFixed * -1;
                            }

                            if (this.pos.y - (this.size.y / 2) < b - (tileSize.y / 2)) {
                                this.pos.y += inputManager.playerMoveVec.y * this.moveSpeed * deltaTimeFixed * -1;
                            }

                            if (this.pos.y + (this.size.y) > b + (tileSize.y)) {
                                this.pos.y += inputManager.playerMoveVec.y * this.moveSpeed * deltaTimeFixed * -1;
                            }
                        }

                    } else { collidedWall = false; }
                    if (collidedWall) { hitCounter += 1; }
                    if (hitCounter > 0) { this.sprite.img = "enemy"; } else { this.sprite.img = "player"; }
                } catch (e) { }
            }
        }
    }
}
