/*
 *  Camera Class
 *  - handles img drawing for all game objects
 *  By: Caleb
 */
class Camera {
    constructor() {
        this.pos = new Vec2(8, 4.5);

        this.maxDistToPlayer = 0.5;

        this.minZoom = 0.5;
        this.maxZoom = 2;
        this.defaultZoom = 1;
        this.zoomRaw = 1;
        this.zoom = this.defaultZoom;
    }
    drawImg(sprite, pos, size) {
        var img = GlobalImageObject[sprite.img];
        if (!img) {
            img = GlobalImageObject["default"];
        }
        ctx.globalAlpha = (sprite.opacity) ? sprite.opacity : 1;
        ctx.drawImage(
            img,
            sprite.imgPos[0] * 32,
            sprite.imgPos[1] * 32,
            sprite.imgSize.x,
            sprite.imgSize.y,
            ((pos.x - (this.pos.x - 8 / this.zoom) - size.x / 2) * 32 + 16 + sprite.imgOffset.x) * this.zoom,
            ((pos.y - (this.pos.y - 4.5 / this.zoom) - size.y / 2) * 32 + 16 + sprite.imgOffset.y) * this.zoom,
            sprite.imgSize.x * size.x * this.zoom,
            sprite.imgSize.y * size.y * this.zoom
        );
        ctx.globalAlpha = 1;
    }
    drawImgRotate(sprite, pos, size, rotation) {
        var img = GlobalImageObject[sprite.img];
        if (!img) {
            img = GlobalImageObject["default"];
        }
        var x = ((pos.x - (this.pos.x - 8 / this.zoom) - size.x / 2) * 32 + 16) * this.zoom;
        var y = ((pos.y - (this.pos.y - 4.5 / this.zoom) - size.y / 2) * 32 + 16) * this.zoom;
        var changeXY = 16 * this.zoom;
        ctx.translate(x + changeXY, y + changeXY);
        ctx.rotate(-radians(rotation) + Math.PI / 2.0);
        ctx.drawImage(
            img,
            sprite.imgPos[0] * sprite.imgSize.x,
            sprite.imgPos[1] * sprite.imgSize.y,
            sprite.imgSize.x,
            sprite.imgSize.y,
            -changeXY,
            -changeXY,
            32 * size.x * this.zoom,
            32 * size.y * this.zoom
        );
        ctx.rotate(radians(rotation) - Math.PI / 2.0);
        ctx.translate(-(x + changeXY), -(y + changeXY));
    }
    drawImgUI(img, pos, size) {
        var img = GlobalImageObject[img];
        ctx.drawImage(img, pos.x, pos.y, size.x * 32, size.y * 32);
    }
    worldToPixel(vec) {
        // TODO: fix with scaling
        var x = ((vec.x - (this.pos.x - 8 / this.zoom)) * 32 + 16) * this.zoom;
        var y = ((vec.y - (this.pos.y - 4.5 / this.zoom)) * 32 + 16) * this.zoom;
        return new Vec2(x, y);
    }
    pixelToWorld(vec) {
        var x = (vec.x / this.zoom - 16) / 32 + (this.pos.x - 8 / this.zoom);
        var y = (vec.y / this.zoom - 16) / 32 + (this.pos.y - 4.5 / this.zoom);
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
