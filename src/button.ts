class Button {
  private content: string | p5.Image;
  private position: p5.Vector;
  private size: p5.Vector;
  // private radius: number;

  constructor(content: string | p5.Image, position: p5.Vector, size: p5.Vector) {
    this.content = content;
    this.position = position;
    this.size = size;
    // this.radius = size.x * 0.1
  } 


  public update() {
    // Klickade användaren på knappen?
  }

  public draw() {
    push();
    fill("#873333");
    // 1. rita rectangle
    // 2. rita texten
    // if (typeof this.content === "string") {
    //   text()
    // } else {
    //   image()
    // }
    // 3. rita ikon bilder
    pop();
  }
}