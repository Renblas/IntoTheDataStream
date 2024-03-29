/*
 *  Pause Menu
 *  - menu that displays when you pause the game
 *  By: Caleb
 */

var menu_Main = {
  initialized: false,

  init: function () {
    this.buttonMain = new Clickable();
    this.buttonMain.resize(100 * canvasSize.x, 50 * canvasSize.y);
    this.buttonMain.locate(
      width / 2 - this.buttonMain.width / 2,
      height * 0.7 - this.buttonMain.height / 2
    );
    this.buttonMain.color = "#32CD32"; //Background color of the clickable (hex number as a string)
    this.buttonMain.cornerRadius = 10; //Corner radius of the clickable (float)
    this.buttonMain.strokeWeight = 2; //Stroke width of the clickable (float)
    this.buttonMain.stroke = "#000000"; //Border color of the clickable (hex number as a string)
    this.buttonMain.text = "Start"; //Text of the clickable (string)
    this.buttonMain.textColor = "#000000"; //Color of the text (hex number as a string)
    this.buttonMain.textSize = 36 * canvasSize.y; //Size of the text (integer)
    this.buttonMain.onPress = function () {
      if (checkIsLoaded() && loadingTime >= minLoadingTime) {
        menuState = "game";
      }
    };

    this.buttonSettings = new Clickable();
    this.buttonSettings.resize(150 * canvasSize.x, 50 * canvasSize.y);
    this.buttonSettings.locate(
      width / 2 - this.buttonMain.width / 2,
      height * 0.3 - this.buttonMain.height / 2
    );
    this.buttonSettings.color = "#36454F"; //Background color of the clickable (hex number as a string)
    this.buttonSettings.cornerRadius = 10; //Corner radius of the clickable (float)
    this.buttonSettings.strokeWeight = 2; //Stroke width of the clickable (float)
    this.buttonSettings.stroke = "#000000"; //Border color of the clickable (hex number as a string)
    this.buttonSettings.text = "Settings"; //Text of the clickable (string)
    this.buttonSettings.textColor = "#000000"; //Color of the text (hex number as a string)
    this.buttonSettings.textSize = 22 * canvasSize.y; //Size of the text (integer)
    this.buttonSettings.onPress = function () {
     if (checkIsLoaded()) {
          menu_Main.close();
          menu_Settings.open();
       }
    };

    loadAssets();

    this.initialized = true;
  },

  draw: function () {
    if (!this.initialized) this.init();
    // init if not run before

    // draw menu

    fill(0, 0, 0);
    rectMode(CORNER);
    rect(0, 0, width, height);

    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    textSize(12 * canvasSize.y);
    rectMode(CENTER);
    if (!checkIsLoaded() || loadingTime < minLoadingTime) {
      text(
        "Loading... " + loadedCounter + " / " + GlobalLoadArray.length,
        width / 2,
        260 * canvasSize.y
      );
    } else {
      text("Assets Loaded", width / 2, height * 0.9);
    }
    loadingTime += deltaTimeFixed;

    fill(39, 118, 234);
    rectMode(CENTER);
    rect(width / 2, height / 2, 300 * canvasSize.x, 64 * canvasSize.y);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(48 * canvasSize.y);
    text("Main Menu", width / 2, height / 2);

    rectMode(CORNER);
    this.buttonMain.textSize = 36 * canvasSize.y; //Size of the text (integer)
    this.buttonMain.resize(100 * canvasSize.x, 50 * canvasSize.y);
    this.buttonMain.locate(
      width / 2 - this.buttonMain.width / 2,
      height * 0.7 - this.buttonMain.height / 2
    );
    this.buttonMain.draw();

    rectMode(CORNER);
    this.buttonSettings.textSize = 22 * canvasSize.y; //Size of the text (integer)
    this.buttonSettings.resize(100 * canvasSize.x, 50 * canvasSize.y);
    this.buttonSettings.locate(
      width / 2 - this.buttonSettings.width / 2,
      height * 0.3 - this.buttonSettings.height / 2
    );
    this.buttonSettings.draw();
  },
  open: function () {
    if (!this.initialized) this.init();
    // enable html objects

    menuState = "main";
  },

  close: function () {
    // disable html objects
  },
};
