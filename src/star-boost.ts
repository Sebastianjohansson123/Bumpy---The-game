/// <reference path="entity.ts" />

class StarBoost extends Entity {
  constructor(position: p5.Vector) {
    super(
      position,
      createVector(0, 0),
      createVector(0, 0),
      createVector(50, 50),
      images.star
    );
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }
}
