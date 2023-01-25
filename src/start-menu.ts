class StartMenu {
  // private highscore: number;
  // private game: IGameStart
  private btnPlayGame: Button;
  private btnHowToPlay: Button;
  private btnScores: Button;
  private btnSound: Button;
  // private bumpyBlinkSprite: p5.Image;
  // private bumpyBlinkFrames: number[];
  // private currentBumpyFrame: number;


  constructor() {
    const centerX = width * 0.5;
    this.btnPlayGame = new Button("Play Game", new p5.Vector(centerX, 230), new p5.Vector(200, 50));
    this.btnHowToPlay = new Button("How to play", new p5.Vector(centerX, 290), new p5.Vector(200, 50));
    this.btnScores = new Button("Scores", new p5.Vector(centerX, 350), new p5.Vector(200, 50));
    this.btnSound = new Button(images.soundOn, new p5.Vector(centerX, 410), new p5.Vector(50, 50)); 
    //this.bumpyBlinkSprite
    // this.bumpyBlinkFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // this.currentBumpyFrame = 0;
  }

  public update() {
//     this.currentBumpyFrame++;
//     if (this.currentBumpyFrame >= this.bumpyBlinkFrames.length) {
//       this.currentBumpyFrame = 0;
//     }
  }

  public draw() {
    image(images.bg, 0, 0);
    image(images.talkingBubble, 150, 150);
    images.talkingBubble.resize(249, 350);
    this.drawTitle();
    this.btnPlayGame.draw();
    this.btnHowToPlay.draw();
    this.btnScores.draw();
    this.btnSound.draw();
    image(images.bumpyBlink_gif, 50, 450);
    images.bumpyBlink_gif.resize(131, 193);
    // this.drawBumpyBlink();

    // image(bumpySpace[currentBumpySpace], 50, 450);
    // currentBumpySpace = (currentBumpySpace + 1) % bumpySpace.length;
  }

  // private drawBumpyBlink() {
  //   let frame = this.bumpyBlinkFrames[this.currentBumpyFrame];
  //   let frameWidth = this.bumpyBlinkSprite.width / this.bumpyBlinkFrames.length;
  //   let frameHeight = this.bumpyBlinkSprite.height;
  //   image(this.bumpyBlinkSprite, 50, 450, frameWidth, frameHeight, frame * frameWidth, 0, frameWidth, frameHeight);
  // }

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

  // private bumpyBlink() {
  //   for (let i = 0; i < 3; i++) {
  //     bump[i] = loadImage("image" + (i+1) + ".jpg");
  // }
  // }

}

