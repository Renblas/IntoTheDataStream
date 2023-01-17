/*
 *  Settings Menu
 *  - menu that displays when you click the gear icon in the game
 *  By: Nick, with menu help from menuMAIN.JS and Caleb
 */

var menu__Settings = {
    initialized: false,

    init: function () {
        this.initialized = true;

        this.buttonMain = new Clickable();
        this.buttonSettings.resize(50, 50);
        this.buttonSettings.locate(100, 100);
        this.buttonSettings.color = "#0000FF"; //Background color of the clickable (hex number as a string)
        this.buttonSettings.cornerRadius = 10; //Corner radius of the clickable (float)
        this.buttonSettings.strokeWeight = 2; //Stroke width of the clickable (float)
        this.buttonSettings.stroke = "#000000"; //Border color of the clickable (hex number as a string)
        this.buttonSettings.text = "Start"; //Text of the clickable (string)
        this.buttonSettings.textColor = "#808080"; //Color of the text (hex number as a string)
        this.buttonSettings.textSize = 12; //Size of the text (integer)
        this.buttonSettings.onPress = function () {
            menuState = "main";
        };
    },

    draw: function () {
        // init if not run before
        if (!this.initialized) this.init();

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(12);
        text("⚙︎", 100, 100);

        // draw menu
        rectMode(CORNER);
        this.buttonSettings.draw();
    },
};
