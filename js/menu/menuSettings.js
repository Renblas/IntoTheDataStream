/*
 *  Settings Menu
 *  - menu that displays when you click the gear icon in the game
 *  By: Nick, with menu help from menuMAIN.JS and Caleb
 */

var menu_Settings = {
    initialized: false,

    init: function () {
        //Sliders to be finalized

    
    this.slider_One = createSlider(22, 100, 7);
    this.slider_One.position(550,100);
    this.slider_One.style("width", "160px");

    this.slider_Two = createSlider(22, 100, 7);
    this.slider_Two.position(550,200);
    this.slider_Two.style('width', '160px');

    this.slider_Three = createSlider(22, 100, 7);
    this.slider_Three.position(550,300);
    this.slider_Three.style('width', '160px');

    this.slider_Four = createSlider(22, 100, 7);
    this.slider_Four.position(550, 400);
    this.slider_Four.style("width", "160px");

    this.slider_Five = createSlider(22, 100, 7);
    this.slider_Five.position(550, 500);
    this.slider_Five.style("width", "160px");

    this.slider_Six = createSlider(22.4, 100, 7.8);
    this.slider_Six.position(550, 600);
    this.slider_Six.style("width", "160px");
    
    
        this.initialized = true;

        this.buttonMain= new Clickable();
        this.buttonMain.resize(50 * canvasSize.x, 50 * canvasSize.y);
        this.buttonMain.locate(100 * canvasSize.x, 100 * canvasSize.y);
        this.buttonMain.color = "#0000FF"; //Background color of the clickable (hex number as a string)
        this.buttonMain.cornerRadius = 10; //Corner radius of the clickable (float)
        this.buttonMain.strokeWeight = 2; //Stroke width of the clickable (float)
        this.buttonMain.stroke = "#000000"; //Border color of the clickable (hex number as a string)
        this.buttonMain.text = "Return"; //Text of the clickable (string)
        this.buttonMain.textColor = "#808080"; //Color of the text (hex number as a string)
        this.buttonMain.textSize = 18 * canvasSize.y; //Size of the text (integer)
        this.buttonMain.onPress = function () {
            menu_Settings.close();
            menu_Main.open();
        };
    },

    draw: function () {
        // init if not run before
        if (!this.initialized) this.init();

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(12 * canvasSize.y);
        text("", 100 * canvasSize.x, 100 * canvasSize.y);

        // draw menu
        rectMode(CORNER);
        this.buttonMain.textSize = 12 * canvasSize.y; //Size of the text (integer)
        this.buttonMain.resize(50 * canvasSize.x, 50 * canvasSize.y);
        this.buttonMain.locate(100 * canvasSize.x, 100 * canvasSize.y);
        this.buttonMain.draw();
    },

    open: function () {
        if (!this.initialized) this.init();
        // enable html objects
        this.slider_One.style("display", "");
        this.slider_Two.style("display", "");
        this.slider_Three.style("display", "");
        this.slider_Four.style("display", "");
        this.slider_Five.style("display", "");
        this.slider_Six.style("display", "");
        menuState = "settings";
        
    },

    close: function () {
        // disable html objects
        this.slider_One.style("display", "none");
        this.slider_Two.style("display", "none");
        this.slider_Three.style("display", "none");
        this.slider_Four.style("display", "none");
        this.slider_Five.style("display", "none");
        this.slider_Six.style("display", "none");
    }
};
