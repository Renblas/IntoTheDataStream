class Entity {
    constructor(config) {
        this.pos = config.pos;
        this.size = new Vec2(0.5, 0.5);
        this.angle = 0;
        this.moveSpeed = 3;

        this.type = "entity";

        this.sprite = new Sprite({
            img: "player",
            imgPos: [0, 0],
        });
        this.sprite.imgSize.set(32, 32);

        this.standardBullet = {
            speed: 6,
            size: 0.5,
            damage: 10,
        };
        this.fireCooldown = 0;
        this.fireCooldownMax = 0.25;

        this.health = 100;
        this.maxHealth = 100;

        this.collisionArrayWorld = [];

        this.moveVec = new Vec2(0, 0);
    }
    draw() {
        cameraObj.drawImg(this.sprite, this.pos, this.size);
    }
    update() {
        this.move();
        this.detectCollision();

        try {
            world.getTile(round(this.pos.x), round(this.pos.y)).revealSelf();
        } catch (e) {}

        if (this.fireCooldown < this.fireCooldownMax) {
            this.fireCooldown += deltaTimeFixed;
        } else {
            if (false) {
                this.fireBullet();
                this.fireCooldown -= this.fireCooldownMax;
            }
        }
    }
    move() {
        this.pos.x += this.moveVec.x * this.moveSpeed * deltaTimeFixed;
        this.pos.y += this.moveVec.y * this.moveSpeed * deltaTimeFixed;
    }
    fireBullet() {
        var config = JSON.parse(JSON.stringify(this.standardBullet));
        var coordOfClick = cameraObj.pixelToWorld(new Vec2(mouseX, mouseY));
        config.rotation = -atan2(coordOfClick.y - this.pos.y, coordOfClick.x - this.pos.x);
        config.pos = new Vec2(this.pos.x, this.pos.y);
        GlobalEntityArray.push(new Projectile(config));
    }
    detectCollision() {
        //this is all for wall collisions
        var intPos = new Vec2(Math.floor(this.pos.x), Math.floor(this.pos.y));
        var hit = false;
        var hitCounter = 0;
        var collidedWall;

        for (var i = intPos.y - 2; i < intPos.y + 3; i++) {
            for (var b = intPos.x - 2; b < intPos.x + 3; b++) {
                try {
                    if (world.getTile(b, i).type == "wall") {
                        var tileSize = world.getTile(b, i).size;
                        collidedWall = collideRectRect(
                            this.pos.x - this.size.x / 2,
                            this.pos.y - this.size.y / 2,
                            this.size.x,
                            this.size.y,
                            b - tileSize.x / 2,
                            i - tileSize.y / 2,
                            tileSize.x,
                            tileSize.y
                        );

                        if (collidedWall) {
                            if (this.pos.x - this.size.x / 2 < b - tileSize.x / 2) {
                                directionLock.right = true;
                                this.pos.x -=
                                    (b - tileSize.x / 2 - (this.pos.x - this.size.x / 2)) *
                                    this.moveSpeed *
                                    deltaTimeFixed;
                            }

                            if (this.pos.x + this.size.x / 2 > b + tileSize.x / 2) {
                                directionLock.left = true;
                                this.pos.x +=
                                    (this.pos.x + this.size.x / 2 - (b + tileSize.x / 2)) *
                                    this.moveSpeed *
                                    deltaTimeFixed;
                            }

                            if (this.pos.y - this.size.y / 2 < i - tileSize.y / 2) {
                                directionLock.down = true;
                                this.pos.y +=
                                    (this.pos.y - this.size.y / 2 - (i - tileSize.y / 2)) *
                                    this.moveSpeed *
                                    deltaTimeFixed;
                            }

                            if (this.pos.y + this.size.y / 2 > i + tileSize.y / 2) {
                                directionLock.up = true;
                                this.pos.y -= (i + tileSize.y / 2 - (this.pos.y + this.size.y / 2)) * deltaTimeFixed;
                            }
                        }
                    } else {
                        collidedWall = false;
                    }
                    if (collidedWall) {
                        hitCounter += 1;
                    }
                    if (hitCounter > 0) {
                        this.sprite.img = "enemy";
                    } else {
                        this.sprite.img = "player";
                    }
                } catch (e) {}
            }
        }
    }
}
