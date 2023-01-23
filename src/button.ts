class Button {
   private content: string | p5.Image;
   private position: p5.Vector;
   private size: p5.Vector;
   private radius: number;

   constructor(content: string | p5.Image, position: p5.Vector, size: p5.Vector) {
     this.content = content;
     this.position = position;
     this.size = size;
     this.radius = size.x * 0.3;
   } 

//   public update() {
//     // Klickade användaren på knappen?
//   }

public draw() {
   push();
   // 1. rita rektangel
   noStroke();
   fill("#DFADD0");
   rectMode(CENTER);
   rect(this.position.x, this.position.y, this.size.x, this.size.y, this.radius);
   // 2. rita texten
   fill("#3A1458");
   textSize(22);
   textFont(Fonts.TitanOne);
   if (typeof this.content === "string") {
      textAlign(CENTER, CENTER);
      text(this.content, this.position.x, this.position.y);
   } else {
      imageMode(CENTER);
      image(this.content, this.position.x, this.position.y, this.size.x/1.5, this.size.y/1.5);
   }
   pop();
  }
}


// Created buttons for EndMenu
let btnPlayAgain = new Button("PLAY AGAIN", new p5.Vector(100, 150), new p5.Vector(300, 100));
let btnMenu = new Button("MENU", new p5.Vector(100, 200), new p5.Vector(200, 50));







