/*
 *  Player Class
 *  By: Caleb
 */
class Player {
    constructor(pos) {
        this.pos = pos;
        this.size = new Vec2(1, 1);
        this.angle = 0;

        this.moveSpeed = 4;

        this.img = "player";
    }
    draw() {
        cameraObj.drawImg(this.img, this.pos, this.size);
    }
    update() {
        if (keyIsDown(65)) {
            this.pos.x -= this.moveSpeed * deltaTimeFixed;
        }
        if (keyIsDown(68)) {
            this.pos.x += this.moveSpeed * deltaTimeFixed;
        }
        if (keyIsDown(83)) {
            this.pos.y += this.moveSpeed * deltaTimeFixed;
        }
        if (keyIsDown(87)) {
            this.pos.y -= this.moveSpeed * deltaTimeFixed;
        }
    }
}
