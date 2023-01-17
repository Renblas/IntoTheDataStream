/*
 *  Settings Menu
 *  - menu that displays when you click the gear icon in the game
 *  By: Nick, with menu help from menuMAIN.JS and Caleb
 */

var menu_Settings = {
    initialized: false,

    init: function () {
        //Sliders to be finalized
        /*
    slider = creatSlider(175, 150, 150);
    slider.position(10,10);
    slider.style('width', '80px');

    slider = creatSlider(0, 255, 100);
    slider.position(10,10);
    slider.style('width', '80px');
    */

        this.initialized = true;

        this.buttonMain= new Clickable();
        this.buttonMain.resize(50 * canvasSize.x, 50 * canvasSize.y);
        this.buttonMain.locate(100 * canvasSize.x, 100 * canvasSize.y);
        this.buttonMain.color = "#0000FF"; //Background color of the clickable (hex number as a string)
        this.buttonMain.cornerRadius = 10; //Corner radius of the clickable (float)
        this.buttonMain.strokeWeight = 2; //Stroke width of the clickable (float)
        this.buttonMain.stroke = "#000000"; //Border color of the clickable (hex number as a string)
        this.buttonMain.text = "Start"; //Text of the clickable (string)
        this.buttonMain.textColor = "#808080"; //Color of the text (hex number as a string)
        this.buttonMain.textSize = 12 * canvasSize.y; //Size of the text (integer)
        this.buttonMain.onPress = function () {
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
        this.buttonMain.textSize = 12 * canvasSize.y; //Size of the text (integer)
        this.buttonMain.resize(50 * canvasSize.x, 50 * canvasSize.y);
        this.buttonMain.locate(100 * canvasSize.x, 100 * canvasSize.y);
        this.buttonMain.draw();
    },
};
