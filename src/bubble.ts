/// <reference path="entity.ts"  />
class Bubble extends Entity {
  constructor(position: p5.Vector) {
    super(
      position,
      createVector(0, 10),
      createVector(0, 0),
      createVector(15, 15),
      images.bumpy
    );
  }

  public update() {
    this.position.y -= this.velocity.y;
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }
}
