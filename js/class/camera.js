/*
 *  Camera Class
 *  - handles img drawing for all game objects
 *  By: Caleb
 */
class Camera {
    constructor() {
        this.pos = new Vec2(width / 2, height / 2);

    }
    drawImg(img, pos, size) {
        var img = GlobalImageObject[img];
        ctx.drawImage(img, pos.x, pos.y, size.x, size.y);
    }
}
