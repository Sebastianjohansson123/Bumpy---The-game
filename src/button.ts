class Button {
   private content: string | p5.Image;
   private position: p5.Vector;
   private size: p5.Vector;
   private radius: number;
   public clicked: boolean;

   constructor(content: string | p5.Image, position: p5.Vector, size: p5.Vector) {
     this.content = content;
     this.position = position;
     this.size = size;
     this.radius = size.x * 0.3;
     this.clicked = false;
   } 

     public update() {
     // Klickade användaren på knappen?
      if (this.isMouseWithinBounds() && mouseIsPressed) {
   // Perform action or set variable to indicate that the button has been clicked
      this.clicked = true;
      console.log("Button clicked!");
      }
  }

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

  private isMouseWithinBounds() {
   return (
     mouseX > this.position.x - this.size.x / 2 &&
     mouseX < this.position.x + this.size.x / 2 &&
     mouseY > this.position.y - this.size.y / 2 &&
     mouseY < this.position.y + this.size.y / 2
   );
 }
}








