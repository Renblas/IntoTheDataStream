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

        if (DEBUG_ENABLED) {
            textAlign(LEFT, TOP);
            textSize(12);
            text("Player: " + player.pos.toString(), 4, 4);
            text("deltaTime: " + round(1/deltaTimeFixed, 0) + " ms", 4, 20);

            textAlign(RIGHT)
            text("x" + round(cameraObj.zoom, 1), 508, 4)
        }
    },
};
