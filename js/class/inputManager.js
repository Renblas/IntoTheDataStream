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
        this.moveUpKey = new Key("w");
        this.moveDownKey = new Key("s");
        this.moveLeftKey = new Key("a");
        this.moveRightKey = new Key("d");

        // player move vector
        this.playerMoveVec = new Vec2(0, 0);

        this.escapeKey = new Key("Escape")
    }
    update() {
        // update Key state for player movement
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

        // escape key stuff
    }
}

function keyPressed() {
    switch (key) {
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
        case inputManager.escapeKey.keyCode:
            if (menuState == "game") {
                gameIsPaused = !gameIsPaused;
            }
            break;

        default:
            break;
    }
}

function keyReleased() {
    switch (key) {
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
