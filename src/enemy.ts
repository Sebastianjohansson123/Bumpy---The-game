/// <reference path="entity.ts"  />

class Enemy extends Entity {
  constructor(
    position: p5.Vector // x: number, // y: number, // width: number, // height: number, // img: p5.Image
  ) {
    super(
      position,
      createVector(0, 0),
      createVector(0, 0),
      createVector(80, 80),
      images.enemy
    );
    // this.position = createVector(x, y);
    // this.size = createVector(width * 0.5, height);
    // this.img = img;
  }

  public getHitBox(): p5.Vector {
    return this.size.copy().sub(20, 20);
  }
}
