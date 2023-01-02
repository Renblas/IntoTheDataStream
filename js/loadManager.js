/*
 *  Contains Loading Logic for scripts, images, and (TODO) audio
 *  By: Caleb
 */

const GlobalLoadArray = [
    // put file paths of all items to be loaded here
    "lib/p5.collide2d.js",

    "js/class/camera.js",
    "js/class/sprite.js",
    "js/class/gameobject.js",
    "js/class/player.js",
    "js/class/world.js",
    "js/class/tile.js",
    "js/class/projectile.js",

    "js/menu/menuPause.js",
    "js/menu/gameUI.js",

    "img/default.png",
    "img/bullet.png",
    "img/enemy.png",
    "img/player.png",
    "img/tiles/wall.png",
    "img/tiles/floor.png",
    "img/tiles/koransGrave.png",
    "img/tiles/door.png",

    "js/maps/map_testMap1.js",
    "js/maps/map_miniTest.js"
];

var loadedCounter = 0; // number of loaded items, if game fully loaded should be equal to GlobalLoadArray.length

// call once, starts loading process for listed assets
function loadAssets() {
    for (var i = 0; i < GlobalLoadArray.length; i++) {
        var filePath = GlobalLoadArray[i]; // full file path

        var tempArray = split(filePath, "/"); // separate string by backslash
        tempArray = split(tempArray[tempArray.length - 1], "."); // separates into name and extension

        var fileExtension = tempArray[tempArray.length - 1]; // just file extension "jpg", "png", "js" etc
        var fileName = tempArray[0]; // just name of file

        if (fileExtension === "js") {
            var jsFile = document.createElement("script");
            jsFile.onload = function () {
                loadedCounter += 1;
            };
            jsFile.src = filePath;
            document.getElementsByTagName("body")[0].appendChild(jsFile);
        } else if (fileExtension === "png" || fileExtension === "jpg") {
            GlobalImageObject[fileName] = new Image();
            GlobalImageObject[fileName].onload = function () {
                loadedCounter += 1;
            };
            GlobalImageObject[fileName].src = filePath;
        }
    }
}

// checks if assets are loaded
function checkIsLoaded() {
    return loadedCounter == GlobalLoadArray.length;
}
