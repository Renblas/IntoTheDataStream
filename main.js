/*
 *  Global Variables
 */

const DEBUG_ENABLED = false; // whether to enable print statements

var loadedCounter = 0; // number of loaded items, if game fully loaded should be equal to GlobalLoadArray.length
var isLoaded = false; // are all of the game assets loaded

const GlobalLoadArray = [
  // put file paths of all items to be loaded here
  "img/bullet.png",
  "img/enemy.png",
  "img/floor.png",
  "img/player.png",
  "img/wall.png",
];

const GlobalImageObject = {}; // all loaded image objects are stored here

/*
 *  Setup Function
 *  - called once after page is loaded, from p5js library
 */
function setup() {}

/*
 *  Draw Function
 *  - called x times per second, from p5js library
 */
function draw() {}

/*
 *  Draw Game Function
 *  - draws current game state to screen
 */
function drawGame() {}

/*
 *  Update Game Function
 *  - update game state, mainly for physics
 */
function updateGame() {}
