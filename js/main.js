/*
 *  Global Variables
 */

const settings = {
    DEBUG_ENABLED: true,
    FOG_OF_WAR: true,
};
var canvas; // canvas that we draw on
var ctx; // 2d context that belongs to canvas above
var canvasSize;

const FPS = 30; // draw frames per second
const UPS = 30; // physics updates per second, MULTIPLE OF 30 ONLY!!
var deltaTimeFixed = 0; // USE THIS IN ALL PHYSICS CALCS, given deltaTime from p5js but /1000 and adjusted for more physics frames per sec

var menuState = "main";
var inGame = false;
var gameIsPaused = false;

const minLoadingTime = 0;
var loadingTime = 0;

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
    right: false,
};

var GlobalEntityArray = [];

/*
 *  Setup Function
 *  - called once after page is loaded, from p5js library
 */
function setup() {
    createCanvas(windowWidth, (windowWidth / 16) * 9); // creates p5js canvas in 16:9 ratio

    canvas = document.getElementById("defaultCanvas0"); // gets canvas created above
    canvasSize = new Vec2(width / 512, height / 288);

    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    //canvas.style.cssText = "";

    windowResized();

    frameRate(FPS);
    angleMode(DEGREES);

    inputManager = new InputManager();
}

/*
 *  Window Resize Logic
 */
function windowResized() {
    if ((windowWidth / 16) * 9 <= windowHeight) {
        resizeCanvas(windowWidth, (windowWidth / 16) * 9);
    } else {
        resizeCanvas((windowHeight / 9) * 16, windowHeight);
    }

    canvasSize.set(width / 512, height / 288);
}

/*
 *  Draw Function
 *  - called x times per second, from p5js library
 */
function draw() {
    background("#383638"); // color of top of tile "#383638"
    deltaTimeFixed = deltaTime / 1000;

    if (menuState == "main") {
        menu_Main.draw();
        return;
    }

    if (menuState == "settings") {
        menu_Settings.draw();
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
    //Reset Game Stuff
    gameIsPaused = false;
    GlobalEntityArray = [];

    world = new World({ map: map_test1 });
    player = new Player({
        pos: world.map.startingPlayerPos,
    });
    GlobalEntityArray.push(player);
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

    GlobalEntityArray.forEach((element) => {
        element.draw();
    });

    game_ui.draw();
}

/*
 *  Update Game Function
 *  - update game state, mainly for physics
 */
function updateGame() {
    inputManager.update();

    GlobalEntityArray.forEach((element) => {
        element.update();
    });

    world.update();
}
//test
p5.prototype.collideRectRect = function (x, y, w, h, x2, y2, w2, h2) {
    //2d
    //add in a thing to detect rectMode CENTER
    if (
        x + w / 2 >= x2 - w2 / 2 && // r1 right edge past r2 left
        x - w / 2 <= x2 + w2 / 2 && // r1 left edge past r2 right
        y + h / 2 >= y2 - h2 / 2 && // r1 top edge past r2 bottom
        y - h / 2 <= y2 + h2 / 2
    ) {
        // r1 bottom edge past r2 top
        return true;
    }
    return false;
};
/* Merry Rickmas my friends:
 https://www.reddit.com/r/RickRolled/comments/zq0i74/last_rickmas/
 */
