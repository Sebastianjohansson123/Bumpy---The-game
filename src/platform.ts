/// <reference path="entity.ts"  />
class Platform extends Entity {
  constructor(position: p5.Vector) {
    super(
      position,
      createVector(0, 0),
      createVector(0, 0),
      createVector(115, 20),
      images.platform
    );
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }
}
