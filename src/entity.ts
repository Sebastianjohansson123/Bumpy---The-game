abstract class Entity {
  protected position: p5.Vector;
  protected velocity: p5.Vector;
  protected gravity: p5.Vector;
  protected size: p5.Vector;
  protected img: p5.Image;

  constructor(
    position: p5.Vector,
    velocity: p5.Vector,
    gravity: p5.Vector,
    size: p5.Vector,
    img: p5.Image
  ) {
    this.position = position;
    this.velocity = velocity;
    this.gravity = gravity;
    this.size = size;
    this.img = img;
  }

  public draw() {
    image(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
