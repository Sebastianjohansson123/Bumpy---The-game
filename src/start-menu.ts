class StartMenu {
  private btnPlayGame: Button;
  private btnHowToPlay: Button;
  private btnScores: Button;
  private btnSoundOn: Button;
  private btnSoundOff: Button;
  private soundOn: boolean;

  constructor() {
    this.soundOn = true;
    const centerX = width * 0.5;

    // Creates the buttons on the canvas
    this.btnPlayGame = new Button(
      "Play Game",
      new p5.Vector(centerX, 230),
      new p5.Vector(200, 50)
    );
    this.btnHowToPlay = new Button(
      "How to play",
      new p5.Vector(centerX, 290),
      new p5.Vector(200, 50)
    );
    this.btnScores = new Button(
      "Scores",
      new p5.Vector(centerX, 350),
      new p5.Vector(200, 50)
    );
    this.btnSoundOn = new Button(
      images.soundOn,
      new p5.Vector(centerX, 410),
      new p5.Vector(50, 50)
    );
    this.btnSoundOff = new Button(
      images.soundOff,
      new p5.Vector(centerX, 410),
      new p5.Vector(50, 50)
    );

    // Toggles sound on and off 
    this.btnSoundOn.onClickCallback = () => {
      this.soundOn = !this.soundOn;
      if (this.soundOn) {
        sounds.bulletSound.setVolume(0.1);
        sounds.jumpSound.setVolume(0.1);
        sounds.song.setVolume(0.05);
      } else {
        sounds.bulletSound.setVolume(0.0);
        sounds.jumpSound.setVolume(0.0);
        sounds.song.setVolume(0.0);
      }
    };

    // Callback functions for click events on buttons
    this.btnPlayGame.onClickCallback = () => {
      game.activeScene = "play";
      game.resetGameBoard();
    };
    this.btnHowToPlay.onClickCallback = () => {
      game.activeScene = "howtoplay";
    };
  }

  public update() {
    this.btnPlayGame.update();
    this.btnHowToPlay.update();
    this.btnScores.update();
    this.btnSoundOn.update();
    this.btnSoundOff.update();
  }

  /**
   * Draws the start menu with images, buttons and title on the canvas
   */
  public draw() {
    image(images.bg, 0, 0);
    image(images.talkingBubble, 150, 150, 249, 350);
    this.drawTitle();
    this.btnPlayGame.draw();
    this.btnHowToPlay.draw();
    this.btnScores.draw();
    image(images.bumpyBlink_gif, 50, 450, 152, 193);
    if (this.soundOn === true) {
      this.btnSoundOn.draw();
    } else {
      this.btnSoundOff.draw();
    }
  }

  /**
   * Draws the title of the game
   */
  private drawTitle() {
    push();
    fill("#3A1458");
    textSize(50);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text("Bumpy", 275, 50);
    pop();
    push();
    fill("#000000");
    textSize(100);
    textAlign(CENTER, CENTER);
    textFont(Fonts.CevicheOne);
    text("Monster", 278, 103);
    pop();
    push();
    fill("#3A1458");
    textSize(100);
    textAlign(CENTER, CENTER);
    textFont(Fonts.CevicheOne);
    text("Monster", 275, 100);
    pop();
    push();
    fill("#3A1458");
    textSize(42);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text("MENU", 275, 180);
    pop();
  }
}
