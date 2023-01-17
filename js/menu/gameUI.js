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
            fill(255)
            textAlign(LEFT, TOP);
            textSize(12 * canvasSize.y);
            text("Player: " + player.pos.toString(), 4 * canvasSize.x, 4 * canvasSize.y);
            text("FPS: " + round(1 / deltaTimeFixed, 0), 4 * canvasSize.x, 20 * canvasSize.y);

            textAlign(RIGHT)
            text("x" + round(cameraObj.zoom, 1), 508 * canvasSize.x, 4 * canvasSize.y);
        }
    },
};
