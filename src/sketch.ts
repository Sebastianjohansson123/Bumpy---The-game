//---- GLOBAL VARIABLES ----//
let game: GameBoard;
let bg: p5.Image;
let jumpSound: p5.SoundFile;
let song: p5.SoundFile;
// let bg2: p5.Image;
// let heightOnBg: number;
// let sound: p5.SoundFile

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  bg = loadImage("./assets/images/bg1.png");
  jumpSound = loadSound("./assets/sounds/jump.wav");
  song = loadSound("./assets/music/bumpy.mp3");
  // sound: jumpSound = loadSound('../assets/jump.wav');
  // bg2 = loadImage('./assets/images/bg2.png');
  // sound: p5.SoundFile = loadSound('../assets/mySound.wav');
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  jumpSound = loadSound("./assets/sounds/jump.wav");
  song.loop();
  createCanvas(550, 720);
  // heightOnBg = 0;
  frameRate(60);

  game = new GameBoard();
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  // heightOnBg++;
  // if (heightOnBg < 200) {
  //   image(bg, 0, 0);
  // } else {
  //  image(bg2, 0, 0);
  // }

  image(bg, 0, 0);
  game.update();
  game.draw();
}

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
