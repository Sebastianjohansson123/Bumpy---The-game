/// <reference path="entity.ts"  />
class Bullet extends Entity {
  private speed: number;


  constructor(x: number, y: number) {
    super()
    this.position = createVector(x + 25, y);
    this.speed = 10;
  }

  public update() {
    this.position.y -= this.speed;
  }

  public draw() {
    fill(255);
    rect(this.position.x, this.position.y, 15, 15);
  }
}