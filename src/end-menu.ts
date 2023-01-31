class EndMenu {
  private btnPlayAgain: Button;
  private btnMenu: Button;

  constructor() {

    // Adds the button in the position center x of canvas
    const centerX = width * 0.5;

    // Creates buttons
    this.btnPlayAgain = new Button(
      "PLAY AGAIN",
      new p5.Vector(centerX, 290),
      new p5.Vector(220, 60)
    );
    this.btnMenu = new Button(
      "MENU",
      new p5.Vector(centerX, 350),
      new p5.Vector(140, 40)
    );

    // Callback functions for click events on buttons
    this.btnPlayAgain.onClickCallback = () => {
      game.resetGameBoard();
      game.activeScene = "play";
    };
    this.btnMenu.onClickCallback = () => {
      game.activeScene = "start";
    };
  }

  public update() {
    this.btnPlayAgain.update();
    this.btnMenu.update();
  }

  /**
   * Draws images, buttons and title on the canvas
   */
  public draw() {
    image(images.bg, 0, 0);
    this.drawTitle();
    this.btnPlayAgain.draw();
    this.btnMenu.draw();
    image(images.bumpyBlinkCry_gif, 75, 310, 400, 400);
  }

  /**
   * Draws title "Game over", score and highscore
   */
  private drawTitle() {
    push();
    fill("#FFFFFF");
    textSize(20);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text("Your score:" + " " + game.setEndMenuScore(), 278, 190);
    pop();
    push();
    fill("#FFFFFF");
    textSize(20);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text("Highscore:" + " " + game.getHighscore(), 278, 220);
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
