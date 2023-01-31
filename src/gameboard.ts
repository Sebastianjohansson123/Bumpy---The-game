class GameBoard {
  // private backgrounds: Background[];
  private mainCharacter: MainCharacter;
  private platforms: Platform[];
  private score: number;
  private scoreMultiplier: number = 1;
  private timeSinceLastMultiplierIncrease: number = 0;
  private enemies: Enemy[];
  private enemyBoss: EnemyBoss[];
  private canGenerateEnemy: boolean | undefined;
  private canGenerateEnemyBoss: boolean | undefined;
  private canGenerateBalloonBoost: boolean | undefined;
  private canGenerateRocketBoost: boolean | undefined;
  private currentBackgroundIndex: number = 0;
  private backgroundChangeScoreIncrement: number = 8;
  private canMoveEnemy: boolean = false;
  private canMoveBalloonBoost: boolean = false;
  private balloonBoosts: BalloonBoost[];
  private rocketBoosts: RocketBoost[];
  private isRocketBoostActive: boolean;
  private isBalloonBoostActive: boolean;
  private bossAlreadyGenerated: boolean;

  constructor() {
    this.mainCharacter = new MainCharacter();
    this.platforms = [];
    this.enemyBoss = [];
    this.enemies = [];
    this.balloonBoosts = [];
    this.balloonBoosts = [];
    this.rocketBoosts = [];
    this.score = 0;
    this.generatePlatforms();
    this.canGenerateEnemy = false;
    this.canGenerateEnemyBoss = false;
    this.bossAlreadyGenerated = false;
    this.canGenerateBalloonBoost = false;
    this.canGenerateRocketBoost = false;
    this.isRocketBoostActive = false;
    this.isBalloonBoostActive = false;
    sounds.song. loop(); 
  }
  public update() {
    this.mainCharacter.update();
    this.detectCollision();
    this.updatePlatforms();
    this.updateEnemies();
    this.generateEnemy();
    this.updateEnemyBoss();
    this.generateEnemyBoss();
    this.updateBalloonBoosts();
    this.generateBalloonBoost();
    this.moveEntities();
    this.updateRocketBoosts();
    this.generateRocketBoost();
  }

  public draw() {
    this.drawBackground();
    this.platforms.forEach((platform) => platform.draw());
    this.enemies.forEach((enemy) => enemy.draw());
    this.enemyBoss.forEach((enemyBoss) => enemyBoss.draw());
    this.balloonBoosts.forEach((balloonBoost) => balloonBoost.draw());
    this.rocketBoosts.forEach((rocketBoost) => rocketBoost.draw());
    this.mainCharacter.draw();
    this.DisplayScore();
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

  // Detects collisions between entities on the GameBoard
  private detectCollision() {
    // checks if the MainCharacters gets in contact with the platform
    // when it is falling and triggers an automatic jump if it is
    for (let platform of this.platforms) {
      if (
        this.mainCharacter.getPosition().y + this.mainCharacter.getSize().y >
          platform.getPosition().y &&
        this.mainCharacter.getPosition().y + this.mainCharacter.getSize().y <
          platform.getPosition().y + platform.getSize().y &&
        this.mainCharacter.getPosition().x +
          this.mainCharacter.getSize().x -
          20 >
          platform.getPosition().x && // added "- 20" to better adjust hitbox
        this.mainCharacter.getPosition().x + 20 <
          platform.getPosition().x + platform.getSize().x && // // added "+ 20" to better adjust hitbox
        this.mainCharacter.getVelocity().y > 0.5
      ) {
        // Makes it so that the MainCharacter only jumps on the platforms if is falling at a certain velocity
        this.mainCharacter.jump();
      }
    }

    // check if MainCharacter collides with the bottom of the canvas
    if (
      this.mainCharacter.getPosition().y + this.mainCharacter.getSize().y >=
      height
    ) {
      for (let platform of this.platforms) {
        this.mainCharacter.getVelocity().y = -4.9;
        platform.getPosition().y -= 17;
        this.mainCharacter.getPosition().y += 1.62;
        setTimeout(() => (game.activeScene = "end"), 700);
      }
      for (let rocketBoost of this.rocketBoosts) {
        rocketBoost.getPosition().y -= 17;
      }
    }

    // Checks if bullet collides with an enemy
    // If they collide, enemy and bullet dissappears and 100 is added to the score
    for (let enemy of this.enemies) {
      for (let bullet of this.mainCharacter.bullets) {
        if (
          bullet.getPosition().x <
            enemy.getPosition().x + enemy.getSize().x - 20 &&
          bullet.getPosition().x + bullet.getSize().x > enemy.getPosition().x &&
          bullet.getPosition().y <
            enemy.getPosition().y + enemy.getSize().y - 20 &&
          bullet.getPosition().y + bullet.getSize().y > enemy.getPosition().y
        ) {
          sounds.enemyDeath.play();

          this.mainCharacter.bullets.splice(
            this.mainCharacter.bullets.indexOf(bullet),
            1
          );
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
          this.score += 100;
        }
      }
    }
    // Checks if bullet collides with enemyBoss
    // If they collide, enemy and bullet dissappears and 500 is added to the score
    for (let enemyBoss of this.enemyBoss) {
      for (let bullet of this.mainCharacter.bullets) {
        if (
          bullet.getPosition().x <
            enemyBoss.getPosition().x + enemyBoss.getSize().x - 20 &&
          bullet.getPosition().x + bullet.getSize().x >
            enemyBoss.getPosition().x &&
          bullet.getPosition().y <
            enemyBoss.getPosition().y + enemyBoss.getSize().y - 20 &&
          bullet.getPosition().y + bullet.getSize().y >
            enemyBoss.getPosition().y
        ) {
          sounds.enemyDeath.play();

          this.mainCharacter.bullets.splice(
            this.mainCharacter.bullets.indexOf(bullet),
            1
          );
          this.enemyBoss.splice(this.enemyBoss.indexOf(enemyBoss), 1);
          this.score += 500;
        }
      }
    }

    // Checks if an enemy collides with mainCharacter
    // If they collide active scene is set to "end"
    for (let enemy of this.enemies) {
      let distance = dist(
        this.mainCharacter.getPosition().x,
        this.mainCharacter.getPosition().y,
        enemy.getPosition().x,
        enemy.getPosition().y
      );
      if (
        distance < this.mainCharacter.getSize().x + enemy.getSize().x - 80 &&
        distance < this.mainCharacter.getSize().y + enemy.getSize().y - 70
      ) {
        game.activeScene = "end";
      }
    }

    // Checks if an enemy collides with mainCharacter
    // If they collide active scene is set to "end"
    for (let enemyBoss of this.enemyBoss) {
      let distance = dist(
        this.mainCharacter.getPosition().x,
        this.mainCharacter.getPosition().y,
        enemyBoss.getPosition().x,
        enemyBoss.getPosition().y
      );
      if (
        distance <
          this.mainCharacter.getSize().x + enemyBoss.getSize().x - 140 &&
        distance < this.mainCharacter.getSize().y + enemyBoss.getSize().y - 120
      ) {
        game.activeScene = "end";
      }
    }

    //Checks if mainCharacter collides with balloonBoost
    for (let balloonBoost of this.balloonBoosts) {
      let distance = dist(
        this.mainCharacter.getPosition().x,
        this.mainCharacter.getPosition().y,
        balloonBoost.getPosition().x,
        balloonBoost.getPosition().y
      );
      if (
        distance <
          this.mainCharacter.getSize().x + balloonBoost.getSize().x - 70 &&
        distance <
          this.mainCharacter.getSize().y + balloonBoost.getSize().y - 70
      ) {
        console.log("balloon boost");
        this.balloonBoosts.splice(this.balloonBoosts.indexOf(balloonBoost), 1);
        this.isBalloonBoostActive = true;
        this.score += 100;
      }
    }
    //Checks if mainCharacter collides with rocketBoost
    for (let rocketBoost of this.rocketBoosts) {
      let distance = dist(
        this.mainCharacter.getPosition().x,
        this.mainCharacter.getPosition().y,
        rocketBoost.getPosition().x,
        rocketBoost.getPosition().y
      );
      if (
        distance <
          this.mainCharacter.getSize().x + rocketBoost.getSize().x - 70 &&
        distance < this.mainCharacter.getSize().y + rocketBoost.getSize().y - 70
      ) {
        this.rocketBoosts.splice(this.rocketBoosts.indexOf(rocketBoost), 1);
        // this.score += 100;
        this.isRocketBoostActive = true;
      }
    }
  }

  private generateEnemy() {
    if (this.canGenerateEnemy === true) {
      let x = random(0, width - 220);
      let y = height;
      let position = createVector(x, y);
      let enemy = new Enemy(position);
      this.enemies.push(enemy);
      this.canGenerateEnemy = false;
    } else {
      return;
    }
  }

  private generateEnemyBoss() {
    if (this.canGenerateEnemyBoss === true) {
      let x = random(0, width - 220);
      let y = height;
      let position = createVector(x, y);
      let enemyBoss = new EnemyBoss(position);
      this.enemyBoss.push(enemyBoss);
      this.canGenerateEnemyBoss = false;
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
      for (let i = 0; i < this.enemies.length; i++) {
        let enemy = this.enemies[i];
        if (enemy.getPosition().y > height) {
          this.enemies.splice(i, 1);
          let x = random(0, width - 220);
          let position = createVector(x, 0);
          let newEnemy = new Enemy(position);
          this.enemies.push(newEnemy);
          this.canGenerateEnemy = false;
        } else {
          return;
        }
      }
    }
  }

  private updateEnemyBoss() {
    if (this.canGenerateEnemyBoss === true) {
      for (let i = 0; i < this.enemyBoss.length; i++) {
        let enemyBoss = this.enemyBoss[i];
        if (enemyBoss.getPosition().y > height) {
          this.enemyBoss.splice(i, 1);
          let x = random(0, width - 220);
          let position = createVector(x, 0);
          let newEnemyBoss = new EnemyBoss(position);
          this.enemyBoss.push(newEnemyBoss);
          this.canGenerateEnemyBoss = false;
          this.bossAlreadyGenerated = true;
          console.log("BOSS TIME")
        } else {
          return;
        }
      }
    }
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
      this.platforms.push(platform);
      y -= 120;
    }
  }

  private updatePlatforms() {
    // a for each loop that removes a platform if y is lower than 0 and pushes a new one
    // and keeps track of the score by increasing it for each platform that reaches the bottom
    // and gets removed plus adds a multiplier for the score that makes the platform award
    // a higher score the further that the player gets in the game
    for (let i = 0; i < this.platforms.length; i++) {
      let platform = this.platforms[i];
      if (platform.getPosition().y > height) {
        this.platforms.splice(i, 1);
        let x = random(0, width - 220);
        let position = createVector(x, 0);
        let newPlatform = new Platform(position);
        this.platforms.push(newPlatform);
        this.score += 1 * this.scoreMultiplier;
        this.timeSinceLastMultiplierIncrease += 1;
        console.log(this.timeSinceLastMultiplierIncrease);
        if (this.timeSinceLastMultiplierIncrease === 20) {
          this.canGenerateBalloonBoost = true;
          this.scoreMultiplier += 1;
          this.timeSinceLastMultiplierIncrease = 0;
        }
        if (this.timeSinceLastMultiplierIncrease === 10) {
          this.canGenerateEnemy = true;
          // this.canGenerateBalloonBoost = true;
        }
        if (this.timeSinceLastMultiplierIncrease === 15 && this.score > 8000) {
          this.bossAlreadyGenerated = false;
        }
        if (this.timeSinceLastMultiplierIncrease === 19 && this.score > 8000) {
          this.canGenerateEnemyBoss = true;
        }
        if (this.timeSinceLastMultiplierIncrease === 1) {
          this.canGenerateRocketBoost = true;
          // this.canGenerateBalloonBoost = true;
        }
        if (this.scoreMultiplier === 20 && this.bossAlreadyGenerated === false) {
          this.canGenerateEnemyBoss = true;
        }
      }
    }
  }

  private moveEntities() {
    if (
      this.mainCharacter.getPosition().y < height * 0.5 &&
      this.mainCharacter.getIsJumping()
    ) {
      for (let platform of this.platforms) {
        platform.getPosition().y += 4.7;
        this.mainCharacter.getPosition().y += 0.5;
      }
      for (let enemy of this.enemies) {
        enemy.getPosition().y += 4.7;
        this.mainCharacter.getPosition().y += 0.5;
      }
      for (let enemyBoss of this.enemyBoss) {
        enemyBoss.getPosition().y += 4.7;
        this.mainCharacter.getPosition().y += 0.5;
      }
      for (let balloonBoost of this.balloonBoosts) {
        balloonBoost.getPosition().y += 4.7;
        this.mainCharacter.getPosition().y += 0.5;
      }
      for (let rocketBoost of this.rocketBoosts) {
        rocketBoost.getPosition().y += 4.7;
        this.mainCharacter.getPosition().y += 0.5;
      }
    }
    // Adjusting position/speed of Bumpy and platforms when triggered by RocketBoost-entity
    // TODO: remove enemies and other boosts from spawning during duration of boost
    if (this.isRocketBoostActive === true) {
      for (let platform of this.platforms) {
        this.mainCharacter.getVelocity().y = -4.9;
        platform.getPosition().y += 17;
        this.mainCharacter.getPosition().y += 1.62;
      }
      setTimeout(() => (this.isRocketBoostActive = false), 1200);
    }

    if (this.isBalloonBoostActive === true) {
      for (let platform of this.platforms) {
        this.mainCharacter.getVelocity().y = -4.9;
        platform.getPosition().y += 10;
        this.mainCharacter.getPosition().y += 1.62;
      }
      setTimeout(() => (this.isBalloonBoostActive = false), 1500);
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

    if (this.canMoveEnemy === true) {
      this.enemies.forEach((enemy) => (enemy.getPosition().x -= 1));
      this.enemyBoss.forEach((enemyBoss) => (enemyBoss.getPosition().x -= 3));
      setTimeout(() => (this.canMoveEnemy = false), 2000);
    } else {
      this.enemies.forEach((enemy) => (enemy.getPosition().x += 1));
      this.enemyBoss.forEach((enemyBoss) => (enemyBoss.getPosition().x += 3));
      setTimeout(() => (this.canMoveEnemy = true), 2000);
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
