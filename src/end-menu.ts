class EndMenu {
  // private highscore: number;
  private btnPlayAgain: Button;
  private btnMenu: Button;

  constructor() {
    const centerX = width * 0.5;
    this.btnPlayAgain = new Button("PLAY AGAIN", new p5.Vector(centerX, 230), new p5.Vector(200, 50));
    this.btnMenu = new Button("MENU", new p5.Vector(centerX, 290), new p5.Vector(200, 50));
  }

  public update() {}

  public draw() {
    image(images.bg, 0, 0);
    image(images.talkingBubble, 150, 150);
    images.talkingBubble.resize(249, 350);
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
    text("Game Over!", 278, 103);
    pop();
    push();
    fill("#3A1458");
    textSize(100);
    textAlign(CENTER, CENTER);
    textFont(Fonts.CevicheOne);
    text("Game Over!", 275, 100);
    pop();
  }
}