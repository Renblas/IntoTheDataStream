/*
 *  Pause Menu
 *  - menu that displays when you pause the game
 *  By: Caleb
 */

var menu__Pause = {
    initialized: false,

    init: function () {
        this.initialized = true;
    },

    draw: function () {
        // init if not run before
        if (!this.initialized) this.init();

        // draw menu

        fill(175, 150, 150, 100);
        rectMode(CORNER)
        rect(0, 0, width, height);


        fill(150, 175, 150, 200);
        rectMode(CENTER)
        rect(width / 2, height / 2, 200 * canvasSize.x, 64 * canvasSize.y);

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(48 * canvasSize.y);
        text("Paused", width / 2, height / 2);
    },
};
