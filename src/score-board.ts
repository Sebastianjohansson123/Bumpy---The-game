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
        this.drawRects();
        image(images.bumpy, 50, 450);
        image(images.crown, 164, 182, 40, 40);
    }

    private drawRects() {
        rectMode(CENTER);
        noStroke();
        fill("#FFFFFF");
        let positions = [new p5.Vector(275, 220), new p5.Vector(275, 260), new p5.Vector(275, 300)];
        for (let i = 0; i < positions.length; i++) {
            let pos = positions[i];
            rect(pos.x, pos.y, 190, 27, 11);
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
        text("14390", 274, 395);
        pop();
    }
}