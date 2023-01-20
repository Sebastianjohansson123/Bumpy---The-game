class StartMenu {
  // private highscore: number;
  // private game: IGameStart
  private btnPlayGame: Button;
  private btnHowToPlay: Button;
  private btnScores: Button;
  private btnSound: Button;

  constructor() {
    const centerX = width * 0.5;
    this.btnPlayGame = new Button("Play Game", new p5.Vector(centerX, 150), new p5.Vector(200, 50));
    this.btnHowToPlay = new Button("How to play", new p5.Vector(centerX, 220), new p5.Vector(200, 50));
    this.btnScores = new Button("Scores", new p5.Vector(centerX, 290), new p5.Vector(200, 50));
    this.btnSound = new Button(images.soundOn, new p5.Vector(centerX, 360), new p5.Vector(50, 50)); // should have an icon instead of text
  }

  public update() {}

  public draw() {
    this.drawTitle();
    this.btnPlayGame.draw();
    this.btnHowToPlay.draw();
    this.btnScores.draw();
    this.btnSound.draw();
  }


  private drawTitle() {

  }
}