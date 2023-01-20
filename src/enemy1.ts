/// <reference path="entity.ts"  />

class Enemy extends Entity {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    img: p5.Image
  ) {
    super();
    this.position = createVector(x, y);
    this.size = createVector(width / 2, height);
    this.img = img;
  }

  public draw() {
    image(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }
}
