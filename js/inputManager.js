/*
 *  Input Manager Class
 *  - handles inputs for the player
 *  By: Caleb
 */

class Key {
    constructor(keyCode) {
        this.keyCode = keyCode;
        this.isPressed = false;

        this.timeHeld = 0;
        this.maxMoveTime = 0.15;

        this.smoothFloat = 0;
    }
    update() {
        if (this.isPressed) {
            var num;
            if (this.timeHeld < this.maxMoveTime) {
                this.timeHeld += deltaTimeFixed;
                num = sqrt(this.timeHeld / this.maxMoveTime);
                if (num > 1) num = 1;
            } else {
                num = 1;
            }
            this.smoothFloat = num;
        } else {
            var num = 0;
            if (this.timeHeld > 0) {
                this.timeHeld -= deltaTimeFixed;
                num = (this.timeHeld / this.maxMoveTime);
                if (!num) num = 0;
            } else {
                this.timeHeld = 0;
            }

            this.smoothFloat = num;
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

        this.escapeKey = new Key("Escape");
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

        if (this.playerMoveVec.mag() > 1) {
            this.playerMoveVec.normalize();
        }
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

function mouseWheel(e) {
    if (!e.delta) return;

    if (!gameIsPaused && menuState == "game") {
        cameraObj.zoomRaw -= (1 / (deltaTime)) * (e.delta / abs(e.delta));

        if (cameraObj.zoomRaw > cameraObj.maxZoom) {
            cameraObj.zoomRaw = cameraObj.maxZoom;
        }
        if (cameraObj.zoomRaw < cameraObj.minZoom) {
            cameraObj.zoomRaw = cameraObj.minZoom;
        }

        cameraObj.zoom = round(cameraObj.zoomRaw, 1);
    }

    return false;
}
