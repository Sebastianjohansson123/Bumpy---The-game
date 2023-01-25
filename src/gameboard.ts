class GameBoard {
  // private backgrounds: Background[];
  private isGameOver: boolean;
  private mainCharacter: MainCharacter;
  private platforms: Platform[];
  private score: number;
  private scoreMultiplier: number = 1;
  private timeSinceLastMultiplierIncrease: number = 0;
  private enemies: Enemy[];
  private canGenerateEnemy: boolean | undefined;
  private currentBackgroundIndex: number = 0;
  private backgroundChangeScoreIncrement: number = 8;
  private canMoveEnemy: boolean = false;
  // private scoreThreshold: number = 10;

  constructor() {
    this.mainCharacter = new MainCharacter();
    this.isGameOver = false;
    this.platforms = [];
    this.enemies = [];
    this.score = 0;
    this.generatePlatforms();
    this.canGenerateEnemy = false;
  }

  public update() {
    this.mainCharacter.update();
    this.detectCollision();
    this.moveEntities();
    this.updatePlatforms();
    this.updateEnemies();
    // this.moveEnemies();
    this.generateEnemy();
  }

  public draw() {
    this.drawBackground();
    this.platforms.forEach((platform) => platform.draw());
    this.enemies.forEach((enemy) => enemy.draw());
    this.mainCharacter.draw();
    this.getScore();
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
    images.backgrounds[this.currentBackgroundIndex].resize(0, windowHeight);
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
  // checks if the MainCharacters gets in contact with the platform
  // when it is falling and triggers an automatic jump if it is
  private detectCollision() {
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
          console.log("enemy died");
          sounds.enemyDeath.play();

          this.mainCharacter.bullets.splice(
            this.mainCharacter.bullets.indexOf(bullet),
            1
          );
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
          // add death animation or sound effect here
        }
      }
    }
    for (let enemy of this.enemies) {
      let distance = dist(
        this.mainCharacter.getPosition().x,
        this.mainCharacter.getPosition().y,
        enemy.getPosition().x,
        enemy.getPosition().y
      );
      if (
        distance < this.mainCharacter.getSize().x + enemy.getSize().x - 70 &&
        distance < this.mainCharacter.getSize().y + enemy.getSize().y - 70
      ) {
        this.isGameOver = true;
        game.activeScene = "end";
        console.log("Game Over = " + this.isGameOver);
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
        // console.log(this.timeSinceLastMultiplierIncrease);
        if (this.timeSinceLastMultiplierIncrease === 10) {
          this.canGenerateEnemy = true;
          this.scoreMultiplier += 1;
          this.timeSinceLastMultiplierIncrease = 0;
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
    }

    if (this.canMoveEnemy === true) {
      this.enemies.forEach((enemy) => (enemy.getPosition().x -= 1));
      setTimeout(() => (this.canMoveEnemy = false), 2000);
    } else {
      this.enemies.forEach((enemy) => (enemy.getPosition().x += 1));
      setTimeout(() => (this.canMoveEnemy = true), 2000);
    }
  }

  // Function to track the score of the current game and display it in the top-left corner
  public getScore() {
    fill("#FFFFFF");
    textFont(Fonts.TitanOne);
    textSize(21);
    text("Score: " + this.score, 10, 30);
    return this.score;
  }
}
