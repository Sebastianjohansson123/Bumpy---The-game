/// <reference path="entity.ts"  />

class EnemyBoss extends Entity {
  constructor(
    position: p5.Vector
  ) {
    super(
      position,
      createVector(0, 0),
      createVector(0, 0),
      createVector(150, 150),
      images.enemyBoss
    );
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }
}
