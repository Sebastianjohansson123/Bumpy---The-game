class HowToPlay {
  private btnExitHowToPlay: Button;
  private game: IGame;

  constructor(game: IGame) {
    // Creates the exit button
    this.game = game;
    this.btnExitHowToPlay = new Button(
      images.xBtn,
      new p5.Vector(376, 173),
      new p5.Vector(15, 15)
    );
    // Callback function for click event on button
    this.btnExitHowToPlay.onClickCallback = () => {
      this.game.activeScene = "start";
    };
  }

  public update() {
    this.btnExitHowToPlay.update();
  }

  /**
   * Draws the images, button, title and how to play instructions on the canvas
   */
  public draw() {
    image(images.bg, 0, 0);
    image(images.talkingBubble, 150, 150, 249, 350);
    this.drawTitle();
    this.btnExitHowToPlay.draw();
    images.xBtn.resize(11, 11);
    image(images.howToPlayKeys, 162, 355, 130, 70);
    image(images.bumpyBlink_gif, 50, 450, 152, 193);
  }


  /**
   * Draws the title and how to play instructions
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
    textSize(27);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text("How to play", 274, 180);
    pop();
    push();
    fill("#3A1458");
    textAlign(LEFT, CENTER);
    textSize(15);
    textFont(Fonts.Gaegu);
    text("Use the keys on the keyboard to", 160, 215);
    text("move the monster.", 160, 235);
    text("Use the RIGHT arrow key to move", 160, 255);
    text("the monster to the right, and the", 160, 275);
    text("LEFT arrow key to move the monster", 160, 295);
    text("to the left.", 160, 315);
    text("Use the UP key to shoot.", 160, 335);
    pop();
    push();
    fill("#3A1458");
    textSize(13);
    textAlign(CENTER, CENTER);
    textFont(Fonts.Gaegu);
    text("Shoot", 275, 370);
    text("Move to the right", 342, 399);
    text("Move to the left", 257, 425);
    pop();
  }
}
