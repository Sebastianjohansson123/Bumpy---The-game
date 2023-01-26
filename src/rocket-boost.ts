/// <reference path="entity.ts"  />
class RocketBoost extends Entity {
  constructor(position: p5.Vector) {
    super(
      position,
      createVector(0, 0),
      createVector(0, 0),
      createVector(50, 90),
      images.bumpySad
    );
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }
}
