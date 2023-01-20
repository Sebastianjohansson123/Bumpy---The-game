class StartMenu {
  // private highscore: number;
  // private game: IGameStart
  private btnPlayGame: Button;
  private btnHowToPlay: Button;
  private btnScores: Button;
  private btnSound: Button;

  // Buttons for How To Play
  //private btnUpArrow: Button;

  constructor() {
    const centerX = width * 0.5;
    this.btnPlayGame = new Button("Play Game", new p5.Vector(centerX, 230), new p5.Vector(200, 50));
    this.btnHowToPlay = new Button("How to play", new p5.Vector(centerX, 290), new p5.Vector(200, 50));
    this.btnScores = new Button("Scores", new p5.Vector(centerX, 350), new p5.Vector(200, 50));
    this.btnSound = new Button(images.soundOn, new p5.Vector(centerX, 410), new p5.Vector(50, 50)); 

    //this.btnUpArrow = new Button(images.upArrow, new p5.Vector(centerX, 360), new p5.Vector(50, 50)); 
  }

  public update() {}

  public draw() {
    image(bg, 0, 0);
    image(talkingBubble, 150, 150);
    talkingBubble.resize(249, 350);
    this.drawTitle();
    this.btnPlayGame.draw();
    this.btnHowToPlay.draw();
    this.btnScores.draw();
    this.btnSound.draw();
    image(bumpy, 50, 450);
    //this.btnUpArrow.draw();
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