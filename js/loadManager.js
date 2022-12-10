/*
 *  Contains Loading Logic for scripts, images, and (TODO) audio
 *  By: Caleb
 */

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
                DEBUG_ENABLED && console.log(this.src + " is loaded...");
            };
            DEBUG_ENABLED && console.log(fileName + " loading started");
            jsFile.src = filePath;
            document.getElementsByTagName("body")[0].appendChild(jsFile);
        } else if (fileExtension === "png" || fileExtension === "jpg") {
            GlobalImageObject[fileName] = new Image();
            GlobalImageObject[fileName].onload = function () {
                loadedCounter += 1;
                DEBUG_ENABLED && console.log(this.src + " is loaded...");
            };
            DEBUG_ENABLED && console.log(fileName + " loading started");
            GlobalImageObject[fileName].src = filePath;
        }
    }
}

// checks if assets are loaded
function checkIsLoaded() {
	return loadedCounter == GlobalLoadArray.length; 
}
