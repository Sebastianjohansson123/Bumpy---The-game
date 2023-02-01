class Button {
  private content: string | p5.Image;
  private position: p5.Vector;
  private size: p5.Vector;
  private radius: number;
  private isActive: boolean;
  public onClickCallback: () => void;

  constructor(
    content: string | p5.Image,
    position: p5.Vector,
    size: p5.Vector
  ) {
    this.content = content;
    this.position = position;
    this.size = size;
    this.radius = size.x * 0.3;
    this.isActive = false;
    this.onClickCallback = () => {};
  }

  /**
   * Implementation for button click handling
   */
  public update() {
    if (this.onClickCallback) {
      if (
        mouseX > this.position.x - this.size.x / 2 &&
        mouseX < this.position.x + this.size.x / 2 &&
        mouseY > this.position.y - this.size.y / 2 &&
        mouseY < this.position.y + this.size.y / 2
      ) {
        if (mouseIsPressed && !this.isActive) {
          this.onClickCallback();
          this.isActive = true;
        }
        if (!mouseIsPressed) this.isActive = false;
      }
    }
  }

  // Används inte - ta ev bort! 
  public onClick(cb: () => void) {
    this.onClickCallback = cb;
  }

  /**
   * Draws the shape of the button with color and content
   */
  public draw() {
    push();
    noStroke();
    // creates hover effect on button
    // checks if mouse is within the area of the rect
    if (
      mouseX > this.position.x - this.size.x / 2 &&
      mouseX < this.position.x + this.size.x / 2 &&
      mouseY > this.position.y - this.size.y / 2 &&
      mouseY < this.position.y + this.size.y / 2
    ) {
    // changes fill color
      fill("#FFFFFF"); // hover color
    } else {
      fill("#DFADD0"); // original color
    }

    // draws button shape (rect) 
    noStroke();
    rectMode(CENTER);
    rect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
      this.radius
    );

    // draws text
    fill("#3A1458");
    textSize(22);
    textFont(Fonts.TitanOne);

    // checks if content is string or image
    if (typeof this.content === "string") {
      textAlign(CENTER, CENTER);
      text(this.content, this.position.x, this.position.y);
    } else {
      imageMode(CENTER);
      image(
        this.content,
        this.position.x,
        this.position.y,
        this.size.x / 1.5,
        this.size.y / 1.5
      );
    }
    pop();
  }
}
