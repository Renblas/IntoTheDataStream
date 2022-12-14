/*
 *  Global Variables
 */

const DEBUG_ENABLED = true; // whether to enable print statements

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
 *  Draw Function
 *  - called x times per second, from p5js library
 */
function draw() {
    background(200);

    if (menuState == "main") {
        menu__Main.draw();
        return;
    }

    if (!checkIsLoaded() || minLoadingScreenTime > 0) {
        background(255, 200, 200);
        textAlign(LEFT, TOP);
        textSize(16);
        text(
            "loaded " + loadedCounter + " / " + GlobalLoadArray.length + " assets",
            10,
            40
        );
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
        deltaTimeFixed = deltaTime / 1000;
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
    world = new World({ map: testMap1 });
    player = new Player(world.map.startingPlayerPos);
    cameraObj = new Camera();
}

/*
 *  Draw Game Function
 *  - draws current game state to screen
 */
function drawGame() {
    cameraObj.update();

    world.draw();
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
}
