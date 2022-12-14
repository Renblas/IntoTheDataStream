/*
 *  Global Variables
 */

//Yo wassup
var settings = {
    DEBUG_ENABLED: true,
    FOG_OF_WAR: true,
};
var canvas; // canvas that we draw on
var ctx; // 2d context that belongs to canvas above

const FPS = 30; // draw frames per second
const UPS = 30; // physics updates per second, MULTIPLE OF 30 ONLY!!
var deltaTimeFixed = 0; // USE THIS IN ALL PHYSICS CALCS, given deltaTime from p5js but /1000 and adjusted for more physics frames per sec

var menuState = "main";
var inGame = false;
var gameIsPaused = false;

var minLoadingScreenTime = 0.25;

const GlobalImageObject = {}; // all loaded image objects are stored here onload

var cameraObj;
var inputManager;
var world;
var player;
var testGameObject;
var mapSize;
var directionLock = {
    up: false,
    down: false,
    left: false,
    right: false
};
const GlobalBulletArray = [];

/*
 *  Setup Function
 *  - called once after page is loaded, from p5js library
 */
function setup() {
    createCanvas(512, 288); // creates p5js canvas in 16:9 ratio

    canvas = document.getElementById("defaultCanvas0"); // gets canvas created above
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    //canvas.style.cssText = "";

    frameRate(FPS);
    angleMode(DEGREES);

    inputManager = new InputManager();
}

/*
 *  Window Resize Logic
 */

/*
 *  Draw Function
 *  - called x times per second, from p5js library
 */
function draw() {
    background("#383638"); // color of top of tile "#383638"
    deltaTimeFixed = deltaTime / 1000;

    if (menuState == "main") {
        menu__Main.draw();
        return;
    }


    if (menuState == "settings") {
        menu_Settings.draw();
        return;
    }


    if (!checkIsLoaded() || minLoadingScreenTime > 0) {
        background(255, 200, 200);
        textAlign(LEFT, TOP);
        textSize(16);
        text("loaded " + loadedCounter + " / " + GlobalLoadArray.length + " assets", 10, 40);
        // TODO Loading Screen

        minLoadingScreenTime -= deltaTime / 1000;
        return;
    }

    if (menuState == "game") {
        // init new game if not already in one
        if (!inGame) {
            initNewGame("testMap1");
            inGame = true;
        }

        if (deltaTime >= 250) {
            // if large lag, (from going to other screen), pause game
            gameIsPaused = true;
            return;
        }

        // if game is not paused
        if (gameIsPaused) {
            // if is paused
            drawGame();
            menu__Pause.draw();
            return;
        }

        // Do physics update
        updateGame();

        // draw Game
        drawGame();

        return;
    }
}

/*
 *  Initialize New Game
 *  - start new game
 */
function initNewGame(map) {
    world = new World({ map: map_test1 });
    player = new Player(world.map.startingPlayerPos);
    cameraObj = new Camera();

    world.init();
}

/*
 *  Draw Game Function
 *  - draws current game state to screen
 */
function drawGame() {
    cameraObj.update();

    world.draw();
    player.mapSize = new Vec2(world.sizeX, world.sizeY);

    GlobalBulletArray.forEach((element) => {
        //element.draw();
    });

    player.draw();

    game_ui.draw();
}

/*
 *  Update Game Function
 *  - update game state, mainly for physics
 */
function updateGame() {
    inputManager.update();
    player.update();

    GlobalBulletArray.forEach((element) => {
        element.update();
    });

    world.update();
}
//test
p5.prototype.collideRectRect = function (x, y, w, h, x2, y2, w2, h2) {
    //2d
    //add in a thing to detect rectMode CENTER
    if (x + w >= x2 &&    // r1 right edge past r2 left
        x <= x2 + w2 &&    // r1 left edge past r2 right
        y + h >= y2 &&    // r1 top edge past r2 bottom
        y <= y2 + h2) {    // r1 bottom edge past r2 top
        return true;
    }
    return false;
};
/* Merry Rickmas my friends:
 https://www.reddit.com/r/RickRolled/comments/zq0i74/last_rickmas/
 */
