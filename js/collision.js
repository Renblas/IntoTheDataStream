//Givens 
class Collider {

    constructor(config) {
        this.shape = config.shape;
        this.par = config.parent;
        this.directionLock = {
            up: false,
            down: false,
            left: false,
            right: false
        }
    }
    //this is all for wall collisions
    detectCollison(obj, resolveCollision) {
        var collided = false;
        var collideCounter = 0;
        var collidedWall;

        collidedWall = collideRectRect(
            par.pos.x,
            par.pos.y,
            par.size.x,
            par.size.y,
            obj.pos.x,
            obj.pos.y,
            obj.size.x,
            obj.size.y
        );
        if (resolveCollision) {
            try {

                if (par.pos.x + par.size.x / 2 >= obj.pos.x - obj.size.x / 2) {
                    directionLock.right = true;
                    this.pos.x -=
                        (b - tileSize.x / 2 - (this.pos.x - this.size.x / 2)) *
                        this.moveSpeed *
                        deltaTimeFixed;
                }

                if (par.pos.x - par.size.x / 2 <= obj.pos.x + obj.size.x / 2) {
                    directionLock.left = true;
                    par.pos.x +=
                        (par.pos.x + par.size.x / 2 - (obj.pos.x + obj.size.x / 2)) *
                        par.moveSpeed *
                        deltaTimeFixed;
                }

                if (par.pos.y + par.size.y / 2 >= obj.pos.y - obj.size.y / 2) {
                    directionLock.down = true;
                    this.pos.y +=
                        (this.pos.y - this.size.y / 2 - (i - tileSize.y / 2)) *
                        this.moveSpeed *
                        deltaTimeFixed;
                }

                if (par.pos.y - par.size.y / 2 <= obj.pos.y + obj.size.ys / 2) {
                    directionLock.up = true;
                    this.pos.y -= (i + tileSize.y / 2 - (this.pos.y + this.size.y / 2)) * deltaTimeFixed;
                }
            } catch { }
        }

    }
}