/// <reference path="entity.ts"  />
class Bullet extends Entity {
  private speed: number;
  private mainCharacter: MainCharacter;


  constructor(mainCharacter: MainCharacter) {
    super()
    this.mainCharacter = mainCharacter;
    this.position = createVector(mainCharacter.getPosition().x + 25, mainCharacter.getPosition().y);
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