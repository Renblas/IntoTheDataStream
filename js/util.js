/*
 *  Contains Miscellaneous functions and classes
 */

/*
 *  Vector 2 Class
 *  - takes in x and y, has some useful methods like magnitude and direction
 *  By: Caleb
 */

class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    mag() {
        // return magnitude of vector (x^2 + y^2 = c^2)
        return sqrt(this.x * this.x + this.y * this.y);
    }
    dir() {
        // return direction of vector in degrees
        return atan2(this.y, this.x);
    }
}
