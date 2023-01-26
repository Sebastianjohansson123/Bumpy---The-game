/// <reference path="entity.ts"  />
class BalloonBoost extends Entity {
  constructor(position: p5.Vector) {
    super(
      position,
      createVector(0, 0),
      createVector(0, 0),
      createVector(70, 110),
      images.balloon
    );
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }
}
