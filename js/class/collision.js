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
                    this.directionLock.right = true;
                    if (par.pos.x + par.size.x / 2 + 0.001 >= obj.pos.x - obj.size.x / 2) {
                        par.pos.x -=
                            (obj.pos.x - obj.size.x / 2 - (par.pos.x - par.size.x / 2)) *
                            par.moveSpeed *
                            deltaTimeFixed + 0.001;
                    }
                }

                if (par.pos.x - par.size.x / 2 <= obj.pos.x + obj.size.x / 2) {
                    this.directionLock.left = true;
                    if (par.pos.x - par.size.x / 2 - 0.001 <= obj.pos.x + obj.size.x / 2) {
                        par.pos.x +=
                            (par.pos.x + par.size.x / 2 - (obj.pos.x + obj.size.x / 2)) *
                            par.moveSpeed *
                            deltaTimeFixed - 0.001;
                    }
                }

                if (par.pos.y + par.size.y / 2 >= obj.pos.y - obj.size.y / 2) {
                    this.directionLock.down = true;
                    if (par.pos.y + par.size.y / 2 - 0.001 >= obj.pos.y - obj.size.y / 2) {
                        par.pos.y +=
                            (par.pos.y - par.size.y / 2 - (obj.pos.y - obj.size.y / 2)) *
                            par.moveSpeed *
                            deltaTimeFixed - 0.001;
                    }
                }

                if (par.pos.y - par.size.y / 2 <= obj.pos.y + obj.size.y / 2) {
                    this.directionLock.up = true;
                    if (par.pos.y - par.size.y / 2 + 0.001 <= obj.pos.y + obj.size.y / 2) {
                        par.pos.y -=
                            (obj.pos.y + obj.size.y / 2 - (par.pos.y + par.size.y / 2)) *
                            par.moveSpeed *
                            deltaTimeFixed + 0.001;
                    }
                }
            } catch { }
        }

    }
}