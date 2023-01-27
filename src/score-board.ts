    class Scoreboard {
    private btnExit2: Button;

    constructor() {
        this.btnExit2 = new Button(images.xBtn, new p5.Vector(376, 173), new p5.Vector(15, 15));
        this.btnExit2.onClickCallback = () => {
        game.activeScene = "start";
        };
    }

    public update() {
        this.btnExit2.update();
    }

    public draw() {
        image(images.bg, 0, 0);
        image(images.talkingBubble, 150, 150, 249, 350);
        this.drawTitle();
        this.btnExit2.draw();
        images.xBtn.resize(11, 11);
        image(images.bumpy, 50, 450);
        image(images.crown, 164, 182, 40, 40);
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
        rectMode(CENTER);
        noStroke();
        // for (let i = 0; i < 3; i++) {
        //     rect(275, 190, +i * 100, 27, 40);
        // }
        rect(275, 220, 190, 27, 11);
        fill("#FFFFFF");
        textAlign(LEFT, CENTER);
        textFont(Fonts.TitanOne);
        textSize(20);
        fill("#000000");
        text("01", 190, 220);
        pop();
        push();
        rectMode(CENTER);
        noStroke();
        rect(275, 260, 190, 27, 11);
        fill("#FFFFFF");
        textAlign(LEFT, CENTER);
        textFont(Fonts.TitanOne);
        textSize(20);
        fill("#000000");
        text("02", 190, 260);
        pop();
        push();
        rectMode(CENTER);
        noStroke();
        rect(275, 300, 190, 27, 11);
        fill("#FFFFFF");
        textAlign(LEFT, CENTER);
        textFont(Fonts.TitanOne);
        textSize(20);
        fill("#000000");
        text("03", 190, 300);
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
        text("14390", 274, 395);
        pop();
    }
    }