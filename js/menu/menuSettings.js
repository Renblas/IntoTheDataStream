/*
 *  Settings Menu
 *  - menu that displays when you click the gear icon in the game
 *  By: Nick, with menu help from menuMAIN.JS and Caleb
 */

var menu_Settings = {
    initialized: false,

    init: function () {
        //Sliders to be finalized

    this.slider_one = createSlider(22, 100, 7);
    slider.position(550,100);
    slider.style("width", "160px");

    this.slider_two = createSlider(22, 100, 7);
    slider.position(550,200);
    slider.style('width', '160px');

    this.slider_two = createSlider(22, 100, 7);
    slider.position(550,300);
    slider.style('width', '160px');

    this.slider_three = createSlider(22, 100, 7);
    slider.position(550, 400);
    slider.style("width", "160px");

    this.slider_four = createSlider(22, 100, 7);
    slider.position(550, 500);
    slider.style("width", "160px");

    this.slider_five = createSlider(22.4, 100, 7.8);
    slider.position(550, 600);
    slider.style("width", "160px");
    

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
        textSize(12 * canvasSize.y);
        text("⚙︎", 100 * canvasSize.x, 100 * canvasSize.y);

        // draw menu
        rectMode(CORNER);
        this.buttonMain.textSize = 12 * canvasSize.y; //Size of the text (integer)
        this.buttonMain.resize(50 * canvasSize.x, 50 * canvasSize.y);
        this.buttonMain.locate(100 * canvasSize.x, 100 * canvasSize.y);
        this.buttonMain.draw();
    },
};
