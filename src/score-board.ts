class Scoreboard {
  private btnExitScoreBoard: Button;
  private game: IGame;

  constructor(game: IGame) {
    this.game = game;
    this.btnExitScoreBoard = new Button(
      images.xBtn,
      new p5.Vector(376, 173),
      new p5.Vector(15, 15)
    );
    this.btnExitScoreBoard.onClickCallback = () => {
      this.game.activeScene = "start";
    };
  }

  public update() {
    this.btnExitScoreBoard.update();
  }

  public draw() {
    image(images.bg, 0, 0);
    image(images.talkingBubble, 150, 150, 249, 350);
    this.drawTitle();
    this.btnExitScoreBoard.draw();
    images.xBtn, 376, 173, 11, 11;
    this.drawRects();
    image(images.bumpyParty_gif, -50, 315, 400, 380);
    image(images.crown, 164, 182, 40, 40);
  }

  // Draws the rects with top 3 scores
  private drawRects() {
    let positions = [
      new p5.Vector(275, 220),
      new p5.Vector(275, 260),
      new p5.Vector(275, 300),
    ];
    let texts = ["01", "02", "03"];
    let scores:number[] = [ 
      this.game.getTopHighscore(),
      this.game.getSecondHighscore(),
      this.game.getThirdHighscore(),
    ];
    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i];
      noStroke();
      rectMode(CENTER);
      fill("#FFFFFF");
      rect(pos.x, pos.y, 190, 27, 11);
      fill("#000000");
      textSize(20);
      textFont(Fonts.TitanOne);
      text(texts[i], pos.x - 60, pos.y);
      textAlign(RIGHT, CENTER);
      text(scores[i], pos.x + 85, pos.y);
    }
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
    text("Score", 274, 180);
    pop();
    push();
    fill("#FFFFFF");
    textSize(28);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text("HIGHSCORE", 276, 351);
    pop();
    push();
    fill("#3A1458");
    textSize(28);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text("HIGHSCORE", 275, 350);
    pop();
    push();
    fill("#3A1458");
    textSize(35);
    textAlign(CENTER, CENTER);
    textFont(Fonts.TitanOne);
    text(game.getTopHighscore(), 274, 395);
    pop();
  }
}
