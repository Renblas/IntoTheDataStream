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
            textSize(12);
            text("Player: " + player.pos.toString(), 4, 4);
            text("FPS: " + round(1/deltaTimeFixed, 0), 4, 20);

            textAlign(RIGHT)
            text("x" + round(cameraObj.zoom, 1), 508, 4)
        }
    },
};
