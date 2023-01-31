/// <reference path="entity.ts"  />
class Platform extends Entity {
  // private breakable: boolean;
  // private moveable: boolean;

  constructor(position: p5.Vector) {
    super(
      position,
      createVector(0, 0),
      createVector(0, 0),
      createVector(115, 20),
      images.platform
    );
  }
  
}
