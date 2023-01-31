interface IBoard {
  addBullet: (bullet: Shoot) => void;
}

class GameBoard implements IBoard {
  // private backgrounds: Background[];
  private mainCharacter: MainCharacter;
  private entities: Entity[];
  private score: number;
  private scoreMultiplier: number = 1;
  private timeSinceLastMultiplierIncrease: number = 0;
  private canGenerateEnemy: boolean | undefined;
  private canGenerateBalloonBoost: boolean | undefined;
  private canGenerateRocketBoost: boolean | undefined;
  private currentBackgroundIndex: number = 0;
  private backgroundChangeScoreIncrement: number = 8;
  private canMoveEnemy: boolean = false;
  private canMoveBalloonBoost: boolean = false;
  private balloonBoosts: BalloonBoost[];
  private rocketBoosts: RocketBoost[];
  private rocketBoostIsActive: boolean;
  private balloonBoostIsActive: boolean;
  private starBoosts: StarBoost[];
  private canGenerateStarBoost: boolean | undefined;
  private starBoostIsActive: boolean;

  constructor() {
    this.mainCharacter = new MainCharacter(this);
    this.entities = [this.mainCharacter];
    this.balloonBoosts = [];
    this.balloonBoosts = [];
    this.rocketBoosts = [];
    this.starBoosts = [];
    this.score = 0;
    this.generateBottomPlatform();
    this.generatePlatforms();
    this.canGenerateEnemy = false;
    this.canGenerateBalloonBoost = false;
    this.canGenerateRocketBoost = false;
    this.rocketBoostIsActive = false;
    this.balloonBoostIsActive = false;
    this.canGenerateStarBoost = false;
    this.starBoostIsActive = false;
  }
  public update() {
    this.mainCharacter.update();
    this.detectCollision();
    this.moveEntities();
    this.updatePlatforms();
    this.updateEnemies();
    this.generateEnemy();
    this.updateBalloonBoosts();
    this.generateBalloonBoost();
    this.updateRocketBoosts();
    this.generateRocketBoost();
    this.detectImgChange();
    this.updateStarBoosts();
    this.generateStarBoost();
  }

  public draw() {
    this.drawBackground();
    this.entities.forEach((entity) => entity.draw());
    this.balloonBoosts.forEach((balloonBoost) => balloonBoost.draw());
    this.rocketBoosts.forEach((rocketBoost) => rocketBoost.draw());
    this.starBoosts.forEach((starBoost) => starBoost.draw());
    this.mainCharacter.draw();
    this.DisplayScore();
  }

  public addBullet(bullet: Shoot) {
    this.entities.push(bullet);
  }

  // checks if the score is above a certain threshold
  // then increases the backgroundindex which draws
  // a new background image. Can be expanded with additional
  // bgimages and added transition effects
  private drawBackground() {
    if (this.score >= this.backgroundChangeScoreIncrement) {
      this.currentBackgroundIndex =
        (this.currentBackgroundIndex + 1) % images.backgrounds.length;
      this.backgroundChangeScoreIncrement += 500;
    }
    images.backgrounds[this.currentBackgroundIndex];
    let repeatCount =
      height / images.backgrounds[this.currentBackgroundIndex].height + 1;
    for (let i = 0; i < repeatCount; i++) {
      image(
        images.backgrounds[this.currentBackgroundIndex],
        0,
        i * images.backgrounds[this.currentBackgroundIndex].height
      );
    }
  }

  private entitiesOverlap(entity: Entity, otherEntity: Entity) {
    return (
      entity.getPosition().x <
        otherEntity.getPosition().x + otherEntity.getHitBox().x &&
      entity.getPosition().x + entity.getHitBox().x >
        otherEntity.getPosition().x &&
      entity.getPosition().y <
        otherEntity.getPosition().y + otherEntity.getHitBox().y &&
      entity.getPosition().y + entity.getHitBox().y >
        otherEntity.getPosition().y
    );
  }

  // Detects collisions between entities on the GameBoard
  private detectCollision() {
    for (let entity of this.entities) {
      for (let otherEntity of this.entities) {
        if (entity === otherEntity) continue;

        if (
          entity instanceof Platform &&
          otherEntity instanceof MainCharacter
        ) {
          if (this.entitiesOverlap(entity, otherEntity)) {
            // todo: lägg till koll för hastighet
            this.mainCharacter.jump();
          }
        }

        if (entity instanceof Enemy && otherEntity instanceof MainCharacter) {
          if (this.entitiesOverlap(entity, otherEntity)) {
            if (!this.starBoostIsActive) {
              game.activeScene = "end";
            } else {
              sounds.enemyDeath.play();
              this.entities.splice(this.entities.indexOf(entity), 1);
              this.score += 100;
              setTimeout(() => (this.starBoostIsActive = false), 10000);
            }
          }
        }

        if (entity instanceof Enemy && otherEntity instanceof Shoot) {
          if (this.entitiesOverlap(entity, otherEntity)) {
            sounds.enemyDeath.play();

            this.entities.splice(this.entities.indexOf(entity), 1);
            this.entities.splice(this.entities.indexOf(otherEntity), 1);
            this.score += 100;
          }
        }

        if (
          entity instanceof BalloonBoost &&
          otherEntity instanceof MainCharacter
        ) {
          if (this.entitiesOverlap(entity, otherEntity)) {
            this.balloonBoostIsActive = true;
            this.entities.splice(this.entities.indexOf(entity), 1);
          }
        }

        if (
          entity instanceof RocketBoost &&
          otherEntity instanceof MainCharacter
        ) {
          if (this.entitiesOverlap(entity, otherEntity)) {
            this.rocketBoostIsActive = true;
            this.entities.splice(this.entities.indexOf(entity), 1);
          }
        }

        if (
          entity instanceof StarBoost &&
          otherEntity instanceof MainCharacter
        ) {
          if (this.entitiesOverlap(entity, otherEntity)) {
            this.starBoostIsActive = true;
            this.entities.splice(this.entities.indexOf(entity), 1);
          }
        }
      }
    }

    // check if MainCharacter collides with the bottom of the canvas
    if (
      this.mainCharacter.getPosition().y + this.mainCharacter.getSize().y >=
      height
    ) {
      for (let platform of this.entities) {
        this.mainCharacter.getVelocity().y = -4.9;
        platform.getPosition().y -= 17;
        this.mainCharacter.getPosition().y += 1.62;
        setTimeout(() => (game.activeScene = "end"), 700);
      }
      for (let rocketBoost of this.rocketBoosts) {
        rocketBoost.getPosition().y -= 17;
      }
    }
  }

  private generateEnemy() {
    if (this.canGenerateEnemy === true) {
      let x = random(0, width - 220);
      let y = height;
      let position = createVector(x, y);
      let enemy = new Enemy(position);
      this.entities.push(enemy);
      this.canGenerateEnemy = false;
    } else {
      return;
    }
  }

  private generateBalloonBoost() {
    if (this.canGenerateBalloonBoost === true) {
      let x = random(0, width - 220);
      let y = 720;
      let position = createVector(x, y);
      let balloonBoost = new BalloonBoost(position);
      this.balloonBoosts.push(balloonBoost);
      this.canGenerateBalloonBoost = false;
    } else {
      return;
    }
  }

  private generateStarBoost() {
    if (this.canGenerateStarBoost === true) {
      let x = random(0, width - 220);
      let y = height;
      let position = createVector(x, y);
      let starBoost = new StarBoost(position);
      this.starBoosts.push(starBoost);
      this.canGenerateStarBoost = false;
    } else {
      return;
    }
  }

  private updateStarBoosts() {
    if (this.canGenerateStarBoost === true) {
      for (let i = 0; i < this.starBoosts.length; i++) {
        let starBoost = this.starBoosts[i];
        if (starBoost.getPosition().y > height) {
          this.starBoosts.splice(i, 1);
          let x = random(0, width - 220);
          let position = createVector(x, 0);
          let newStarBoost = new StarBoost(position);
          this.starBoosts.push(newStarBoost);
          this.canGenerateStarBoost = false;
        } else {
          return;
        }
      }
    }
  }

  private generateRocketBoost() {
    if (this.canGenerateRocketBoost === true) {
      let x = random(0, width - 220);
      let y = -150;
      let position = createVector(x, y);
      let rocketBoost = new RocketBoost(position);
      this.rocketBoosts.push(rocketBoost);
      this.canGenerateRocketBoost = false;
    } else {
      return;
    }
  }
  private updateEnemies() {
    if (this.canGenerateEnemy === true) {
      // for (let i = 0; i < this.enemies.length; i++) {
      //   let enemy = this.enemies[i];
      //   if (enemy.getPosition().y > height) {
      //     this.enemies.splice(i, 1);
      //     let x = random(0, width - 220);
      //     let position = createVector(x, 0);
      //     let newEnemy = new Enemy(position);
      //     this.enemies.push(newEnemy);
      //     this.canGenerateEnemy = false;
      //   } else {
      //     return;
      //   }
      // }
    }
  }

  // creates a platform at the start of the game that spawns below Bumpy
  private generateBottomPlatform() {
    let y = height;
    let position = createVector(200, y - 150);
    let platform = new Platform(position);
    this.entities.push(platform);
  }
  private updateBalloonBoosts() {
    if (this.canGenerateBalloonBoost === true) {
      for (let i = 0; i < this.balloonBoosts.length; i++) {
        let balloonBoost = this.balloonBoosts[i];
        if (balloonBoost.getPosition().y < height) {
          this.balloonBoosts.splice(i, 1);
          let x = random(0, width - 220);
          let position = createVector(x, 720);
          let newBalloonBoost = new BalloonBoost(position);
          this.balloonBoosts.push(newBalloonBoost);
          this.canGenerateBalloonBoost = false;
        } else {
          return;
        }
      }
    }
  }

  private updateRocketBoosts() {
    if (this.canGenerateRocketBoost === true) {
      for (let i = 0; i < this.rocketBoosts.length; i++) {
        let rocketBoost = this.rocketBoosts[i];
        if (rocketBoost.getPosition().y < height) {
          this.rocketBoosts.splice(i, 1);
          let x = random(0, width - 220);
          let position = createVector(x, 720);
          let newRocketBoost = new RocketBoost(position);
          this.rocketBoosts.push(newRocketBoost);
          this.canGenerateRocketBoost = false;
        } else {
          return;
        }
      }
    }
  }

  // randomly creates the X position for the platform but makes sure that there is always a 120 px gap
  // between the height of each platform
  private generatePlatforms() {
    let y = height;
    while (y > 0) {
      // prevents the platforms from being spawned partially "out of bounds"
      let x = random(0, width - 220);
      let position = createVector(x, y);
      let platform = new Platform(position);
      this.entities.push(platform);
      y -= 120;
    }
  }

  private updatePlatforms() {
    // a for each loop that removes a platform if y is lower than 0 and pushes a new one
    // and keeps track of the score by increasing it for each platform that reaches the bottom
    // and gets removed plus adds a multiplier for the score that makes the platform award
    // a higher score the further that the player gets in the game
    for (let i = 0; i < this.entities.length; i++) {
      let platform = this.entities[i];
      if (platform.getPosition().y > height) {
        this.entities.splice(i, 1);
        let x = random(0, width - 220);
        let position = createVector(x, 0);
        let newPlatform = new Platform(position);
        this.entities.push(newPlatform);
        this.score += 1 * this.scoreMultiplier;
        this.timeSinceLastMultiplierIncrease += 1;
        console.log(this.timeSinceLastMultiplierIncrease);
        if (this.timeSinceLastMultiplierIncrease === 20) {
          this.canGenerateBalloonBoost = true;
          this.scoreMultiplier += 1;
          this.timeSinceLastMultiplierIncrease = 0;
        }

        if (this.timeSinceLastMultiplierIncrease === 20) {
          this.scoreMultiplier += 1;
          this.timeSinceLastMultiplierIncrease = 0;
        }
        if (this.timeSinceLastMultiplierIncrease === 10) {
          this.canGenerateEnemy = true;
        }
        if (this.timeSinceLastMultiplierIncrease === 5) {
          this.canGenerateStarBoost = true;
        }
        if (this.timeSinceLastMultiplierIncrease === 1) {
          this.canGenerateRocketBoost = true;
          // this.canGenerateBalloonBoost = true;
        }
      }
    }
  }

  private moveEntities() {
    if (
      this.mainCharacter.getPosition().y < height * 0.5 &&
      this.mainCharacter.getIsJumping()
    ) {
      for (let entity of this.entities) {
        if (entity instanceof MainCharacter) {
          this.mainCharacter.getPosition().y += 6;
        } else {
          entity.getPosition().y += 4.7;
        }
      }
    }
    // Adjusting position/speed of Bumpy and platforms when triggered by RocketBoost-entity
    // TODO: remove enemies and other boosts from spawning during duration of boost
    if (this.rocketBoostIsActive === true) {
      for (let platform of this.entities) {
        this.mainCharacter.getVelocity().y = -4.9;
        platform.getPosition().y += 17;
        this.mainCharacter.getPosition().y += 1.62;
      }
      setTimeout(() => (this.rocketBoostIsActive = false), 1200);
    }

    if (this.balloonBoostIsActive === true) {
      for (let platform of this.entities) {
        this.mainCharacter.getVelocity().y = -4.9;
        platform.getPosition().y += 10;
        this.mainCharacter.getPosition().y += 1.62;
      }
      setTimeout(() => (this.balloonBoostIsActive = false), 1500);
    }

    this.balloonBoosts.forEach(
      (balloonBoost) => (balloonBoost.getPosition().y -= 6)
    );

    if (this.canMoveBalloonBoost === true) {
      this.balloonBoosts.forEach(
        (balloonBoost) => (balloonBoost.getPosition().x -= 1)
      );
      setTimeout(() => (this.canMoveBalloonBoost = false), 4000);
    } else {
      this.balloonBoosts.forEach(
        (balloonBoost) => (balloonBoost.getPosition().x += 1)
      );
      setTimeout(() => (this.canMoveBalloonBoost = true), 4000);
    }

    // if (this.canMoveEnemy === true) {
    //   this.enemies.forEach((enemy) => (enemy.getPosition().x -= 1));
    //   setTimeout(() => (this.canMoveEnemy = false), 2000);
    // } else {
    //   this.enemies.forEach((enemy) => (enemy.getPosition().x += 1));
    //   setTimeout(() => (this.canMoveEnemy = true), 2000);
    // }
  }

  private detectImgChange() {
    if (this.rocketBoostIsActive === true) {
      this.mainCharacter.setImg(images.bumpyRocket_gif);
      this.mainCharacter.setSize(new p5.Vector(153, 175));
    } else {
      this.mainCharacter.setImg(images.bumpy);
      this.mainCharacter.setSize(new p5.Vector(70, 80));
    }
  }

  // Function to track the score of the current game and display it in the top-left corner
  public DisplayScore() {
    fill("#FFFFFF");
    textFont(Fonts.TitanOne);
    textSize(21);
    text("Score: " + this.score, 10, 30);
  }

  public getScore() {
    return this.score;
  }
}
