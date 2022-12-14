/*
 *  Pause Menu
 *  - menu that displays when you pause the game
 *  By: Caleb
 */

var menu__Main = {
    initialized: false,

    init: function () {
        this.buttonMain = new Clickable();
        this.buttonMain.resize(100, 50);
        this.buttonMain.locate(
            width / 2 - this.buttonMain.width / 2,
            height * 0.7 - this.buttonMain.height / 2
        );
        this.buttonMain.color = "#FFFFFF"; //Background color of the clickable (hex number as a string)
        this.buttonMain.cornerRadius = 10; //Corner radius of the clickable (float)
        this.buttonMain.strokeWeight = 2; //Stroke width of the clickable (float)
        this.buttonMain.stroke = "#000000"; //Border color of the clickable (hex number as a string)
        this.buttonMain.text = "Start"; //Text of the clickable (string)
        this.buttonMain.textColor = "#000000"; //Color of the text (hex number as a string)
        this.buttonMain.textSize = 36; //Size of the text (integer)
        this.buttonMain.onPress = function () {
            menuState = "game";
            loadAssets();
        };

        this.initialized = true;
    },

    draw: function () {
        // init if not run before
        if (!this.initialized) this.init();

        // draw menu

        fill(175, 150, 150);
        rectMode(CORNER);
        rect(0, 0, width, height);

        fill(150, 175, 150);
        rectMode(CENTER);
        rect(width / 2, height / 2, 300, 64);

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(48);
        text("Main Menu", width / 2, height / 2);

        rectMode(CORNER);
        this.buttonMain.draw();
    },
};
