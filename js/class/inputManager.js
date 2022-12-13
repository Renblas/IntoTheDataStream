/*
 *  Input Manager Class
 *  - handles inputs for the player
 *  By: Caleb
 */

class Key {
    constructor(keyCode) {
        this.keyCode = keyCode;
        this.isPressed = false;
        this.smoothFloat = 0;
    }
    update() {
        if (this.isPressed) {
            this.smoothFloat = 1;
        } else {
            this.smoothFloat = 0;
        }
    }
    pressed() {
        this.isPressed = true;
    }
    released() {
        this.isPressed = false;
    }
}

class InputManager {
    constructor() {
        // WASD Keys
        this.moveUpKey = new Key(87);
        this.moveDownKey = new Key(83);
        this.moveLeftKey = new Key(65);
        this.moveRightKey = new Key(68);

        //
        this.playerMoveVec = new Vec2(0, 0);
    }
    update() {
        this.moveUpKey.update();
        this.moveDownKey.update();
        this.moveLeftKey.update();
        this.moveRightKey.update();

        this.playerMoveVec.set(0, 0);

        this.playerMoveVec.x -= this.moveLeftKey.smoothFloat;
        this.playerMoveVec.x += this.moveRightKey.smoothFloat;
        this.playerMoveVec.y -= this.moveUpKey.smoothFloat;
        this.playerMoveVec.y += this.moveDownKey.smoothFloat;

        this.playerMoveVec.normalize();
    }
}

function keyPressed() {
    switch (keyCode) {
        case inputManager.moveDownKey.keyCode:
            inputManager.moveDownKey.pressed();
            break;
        case inputManager.moveUpKey.keyCode:
            inputManager.moveUpKey.pressed();
            break;
        case inputManager.moveLeftKey.keyCode:
            inputManager.moveLeftKey.pressed();
            break;
        case inputManager.moveRightKey.keyCode:
            inputManager.moveRightKey.pressed();
            break;

        default:
            break;
    }
}

function keyReleased() {
    switch (keyCode) {
        case inputManager.moveDownKey.keyCode:
            inputManager.moveDownKey.released();
            break;
        case inputManager.moveUpKey.keyCode:
            inputManager.moveUpKey.released();
            break;
        case inputManager.moveLeftKey.keyCode:
            inputManager.moveLeftKey.released();
            break;
        case inputManager.moveRightKey.keyCode:
            inputManager.moveRightKey.released();
            break;

        default:
            break;
    }
}
