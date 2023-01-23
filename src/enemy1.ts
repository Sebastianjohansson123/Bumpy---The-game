/// <reference path="entity.ts"  />

class Enemy extends Entity {
  constructor(
    position: p5.Vector // x: number, // y: number, // width: number,
  ) // height: number,
  // img: p5.Image
  {
    super(
      position,
      createVector(0, 0),
      createVector(0, 0),
      createVector(100, 100),
      images.enemy
    );
    // this.position = createVector(x, y);
    // this.size = createVector(width * 0.5, height);
    // this.img = img;
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
