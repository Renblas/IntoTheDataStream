/*
 *  Contains Miscellaneous functions and classes
 */

// string replace at index
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
};

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
    normalize() {
        var magnitude = this.mag();
        if (!magnitude) {
            return;
        }
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return "(" + round(this.x, 1) + ", " + round(this.y, 1) + ")";
    }
    setComponents(mag, angle) {
        this.x = cos(angle) * mag;
        this.y = sin(-angle) * mag;
    }
    setAngle(angle) {
        this.setComponents(this.mag(), angle);
    }
}
