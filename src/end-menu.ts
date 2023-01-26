class EndMenu {
  //private highscore: number;
  //private score: number;
  private btnPlayAgain: Button;
  private btnMenu: Button;
  private score: number;
  private startMenu: StartMenu;

  constructor(score: number) {
    this.startMenu = new StartMenu();
    const centerX = width * 0.5;
    this.score = score;
    this.btnPlayAgain = new Button("PLAY AGAIN", new p5.Vector(centerX, 290), new p5.Vector(220, 60));
    this.btnPlayAgain.onClickCallback = () => {
      if (this.startMenu.buttonOnCooldown === false) {
        this.startMenu.buttonOnCooldown = true;
        game.activeScene = "play";
        console.log("play")
        setTimeout(() => {this.startMenu.buttonOnCooldown = false}, 500);
      }
    };
    this.btnMenu = new Button("MENU", new p5.Vector(centerX, 350), new p5.Vector(140, 40));
    this.btnMenu.onClickCallback = () => {
      if (this.startMenu.buttonOnCooldown === false) {
        this.startMenu.buttonOnCooldown = true;
        game.activeScene = "start";
        console.log("menu")
        setTimeout(() => {this.startMenu.buttonOnCooldown = false}, 500);
      }
    };
  }

  public update() {
    this.btnPlayAgain.update();
    this.btnMenu.update();
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