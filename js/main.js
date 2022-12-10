/*
 *  Global Variables
 */

const DEBUG_ENABLED = false; // whether to enable print statements

var canvas; // canvas that we draw on
var ctx; // 2d context that belongs to canvas above

const FPS = 30; // draw frames per second
const UPS = 30; // physics updates per second, MULTIPLE OF 30 ONLY!!
var deltaTimeFixed; // USE THIS IN ALL PHYSICS CALCS, given deltaTime from p5js but /1000 and adjusted for more physics frames per sec

var textSize_Const; // USE WHEN SETTING SIZE OF ALL TEXT, standardizes text size accross resolutions
var imgSize_Const; // above but for images

var isLoaded = false; // are all of the game assets loaded
const GlobalLoadArray = [
    // put file paths of all items to be loaded here
    "img/bullet.png",
    "img/enemy.png",
    "img/floor.png",
    "img/player.png",
    "img/wall.png",
];

const GlobalImageObject = {}; // all loaded image objects are stored here onload

/*
 *  Setup Function
 *  - called once after page is loaded, from p5js library
 */
function setup() {
    createCanvas(windowWidth, windowWidth * (9 / 16)); // creates p5js canvas in 16:9 ratio

    canvas = document.getElementById("defaultCanvas0"); // gets canvas created above
    ctx = canvas.getContext("2d");

    textSize_Const = height / 200;
    imgSize_Const = height / 200;

    frameRate(FPS);

    angleMode(DEGREES);
}

/*
 *  Draw Function
 *  - called x times per second, from p5js library
 */
function draw() {
    // do physics update x times
    deltaTimeFixed = deltaTime / 1000 / (UPS / FPS);
    for (let i = 0; i < UPS / FPS; i++) {
        updateGame();
    }

    // draw Game Once
    drawGame();
}

/*
 *  Draw Game Function
 *  - draws current game state to screen
 */
function drawGame() {
    background(200);

    textSize(16 * textSize_Const);
    text("Hello World", 10, 60);
}

/*
 *  Update Game Function
 *  - update game state, mainly for physics
 */
function updateGame() {}
