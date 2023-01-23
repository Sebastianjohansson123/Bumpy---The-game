class EndMenu {
  // private highscore: number;
  private btnPlayAgain: Button;
  private btnMenu: Button;

  constructor() {
    const centerX = width * 0.5;
    this.btnPlayAgain = new Button("PLAY AGAIN", new p5.Vector(centerX, 230), new p5.Vector(220, 60));
    this.btnMenu = new Button("MENU", new p5.Vector(centerX, 290), new p5.Vector(140, 40));
  }

  public update() {}

  public draw() {
    image(images.bg, 0, 0);
    this.drawTitle();
    this.btnPlayAgain.draw();
    this.btnMenu.draw();
    image(images.bumpy, 50, 450);
  }

  private drawTitle() {
    push();
    fill("#000000");
    textSize(100);
    textAlign(CENTER, CENTER);
    textFont(Fonts.CevicheOne);
    text("Game Over!", 278, 113);
    pop();
    push();
    fill("#3A1458");
    textSize(100);
    textAlign(CENTER, CENTER);
    textFont(Fonts.CevicheOne);
    text("Game Over!", 275, 110);
    pop();
  }
}