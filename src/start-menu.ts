class StartMenu {
  // private highscore: number;
  // private game: IGameStart
  private btnPlayGame: Button;
  private btnHowToPlay: Button;
  private btnScores: Button;
  private btnSoundOn: Button;
  private btnSoundOff: Button;
  private soundOn: any;
  public buttonOnCooldown: boolean;

  constructor() {
    this.buttonOnCooldown = false;
    this.soundOn = true;
    const centerX = width * 0.5;

    this.btnPlayGame = new Button("Play Game", new p5.Vector(centerX, 230), new p5.Vector(200, 50));
    this.btnHowToPlay = new Button("How to play", new p5.Vector(centerX, 290), new p5.Vector(200, 50));
    this.btnScores = new Button("Scores", new p5.Vector(centerX, 350), new p5.Vector(200, 50));
    this.btnSoundOn = new Button(images.soundOn, new p5.Vector(centerX, 410), new p5.Vector(50, 50)); 
    this.btnSoundOff = new Button(images.soundOff, new p5.Vector(centerX, 410), new p5.Vector(50, 50)); 

    this.btnPlayGame.onClickCallback = () => {
      if (game.activeScene === "start" || game.activeScene === "end") {
        game.activeScene = "play";
        console.log("play")
      }
    };
    
    this.btnHowToPlay.onClickCallback = () => {
      if (game.activeScene === "start") {
        game.activeScene = "howtoplay";
        console.log("howtoplay")
      }
    };

    this.btnSoundOn.onClickCallback = () => {
      if (this.soundOn === true && this.buttonOnCooldown === false) {
      this.buttonOnCooldown = true;
      this.soundOn = false;
      sounds.bulletSound.setVolume(0.0);
      sounds.jumpSound.setVolume(0.0);
      sounds.song.setVolume(0.0);
      setTimeout(() => {this.buttonOnCooldown = false}, 500);
      }
       if (this.soundOn === false && this.buttonOnCooldown === false)  {
        this.buttonOnCooldown = true;
        this.soundOn = true;
        sounds.bulletSound.setVolume(0.1);
        sounds.jumpSound.setVolume(0.1);
        sounds.song.setVolume(0.05);
        setTimeout(() => {this.buttonOnCooldown = false}, 500);
      }
    };

  }

  public update() {
    this.btnPlayGame.update();
    this.btnHowToPlay.update();
    this.btnScores.update();
    this.btnSoundOn.update();
    this.btnSoundOff.update();
  }

  public draw() {
    image(images.bg, 0, 0);
    image(images.talkingBubble, 150, 150);
    images.talkingBubble.resize(249, 350);
    this.drawTitle();
    this.btnPlayGame.draw();
    this.btnHowToPlay.draw();
    this.btnScores.draw();
    image(images.bumpy, 50, 450);
    if (this.soundOn === true) {
      this.btnSoundOn.draw();
    } else {
      this.btnSoundOff.draw();
    }
  }

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