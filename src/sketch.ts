//---- GLOBAL VARIABLES ----//
let game: Game;
let images: Images;
let sounds: Sounds;
let sound: p5.SoundFile;

interface Images {
  bumpy: p5.Image;
  bg: p5.Image;
  platform: p5.Image;
  xBtn: p5.Image;
  howToPlayKeys: p5.Image;
  bumpySad: p5.Image;
  star: p5.Image;
  balloon: p5.Image;
  backgrounds: p5.Image[];
  talkingBubble: p5.Image;
  rocket: p5.Image;
  enemy: p5.Image;
  enemyBoss: p5.Image;
  soundOn: p5.Image;
  soundOff: p5.Image;
  upArrow: p5.Image;
  bubbleglow: p5.Image;
  bumpyBalloons_gif: p5.Image;
  bumpyBlink_gif: p5.Image;
  bumpyBlinkCry_gif: p5.Image;
  bumpyFall_gif: p5.Image;
  bumpyRocket_gif: p5.Image;
  bumpyStar_gif: p5.Image;
}

interface Sounds {
  bulletSound: p5.SoundFile;
  song: p5.SoundFile;
  jumpSound: p5.SoundFile;
  enemyDeath: p5.SoundFile;
}

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
  images = {
    backgrounds: [
      loadImage("./assets/images/bg1.png"),
      loadImage("./assets/images/bg2.png"),
    ],
    bg: loadImage("./assets/images/bg1.png"),
    balloon: loadImage("./assets/images/balloon.png"),
    rocket: loadImage("./assets/images/rocket.png"),
    star: loadImage("./assets/images/star.png"),
    soundOn: loadImage("./assets/images/soundon.png"),
    soundOff: loadImage("./assets/images/soundoff.png"),
    xBtn: loadImage("./assets/images/x-btn.png"),
    howToPlayKeys: loadImage("./assets/images/howtoplay-keys.png"),
    upArrow: loadImage("assets/images/up-arrow.png"),
    enemy: loadImage("./assets/images/enemy.png"),
    enemyBoss: loadImage("./assets/images/boss.png"),
    platform: loadImage("./assets/images/platform.png"),
    bumpy: loadImage("./assets/images/bumpy.png"),
    bumpySad: loadImage("./assets/images/bumpy-sad.png"),
    talkingBubble: loadImage("./assets/images/bumpy-bubble.png"),
    bubbleglow: loadImage("./assets/images/bubbleglow.png"),
    bumpyBalloons_gif: loadImage("./assets/gif/bumpyballoonscropped.gif"),
    bumpyBlink_gif: loadImage("./assets/gif/bumpyblinking.gif"),
    bumpyBlinkCry_gif: loadImage("./assets/gif/bumpyblinkcry.gif"),
    bumpyFall_gif: loadImage("./assets/gif/bumpyfall.gif"),
    bumpyRocket_gif: loadImage("./assets/gif/bumpyrocketcropped.gif"),
    bumpyStar_gif: loadImage("./assets/gif/bumpystarcropped.gif"),
  };

  sounds = {
    bulletSound: loadSound("./assets/sounds/bullet.mp3"),
    song: loadSound("./assets/music/bumpy.mp3"),
    jumpSound: loadSound("./assets/sounds/jump.wav"),
    enemyDeath: loadSound("./assets/sounds/enemy-death.wav"),
  };
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  sounds.bulletSound = loadSound("./assets/sounds/bullet.mp3");
  sounds.bulletSound.setVolume(0.1);
  sounds.jumpSound.setVolume(0.1);
  sounds.jumpSound = loadSound("./assets/sounds/jump.wav");
  // sounds.song = loadSound("./assets/music/bumpy.mp3");
  sounds.enemyDeath.setVolume(0.1);

  sounds.song.setVolume(0.02);
  //sounds.song.loop();
  createCanvas(550, 720);
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
  game.update();
  game.draw();
}

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(540, 720);
}
