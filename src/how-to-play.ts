class HowToPlay {
    private btnExit: Button;
  
    constructor() {
      this.btnExit = new Button("x", new p5.Vector(372, 175), new p5.Vector(0, 0));
    }
  
    public update() {}
  
    public draw() {
      image(images.bg, 0, 0);
      image(images.talkingBubble, 150, 150);
      images.talkingBubble.resize(249, 350);
      this.drawTitle();
      this.btnExit.draw();
      image(images.howToPlayKeys, 165, 340);
      images.howToPlayKeys.resize(160, 80);
      image(images.bumpy, 50, 450);
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
      push();
      fill("#3A1458");
      textSize(10);
    //   textAlign(CENTER, CENTER);
      textFont(Fonts.Gaegu);
      textWrap(WORD);
    //   text("Use the keys on the keyboard to move the monster. Use the RIGHT arrow key to move the monster to the right, and the LEFT arrow key to move the monster to the left. Use the UP key to shoot.", 120, 250);
      pop();
    }
  }