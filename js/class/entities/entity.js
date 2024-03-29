class Entity {
    constructor(config) {
        this.pos = new Vec2(config.pos.x, config.pos.y);
        this.size = new Vec2(0.5, 0.5);
        this.angle = 0;
        this.moveSpeed = 3;
        this.direction = "down";

        this.type = "entity";

        this.sprite = new Sprite(config.sprite);
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
        if (this.moveVec.mag() >= 0.5) {
            var angle = this.moveVec.dir();

            if (angle <= 45 && angle > -45) this.direction = "right";
            if (angle <= 135 && angle > 45) this.direction = "up";
            if (angle <= -135 || angle > 135) this.direction = "left";
            if (angle <= -45 && angle > -135) this.direction = "down";
        }

        this.sprite.update(this.direction);
        cameraObj.drawImg(this.sprite, this.pos, this.size);
    }
    update() {
        this.move();

        try {
            world.getTile(round(this.pos.x), round(this.pos.y)).revealSelf();
        } catch (e) { }

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
}
