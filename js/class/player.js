/*
 *  Player Class
 *  By: Caleb, Givens
 */
class Player {
    constructor(pos) {
        this.pos = new Vec2(pos.x, pos.y);
        this.size = new Vec2(0.75, 0.75);
        this.angle = 0;

        this.moveSpeed = 4;

        this.img = "player";
    }
    draw() {
        cameraObj.drawImg(this.img, this.pos, this.size);
    }
    update() {
        this.move();
    }
    move() {
        this.pos.x += inputManager.playerMoveVec.x * this.moveSpeed * deltaTimeFixed;
        this.pos.y += inputManager.playerMoveVec.y * this.moveSpeed * deltaTimeFixed;
    }
}
