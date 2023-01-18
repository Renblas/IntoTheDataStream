/*
 *  Pause Menu
 *  - menu that displays when you pause the game
 *  By: Caleb
 */

var menu_Main = {
    initialized: false,

    init: function () {
        this.buttonMain = new Clickable();
        this.buttonMain.resize(100 * canvasSize.x, 50 * canvasSize.y);
        this.buttonMain.locate(width / 2 - this.buttonMain.width / 2, height * 0.7 - this.buttonMain.height / 2);
        this.buttonMain.color = "#32CD32"; //Background color of the clickable (hex number as a string)
        this.buttonMain.cornerRadius = 10; //Corner radius of the clickable (float)
        this.buttonMain.strokeWeight = 2; //Stroke width of the clickable (float)
        this.buttonMain.stroke = "#000000"; //Border color of the clickable (hex number as a string)
        this.buttonMain.text = "Start"; //Text of the clickable (string)
        this.buttonMain.textColor = "#000000"; //Color of the text (hex number as a string)
        this.buttonMain.textSize = 36 * canvasSize.y; //Size of the text (integer)
        this.buttonMain.onPress = function () {
            menuState = "game";
            loadAssets();
        };

        this.buttonSettings = new Clickable();
        this.buttonSettings.resize(50 * canvasSize.x, 50 * canvasSize.y);
        this.buttonSettings.locate(width / 2 - this.buttonMain.width / 2, height * 0.35 - this.buttonMain.height / 2);
        this.buttonSettings.color = "#808080"; //Background color of the clickable (hex number as a string)
        this.buttonSettings.cornerRadius = 10; //Corner radius of the clickable (float)
        this.buttonSettings.strokeWeight = 2; //Stroke width of the clickable (float)
        this.buttonSettings.stroke = "#000000"; //Border color of the clickable (hex number as a string)
        this.buttonSettings.text = "Settings"; //Text of the clickable (string)
        this.buttonSettings.textColor = "#000000"; //Color of the text (hex number as a string)
        this.buttonSettings.textSize = 22 * canvasSize.y; //Size of the text (integer)
        this.buttonSettings.onPress = function () {
            menuState = "settings";
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

        fill(157, 34, 53);
        rectMode(CENTER);
        rect(width / 2, height / 2, 300 * canvasSize.x, 64 * canvasSize.y);

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(48 * canvasSize.y);
        text("Main Menu", width / 2, height / 2);

        rectMode(CORNER);
        this.buttonMain.textSize = 36 * canvasSize.y; //Size of the text (integer)
        this.buttonMain.resize(100 * canvasSize.x, 50 * canvasSize.y);
        this.buttonMain.locate(width / 2 - this.buttonMain.width / 2, height * 0.7 - this.buttonMain.height / 2);
        this.buttonMain.draw();

        rectMode(CORNER);
        this.buttonSettings.textSize = 22 * canvasSize.y; //Size of the text (integer)
        this.buttonSettings.resize(50 * canvasSize.x, 50 * canvasSize.y);
        this.buttonSettings.locate(
            width / 2 - this.buttonSettings.width / 2,
            height * 0.35 - this.buttonSettings.height / 2
        );
        this.buttonSettings.draw();
    },
};
