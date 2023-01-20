//---- GLOBAL VARIABLES ----//
let game: Game;
let bg: p5.Image;
let soundOn: p5.Image;
let soundOff: p5.Image;
let jumpSound: p5.SoundFile;
let song: p5.SoundFile;
let font: p5.Font;
let bumpy: p5.Image;
// let bg2: p5.Image;
// let heightOnBg: number;
// let sound: p5.SoundFile


interface Images {
  balloon: p5.Image;
  backgrounds: p5.Image[];
  // bumpy: p5.Image;
  rocket: p5.Image;
  soundOn: p5.Image;
  soundOff: p5.Image;
}

interface Sounds {
  music: p5.SoundFile;
}

let images: Images;
let sounds: Sounds;

const Fonts = {
  TitanOne: "Titan One",
  CevicheOne: "Ceviche One",
  Gaegu: "Gaegu",
} as const;

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  bg = loadImage("./assets/images/bg1.png");
  jumpSound = loadSound("./assets/sounds/jump.wav");
  bumpy = loadImage("./assets/images/bumpy.png");
  
  images = {
    backgrounds: [loadImage("./assets/images/bg1.png"), loadImage("./assets/images/bg2.png")],
    balloon: loadImage("./assets/images/bg1.png"),
    rocket: loadImage("./assets/images/bg1.png"),
    soundOn: loadImage("./assets/images/sound-on.png"),
    soundOff: loadImage("./assets/images/sound-off.png")
  }

  // sounds = {
  //   music: loadSound('')
  // }

  //  fonts = {
  //   titleAndButtonsFont: loadFont("./assets/fonts/TitanOne-Regular.ttf"),
  //   monsterFont: loadFont("./assets/fonts/CevicheOne-Regular.ttf"),
  //   instructionsFont: loadFont("./assets/fonts/Gaegu-Regular.ttf")
  //  }

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
  song.setVolume(0.05)
  // song.loop();
  createCanvas(550, windowHeight);
  // heightOnBg = 0;
  frameRate(60);

  game = new Game();
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  //  heightOnBg++;
  //  if (heightOnBg < 200) {
  //    image(bg, 0, 0);
  //  } else {
  //   image(bg2, 0, 0);
  //  }

  // push()
  // textFont(fonts.monsterFont);
  // text("hello world", 0, 0);
  // pop()

  game.update();
  game.draw();
  
}

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
