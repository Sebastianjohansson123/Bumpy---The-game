/// <reference path="entity.ts"  />
class Shoot extends Entity {

  constructor(position: p5.Vector) {
    super(position, createVector(0,10), createVector(0,0), createVector(15,15), images.bumpy)
  }

  public update() {
    this.position.y -= this.velocity.y;
  }
}