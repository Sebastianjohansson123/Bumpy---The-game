class Button {
  private content: string | p5.Image;
  private position: p5.Vector;
  private size: p5.Vector;
  private radius: number;
  private isClicked: boolean;
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
    this.isClicked = false;
    this.onClickCallback = () => {};
  }

  public update() {
    if (this.onClickCallback) {
      if (
        mouseX > this.position.x - this.size.x / 2 &&
        mouseX < this.position.x + this.size.x / 2 &&
        mouseY > this.position.y - this.size.y / 2 &&
        mouseY < this.position.y + this.size.y / 2
      ) {
        if (mouseIsPressed && !this.isClicked) {
          this.onClickCallback();
          this.isClicked = true;
        }
        if (!mouseIsPressed) this.isClicked = false;
      }
    }
  }

  public onClick(cb: () => void) {
    this.onClickCallback = cb;
  }

  public draw() {
    push();
    noStroke();
    // draws the rect for the button shape with hover effect
    if (
      mouseX > this.position.x - this.size.x / 2 &&
      mouseX < this.position.x + this.size.x / 2 &&
      mouseY > this.position.y - this.size.y / 2 &&
      mouseY < this.position.y + this.size.y / 2
    ) {
      // if mouse is within the area of the rect, change fill color
      fill("#FFFFFF"); // hover color
    } else {
      fill("#DFADD0"); // original color
    }

    noStroke();
    // fill("#DFADD0");
    rectMode(CENTER);
    rect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
      this.radius
    );
    fill("#3A1458");
    textSize(22);
    textFont(Fonts.TitanOne);
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
