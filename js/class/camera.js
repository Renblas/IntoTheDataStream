/*
 *  Camera Class
 *  - handles img drawing for all game objects
 *  By: Caleb
 */
class Camera {
    constructor() {
        this.pos = new Vec2(8, 4.5);

        this.maxDistToPlayer = 0.5;
    }
    drawImg(img, pos, size) {
        var img = GlobalImageObject[img];
        ctx.drawImage(
            img,
            (pos.x - (this.pos.x - 8) - size.x / 2) * 32 + 16,
            (pos.y - (this.pos.y - 4.5) - size.y / 2) * 32 + 16,
            32 * size.x,
            32 * size.y
        );
    }
    drawImgUI(img, pos, size) {
        var img = GlobalImageObject[img];
        ctx.drawImage(img, pos.x, pos.y, size.x * 32, size.y * 32);
    }
    worldToPixel(vec) {
        var x = (vec.x - this.pos.x) * 32;
        var y = (vec.y - this.pos.y) * 32;
        return new Vec2(x, y);
    }
    pixelToWorld(vec) {
        var x = vec.x / 32 + this.pos.x;
        var y = vec.y / 32 + this.pos.y;
        return new Vec2(x, y);
    }
    update() {
        // if player is right of camera
        if (player.pos.x - this.pos.x >= this.maxDistToPlayer) {
            this.pos.x = player.pos.x - this.maxDistToPlayer;
        }
        // if player is left of camera
        if (player.pos.x - this.pos.x <= -this.maxDistToPlayer) {
            this.pos.x = player.pos.x + this.maxDistToPlayer;
        }
        // if player is down of camera
        if (player.pos.y - this.pos.y >= this.maxDistToPlayer) {
            this.pos.y = player.pos.y - this.maxDistToPlayer;
        }
        // if player is up of camera
        if (player.pos.y - this.pos.y <= -this.maxDistToPlayer) {
            this.pos.y = player.pos.y + this.maxDistToPlayer;
        }
    }
}
