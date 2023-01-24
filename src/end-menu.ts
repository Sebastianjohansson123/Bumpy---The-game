class EndMenu {
  //private highscore: number;
  //private score: number;
  private btnPlayAgain: Button;
  private btnMenu: Button;
  private score: number;

  constructor(score: number) {
    const centerX = width * 0.5;
    this.score = score;
    this.btnPlayAgain = new Button("PLAY AGAIN", new p5.Vector(centerX, 290), new p5.Vector(220, 60));
    this.btnMenu = new Button("MENU", new p5.Vector(centerX, 350), new p5.Vector(140, 40));
  }

  public update() {
    this.btnPlayAgain.update();
    this.btnMenu.update();
    if(this.btnPlayAgain.clicked) {
      //this.activeScene = "play"
      console.log("Play again button clicked!");
      this.btnPlayAgain.clicked = false;
    }
    if(this.btnMenu.clicked) {
      // Perform action for menu button
      console.log("Menu button clicked!");
      this.btnMenu.clicked = false;
    }
  }

  public draw() {
    image(images.bg, 0, 0);
    this.drawTitle();
    this.btnPlayAgain.draw();
    this.btnMenu.draw();
    image(images.bumpySad, 185, 390);
    images.bumpySad.resize(180, 238);
  }

  private drawTitle() {
    push();
    fill("#FFFFFF");
    textSize(20);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text("Your score:" + " " + this.score, 278, 190);
    pop(); 
    push();
    fill("#FFFFFF");
    textSize(20);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text("Highscore:", 278, 220);
    pop();
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