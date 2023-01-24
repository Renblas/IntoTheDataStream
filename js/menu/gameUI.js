/*
 *  Pause Menu
 *  - menu that displays when you pause the game
 *  By: Caleb
 */

var game_ui = {
    initialized: false,

    init: function () {
        this.initialized = true;
    },

    draw: function () {
        // init if not run before
        if (!this.initialized) this.init();

        // draw menu

        if (settings.DEBUG_ENABLED) {
            fill(255);

            textSize(12 * canvasSize.y);

            textAlign(RIGHT, TOP);
            text("Player: " + player.pos.toString(), 508 * canvasSize.x, 4 * canvasSize.y);
            text("FPS: " + round(1 / deltaTimeFixed, 1), 508 * canvasSize.x, 20 * canvasSize.y);
            text("x" + round(cameraObj.zoom, 1), 508 * canvasSize.x, 36 * canvasSize.y);

            
            textAlign(LEFT, TOP);
            text("Health: " + player.health + " / " + player.maxHealth, 4 * canvasSize.x, 4 * canvasSize.y);
            text("Shield: " + player.shield, 4 * canvasSize.x, 20 * canvasSize.y);
        }
    },
};
