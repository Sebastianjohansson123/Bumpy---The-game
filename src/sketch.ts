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
  crown: p5.Image;
  bubbleglow: p5.Image;
  purplecursor: p5.Image;
  bumpyBalloons_gif: p5.Image;
  bumpyBlink_gif: p5.Image;
  bumpyBlinkCry_gif: p5.Image;
  bumpyFall_gif: p5.Image;
  bumpyRocket_gif: p5.Image;
  bumpyStar_gif: p5.Image;
  bumpyParty_gif: p5.Image;
}

interface Sounds {
  bubbleSound: p5.SoundFile;
  song: p5.SoundFile;
  jumpSound: p5.SoundFile;
  enemyDeath: p5.SoundFile;
  starBoostSound: p5.SoundFile;
  rocketSound: p5.SoundFile;
  balloonSound: p5.SoundFile;
  fallSound: p5.SoundFile;
  bossDeathSound: p5.SoundFile;
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
      loadImage("./assets/images/backgrounds/bg1.png"),
      loadImage("./assets/images/backgrounds/bg2.png"),
      loadImage("./assets/images/backgrounds/bg3.png"),
      loadImage("./assets/images/backgrounds/bg4.png"),
      loadImage("./assets/images/backgrounds/bg5.png"),
      loadImage("./assets/images/backgrounds/bg6.png"),
      loadImage("./assets/images/backgrounds/bg7.png"),
      loadImage("./assets/images/backgrounds/bg8.png"),
      loadImage("./assets/images/backgrounds/bg9.png"),
      loadImage("./assets/images/backgrounds/bg10.png"),
      loadImage("./assets/images/backgrounds/bg11.png"),
      loadImage("./assets/images/backgrounds/bg12.png"),
      loadImage("./assets/images/backgrounds/bg13.png"),
      loadImage("./assets/images/backgrounds/bg14.png"),
      loadImage("./assets/images/backgrounds/bg15.png"),
      loadImage("./assets/images/backgrounds/bg16.png"),
      loadImage("./assets/images/backgrounds/bg17.png"),
      loadImage("./assets/images/backgrounds/bg18.png"),
      loadImage("./assets/images/backgrounds/bg19.png"),
      loadImage("./assets/images/backgrounds/bg20.png"),
      loadImage("./assets/images/backgrounds/bg21.png"),
      loadImage("./assets/images/backgrounds/bg22.png"),
      loadImage("./assets/images/backgrounds/bg23.png"),
      loadImage("./assets/images/backgrounds/bg24.png"),
      loadImage("./assets/images/backgrounds/bg25.png"),
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
    crown: loadImage("./assets/images/crown.png"),
    bubbleglow: loadImage("./assets/images/bubbleglow.png"),
    purplecursor: loadImage("./assets/images/smallcursor.png"),
    bumpyBalloons_gif: loadImage("./assets/gif/bumpyballoonscropped.gif"),
    bumpyBlink_gif: loadImage("./assets/gif/bumpyblinking.gif"),
    bumpyBlinkCry_gif: loadImage("./assets/gif/bumpyblinkcry.gif"),
    bumpyFall_gif: loadImage("./assets/gif/bumpyfall.gif"),
    bumpyRocket_gif: loadImage("./assets/gif/bumpyrocketcropped.gif"),
    bumpyStar_gif: loadImage("./assets/gif/bumpystarcropped.gif"),
    bumpyParty_gif: loadImage("./assets/gif/bumpyparty.gif")
  };

  sounds = {
    bubbleSound: loadSound("./assets/sounds/bullet.mp3"),
    song: loadSound("./assets/music/bumpy-theme1v2.mp3"),
    jumpSound: loadSound("./assets/sounds/jump.wav"),
    fallSound: loadSound("./assets/sounds/falling.mp3"),
    enemyDeath: loadSound("./assets/sounds/enemy-death.wav"),
    starBoostSound: loadSound("./assets/sounds/starBoost.mp3"),
    rocketSound: loadSound("./assets/sounds/rocketSound.mp3"),
    balloonSound: loadSound("./assets/sounds/balloonSound.mp3"),
    bossDeathSound: loadSound("./assets/sounds/boss-death.mp3"),
  };
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  sounds.bubbleSound = loadSound("./assets/sounds/bullet.mp3");
  sounds.bubbleSound.setVolume(0.09);
  sounds.jumpSound = loadSound("./assets/sounds/jump.wav");
  sounds.jumpSound.setVolume(0.1);
  sounds.enemyDeath = loadSound("./assets/sounds/enemy-death.wav");
  sounds.enemyDeath.setVolume(0.1);
  sounds.song.setVolume(0.1);
  sounds.bossDeathSound = loadSound("./assets/sounds/boss-death.mp3");
  sounds.bossDeathSound.setVolume(0.3);

  // Sounds for power-ups
  sounds.starBoostSound = loadSound("./assets/sounds/starBoost.mp3");
  sounds.starBoostSound.setVolume(0.4);
  sounds.rocketSound = loadSound("./assets/sounds/rocketSound.mp3");
  sounds.rocketSound.setVolume(0.4);
  sounds.balloonSound = loadSound("./assets/sounds/balloonSound.mp3");
  sounds.balloonSound.setVolume(0.4);

  createCanvas(550, 720);
  // Adjusts screen if windowheight is less than 720px
  if (windowHeight < 720) {
    createCanvas(550, windowHeight);
  }
  frameRate(60);
  cursor("./assets/images/smallcursor.png");
  
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
  resizeCanvas(550, 720);
}
