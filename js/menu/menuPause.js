/*
 *  Pause Menu
 *  - menu that displays when you pause the game
 *  By: Caleb
 *  Reset Button
 *  - Button that resets the game and brings you back to the main menu
 *  By: Nick
 */

var menu__Pause = {
    initialized: false,

    init: function () {
        this.buttonReset = new Clickable();
        this.buttonReset.resize(50 * canvasSize.x, 50 * canvasSize.y);
        this.buttonReset.locate(width / 2 - this.buttonReset.width / 2, height * 0.25 - this.buttonReset.height / 2);
        this.buttonReset.color = "#DC143C"; //Background color of the clickable (hex number as a string)
        this.buttonReset.cornerRadius = 10; //Corner radius of the clickable (float)
        this.buttonReset.strokeWeight = 2; //Stroke width of the clickable (float)
        this.buttonReset.stroke = "#000000"; //Border color of the clickable (hex number as a string)
        this.buttonReset.text = "Reset"; //Text of the clickable (string)
        this.buttonReset.textColor = "#000000"; //Color of the text (hex number as a string)
        this.buttonReset.textSize = 22 * canvasSize.y; //Size of the text (integer)
        this.buttonReset.onPress = function () {
            menuState = "main";
            inGame = false;
        }

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

        rectMode(CORNER);
        this.buttonReset.textSize = 22 * canvasSize.y; //Size of the text (integer)
        this.buttonReset.resize(100 * canvasSize.x, 50 * canvasSize.y);
        this.buttonReset.locate(
            width / 2 - this.buttonReset.width / 2,
            height * .3 - this.buttonReset.height / 2
        );
        this.buttonReset.draw();
    },
};
