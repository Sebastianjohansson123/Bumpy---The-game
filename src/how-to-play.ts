class HowToPlay {
  private btnExit: Button;

  constructor() {
    this.btnExit = new Button(
      images.xBtn,
      new p5.Vector(376, 173),
      new p5.Vector(15, 15)
    );
    this.btnExit.onClickCallback = () => {
      game.activeScene = "start";
    };
  }

  public update() {
    this.btnExit.update();
  }

  public draw() {
    image(images.bg, 0, 0);
    image(images.talkingBubble, 150, 150, 249, 350);
    this.drawTitle();
    this.btnExit.draw();
    images.xBtn.resize(11, 11);
    image(images.howToPlayKeys, 162, 355, 130, 70);
    image(images.bumpyBlink_gif, 50, 450, 152, 193);
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
    textSize(27);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text("How to play", 274, 180);
    pop();
    push();
    fill("#3A1458");
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
    textFont(Fonts.Gaegu);
    text("Shoot", 262, 373);
    text("Move to the right", 295, 402);
    text("Move to the left", 214, 428);
    pop();
  }
}
