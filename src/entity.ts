abstract class Entity {
  // private images: p5.Image[];
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

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }

  public getHitBox(): p5.Vector {
    return this.size;
  }

  public update() {}

  public draw() {
    image(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
