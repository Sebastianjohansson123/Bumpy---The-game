interface IGameBoard {
score:number;
}

class GameBoard implements IGameBoard {
  private game: IGame;
  private mainCharacter: MainCharacter;
  private platforms: Platform[];
  public score: number;
  private scoreMultiplier: number = 1;
  private timeSinceLastMultiplierIncrease: number = 0;
  private enemies: Enemy[];
  private enemyBoss: EnemyBoss[];
  private canGenerateEnemy: boolean;
  private canGenerateEnemyBoss: boolean;
  private canGenerateBalloonBoost: boolean;
  private canGenerateRocketBoost: boolean;
  private canGenerateStarBoost: boolean;
  private currentBackgroundIndex: number = 0;
  private nextBackgroundIndex: number;
  private canMoveEnemy: boolean = false;
  private canMoveBalloonBoost: boolean = false;
  private balloonBoosts: BalloonBoost[];
  private rocketBoosts: RocketBoost[];
  private starBoosts: StarBoost[];
  private isBalloonBoostActive: boolean;
  private isRocketBoostActive: boolean;
  private isStarBoostActive: boolean;
  private transitionStartTime: number;
  private transitionDuration: number;
  private bossAlreadyGenerated: boolean;
  private powerUpAlreadyGenerated: boolean;
  private gameOver: boolean;
  private gameOverAnimationTimeout: number;
  private soundAlreadyPlaying: boolean;

  constructor(game: IGame) {
    this.game = game;
    this.mainCharacter = new MainCharacter(this);
    this.platforms = [];
    this.enemyBoss = [];
    this.enemies = [];
    this.balloonBoosts = [];
    this.balloonBoosts = [];
    this.rocketBoosts = [];
    this.starBoosts = [];
    this.score = 0;
    this.generateBottomPlatform();
    this.generatePlatforms();
    this.canGenerateEnemy = false;
    this.canGenerateEnemyBoss = false;
    this.bossAlreadyGenerated = false;
    this.canGenerateBalloonBoost = false;
    this.canGenerateRocketBoost = false;
    this.isRocketBoostActive = false;
    this.isBalloonBoostActive = false;
    this.soundAlreadyPlaying = false;
    this.currentBackgroundIndex = 0;
    this.nextBackgroundIndex = 0;
    this.transitionStartTime = 0;
    this.transitionDuration = 0;
    sounds.song.loop();
    this.canGenerateStarBoost = false;
    this.isStarBoostActive = false;
    this.powerUpAlreadyGenerated = false;
    this.gameOver = false;
    this.gameOverAnimationTimeout = 2000;
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
    this.detectImgChange();
    this.updateStarBoosts();
    this.generateStarBoost();
    this.filterPowerUps();
    this.runGameOverAnimation();
  }

  public draw() {
    this.drawBackground();
    this.platforms.forEach((platform) => platform.draw());
    this.enemies.forEach((enemy) => enemy.draw());
    this.enemyBoss.forEach((enemyBoss) => enemyBoss.draw());
    this.balloonBoosts.forEach((balloonBoost) => balloonBoost.draw());
    this.rocketBoosts.forEach((rocketBoost) => rocketBoost.draw());
    this.starBoosts.forEach((starBoost) => starBoost.draw());
    this.mainCharacter.draw();
    this.displayScore();
  }

  // Checks if the score is above a certain threshold, then increases the backgroundindex which draws
  // a new background image. Can be expanded with additional bgimages and added transition effects
  private drawBackground() {
    if (this.timeSinceLastMultiplierIncrease === 28) {
      this.nextBackgroundIndex =
        (this.currentBackgroundIndex + 1) % images.backgrounds.length;
      this.transitionStartTime = millis();
      this.transitionDuration = 1000; // transition lasts 1 second
    }

    if (this.nextBackgroundIndex !== this.currentBackgroundIndex) {
      let elapsedTime = millis() - this.transitionStartTime;
      let t = constrain(elapsedTime / this.transitionDuration, 0, 1);
      let oldBackgroundOpacity = (1 - t) * 255;
      let newBackgroundOpacity = t * 255;
      push();
      tint(255, oldBackgroundOpacity);
      image(
        images.backgrounds[this.currentBackgroundIndex],
        0,
        0,
        width,
        height
      );
      pop();
      push();
      tint(255, newBackgroundOpacity);
      image(images.backgrounds[this.nextBackgroundIndex], 0, 0, width, height);
      pop();

      if (elapsedTime >= this.transitionDuration) {
        this.currentBackgroundIndex = this.nextBackgroundIndex;
      }
    } else {
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
  }

  // Detects collisions between entities on the GameBoard
  private detectCollision() {
    // Checks if the MainCharacters gets in contact with the platform
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

    // Check if MainCharacter collides with the bottom of the canvas
    if (
      this.mainCharacter.getPosition().y + this.mainCharacter.getSize().y >=
      height
    ) {
      this.gameOver = true;
    }

    // Checks if bubble collides with an enemy
    // If they collide, enemy and bubble dissappears and 100 is added to the score
    for (let enemy of this.enemies) {
      for (let bubble of this.mainCharacter.bubbles) {
        if (
          bubble.getPosition().x <
            enemy.getPosition().x + enemy.getSize().x - 20 &&
          bubble.getPosition().x + bubble.getSize().x > enemy.getPosition().x &&
          bubble.getPosition().y <
            enemy.getPosition().y + enemy.getSize().y - 20 &&
          bubble.getPosition().y + bubble.getSize().y > enemy.getPosition().y
        ) {
          sounds.enemyDeath.play();

          this.mainCharacter.bubbles.splice(
            this.mainCharacter.bubbles.indexOf(bubble),
            1
          );
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
          this.score += 100;
        }
      }
    }
    // Checks if bubble collides with enemyBoss
    // If they collide, enemy and bubble dissappears and 500 is added to the score
    for (let enemyBoss of this.enemyBoss) {
      for (let bubble of this.mainCharacter.bubbles) {
        if (
          bubble.getPosition().x <
            enemyBoss.getPosition().x + enemyBoss.getSize().x - 20 &&
          bubble.getPosition().x + bubble.getSize().x >
            enemyBoss.getPosition().x &&
          bubble.getPosition().y <
            enemyBoss.getPosition().y + enemyBoss.getSize().y - 20 &&
          bubble.getPosition().y + bubble.getSize().y >
            enemyBoss.getPosition().y
        ) {
          sounds.bossDeathSound.play();

          this.mainCharacter.bubbles.splice(
            this.mainCharacter.bubbles.indexOf(bubble),
            1
          );
          this.enemyBoss.splice(this.enemyBoss.indexOf(enemyBoss), 1);
          this.score += 500;
        }
      }
    }

    // Checks if an enemy collides with mainCharacter
    // If isStarBoostActive = false and they collide: active scene is set to "end"
    // If isStarBoostActive = true the enemy dies
    for (let enemy of this.enemies) {
      let distance = dist(
        this.mainCharacter.getPosition().x,
        this.mainCharacter.getPosition().y,
        enemy.getPosition().x,
        enemy.getPosition().y
      );
      if (
        this.isStarBoostActive === false &&
        distance < this.mainCharacter.getSize().x + enemy.getSize().x - 80 &&
        distance < this.mainCharacter.getSize().y + enemy.getSize().y - 70
      ) {
        this.game.activeScene = "end";
      } else if (
        this.isStarBoostActive === true &&
        distance < this.mainCharacter.getSize().x + enemy.getSize().x - 80 &&
        distance < this.mainCharacter.getSize().y + enemy.getSize().y - 70
      ) {
        sounds.enemyDeath.play();
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        this.score += 100;
        this.isStarBoostActive = false;
      }
    }

    // Checks if mainCharacter collides with starBoost and activates it
    for (let starBoost of this.starBoosts) {
      let distance = dist(
        this.mainCharacter.getPosition().x,
        this.mainCharacter.getPosition().y,
        starBoost.getPosition().x,
        starBoost.getPosition().y
      );
      if (
        distance <
          this.mainCharacter.getSize().x + starBoost.getSize().x - 70 &&
        distance < this.mainCharacter.getSize().y + starBoost.getSize().y - 70
      ) {
        this.isStarBoostActive = true;
        sounds.starBoostSound.play();
        this.starBoosts.splice(this.starBoosts.indexOf(starBoost), 1);
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
        this.isStarBoostActive === false &&
        distance <
          this.mainCharacter.getSize().x + enemyBoss.getSize().x - 140 &&
        distance < this.mainCharacter.getSize().y + enemyBoss.getSize().y - 120
      ) {
        this.game.activeScene = "end";
      } else if (
        this.isStarBoostActive === true &&
        distance <
          this.mainCharacter.getSize().x + enemyBoss.getSize().x - 140 &&
        distance < this.mainCharacter.getSize().y + enemyBoss.getSize().y - 120
      ) {
        sounds.enemyDeath.play();
        this.enemyBoss.splice(this.enemyBoss.indexOf(enemyBoss), 1);
        this.score += 100;
        this.isStarBoostActive = false;
        this.score += 500;
      }
    }
    if (this.isStarBoostActive === true) {
      setTimeout(() => {this.isStarBoostActive = false}, 25000);
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
        this.balloonBoosts.splice(this.balloonBoosts.indexOf(balloonBoost), 1);
        this.isBalloonBoostActive = true;
        sounds.balloonSound.play();
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
        this.isRocketBoostActive = true;
        sounds.rocketSound.play();
      }
    }
  }

  private generateEnemy() {
    if (this.canGenerateEnemy === true) {
      let x = random(0, width - 220);
      let y = height - 920;
      let position = createVector(x, y);
      let enemy = new Enemy(position);
      this.enemies.push(enemy);
      this.canGenerateEnemy = false;
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

  private generateEnemyBoss() {
    if (this.canGenerateEnemyBoss === true) {
      let x = random(0, width - 220);
      let y = height - 990;
      let position = createVector(x, y);
      let enemyBoss = new EnemyBoss(position);
      this.enemyBoss.push(enemyBoss);
      this.canGenerateEnemyBoss = false;
      this.bossAlreadyGenerated = true;
    } else {
      return;
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
        } else {
          return;
        }
      }
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

  // creates a platform at the start of the game that spawns below Bumpy
  private generateBottomPlatform() {
    let y = height;
    let position = createVector(200, y - 150);
    let platform = new Platform(position);
    this.platforms.push(platform);
  }

  // creates a platform at the start of the game that spawns below Bumpy

  // randomly creates the X position for the platform but makes sure that there is always a 120 px gap
  // between the height of each platform
  private generatePlatforms() {
    let y = height;
    while (y > 0) {
      // Prevents the platforms from being spawned partially "out of bounds"
      let x = random(0, width - 220);
      let position = createVector(x, y);
      let platform = new Platform(position);
      this.platforms.push(platform);
      y -= random(90, 135);
    }
  }

  private updatePlatforms() {
    // A for each loop that removes a platform if y is lower than 0 and pushes a new one
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

        if (this.timeSinceLastMultiplierIncrease === 30) {
          this.scoreMultiplier += 1;
          this.timeSinceLastMultiplierIncrease = 0;
        }
        if (this.timeSinceLastMultiplierIncrease === 10) {
          this.canGenerateEnemy = true;
        }
        if (this.timeSinceLastMultiplierIncrease === 2) {
          this.powerUpAlreadyGenerated = false;
        }
        if (this.timeSinceLastMultiplierIncrease === 15 && this.score > 3000) {
          this.bossAlreadyGenerated = false;
        }
        if (this.timeSinceLastMultiplierIncrease === 25 && this.score > 3000) {
          this.canGenerateEnemyBoss = true;
        }
        if (
          this.scoreMultiplier === 10 &&
          this.bossAlreadyGenerated === false
        ) {
          this.canGenerateEnemyBoss = true;
        }
      }
    }
  }

  private filterPowerUps() {
    if (
      this.timeSinceLastMultiplierIncrease === 15 &&
      this.powerUpAlreadyGenerated === false
    ) {
      let powerUpsNumber: number = Math.random();
      if (powerUpsNumber < 0.4) {
        this.canGenerateBalloonBoost = true;
        this.powerUpAlreadyGenerated = true;
      }
      if (powerUpsNumber < 0.7 && powerUpsNumber > 0.4) {
        this.canGenerateRocketBoost = true;
        this.powerUpAlreadyGenerated = true;
      }
      if (powerUpsNumber > 0.7) {
        this.canGenerateStarBoost = true;
        this.powerUpAlreadyGenerated = true;
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
      for (let starBoost of this.starBoosts) {
        starBoost.getPosition().y += 4.7;
        this.mainCharacter.getPosition().y += 0.5;
      }
    }
    // Adjusting position/speed of Bumpy and platforms when triggered by RocketBoost-entity
    if (this.isRocketBoostActive === true) {
      for (let platform of this.platforms) {
        this.mainCharacter.getVelocity().y = -4.9;
        platform.getPosition().y += 20;
        this.mainCharacter.getPosition().y += 0.5;
      }
      setTimeout(() => (this.isRocketBoostActive = false), 1200);
    }

    if (this.isBalloonBoostActive === true) {
      for (let platform of this.platforms) {
        this.mainCharacter.getVelocity().y = -4.9;
        platform.getPosition().y += 10;
        this.mainCharacter.getPosition().y += 0.5;
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

  private detectImgChange() {
    if (this.isRocketBoostActive === true) {
      this.mainCharacter.setImg(images.bumpyRocket_gif);
      this.mainCharacter.setSize(new p5.Vector(110, 200));
    } else if (this.isBalloonBoostActive === true) {
      this.mainCharacter.setImg(images.bumpyBalloons_gif);
      this.mainCharacter.setSize(new p5.Vector(140, 160));
    } else if (this.isStarBoostActive === true) {
      this.mainCharacter.setImg(images.bumpyStar_gif);
      this.mainCharacter.setSize(new p5.Vector(70, 80));
    } else if (this.gameOver === true) {
      this.mainCharacter.setImg(images.bumpyFall_gif);
      this.mainCharacter.setSize(new p5.Vector(240, 210));
      this.mainCharacter.getPosition().x =
        this.mainCharacter.getPosition().x + 2.8;
    } else {
      this.mainCharacter.setImg(images.bumpy);
      this.mainCharacter.setSize(new p5.Vector(70, 80));
    }
  }

  private runGameOverAnimation() {
    if (this.gameOver) {
      this.gameOverAnimationTimeout -= deltaTime;
      for (let platform of this.platforms) {
        this.mainCharacter.getVelocity().y = -4.9;
        platform.getPosition().y -= 17;
        this.mainCharacter.getPosition().y -= 1;
      }
      for (let rocketBoost of this.rocketBoosts) {
        rocketBoost.getPosition().y -= 17;
      }

      if (this.gameOverAnimationTimeout < 0) {
        this.game.activeScene = "end";
      }
      if (this.soundAlreadyPlaying === false) {
        sounds.fallSound.play();
        this.soundAlreadyPlaying = true;
      }
    }
  }

  // Function to track the score of the current game and display it in the top-left corner
  public displayScore() {
    fill("#FFFFFF");
    textAlign(LEFT);
    textFont(Fonts.TitanOne);
    textSize(21);
    text("Score: " + this.score, 10, 30);
  }

  public getScore() {
    return this.score;
  }
}
