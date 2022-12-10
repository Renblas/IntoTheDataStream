/*
 *  Camera Class
 *  - handles img drawing for all game objects
 *  By: Caleb
 */
class Camera {
    constructor() {
        this.pos = new Vec2(0, 0);
    }
    drawImg(img, pos, size) {
        var img = GlobalImageObject[img];
        ctx.drawImage(
            img,
            (pos.x - this.pos.x - size.x / 2) * 32 + 16,
            (pos.y - this.pos.y - size.y / 2) * 32 + 16,
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
        var x = (vec.x / 32) + this.pos.x;
        var y = (vec.y / 32) + this.pos.y;
        return new Vec2(x, y);
    }
}
