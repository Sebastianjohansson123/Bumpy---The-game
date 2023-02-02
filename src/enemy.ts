/// <reference path="entity.ts"  />

class Enemy extends Entity {
  constructor(
    position: p5.Vector 
  ) {
    super(
      position,
      createVector(0, 0),
      createVector(0, 0),
      createVector(80, 80),
      images.enemy
    );
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }
}
