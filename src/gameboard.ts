class GameBoard {
  // private entities: entity [];
  // private backgrounds: Background[];
  // private isGameOver: boolean;
  private shape: MainCharacter;
  private platforms: Platform[];
  private score: number;
  private scoreMultiplier: number = 1;
  private timeSinceLastMultiplierIncrease: number = 0;
  private enemies: Enemy1[];

  constructor() {
    this.shape = new MainCharacter("./assets/images/bumpy.png");
    (this.platforms = []),
      new Platform(50, 50, 100, 100, "./assets/images/platform.png");
    (this.enemies = []), new Enemy1(50, 50, 50, 50, images.enemy);
    this.score = 0;
    this.generatePlatforms();
    this.generateEnemy();
  }

  // git config --global --list
  // git config --global user.name "David Jensen"
  // git config --global user.email mail@mail.com

  public update() {
    this.shape.update();
    this.detectCollision();
    this.movePlatforms();
    this.updatePlatforms();
  }

  public draw() {
    this.drawBackground();
    this.shape.draw();
    this.getScore();
    this.platforms.forEach((platform) => platform.draw());
    this.enemies.forEach((enemy) => enemy.draw());
  }

  // repeats the background image
  // can possibly be adjusted later on to include different backgrounds depending on the height
  private drawBackground() {
    bg.resize(0, windowHeight);
    let repeatCount = height / bg.height + 1;
    for (let i = 0; i < repeatCount; i++) {
      image(bg, 0, i * bg.height);
    }
  }

  // checks if the MainCharacters gets in contact with the platform
  // when it is falling and triggers an automatic jump if it is
  private detectCollision() {
    for (let platform of this.platforms) {
      if (
        this.shape.getPosition().y + this.shape.getSize().y >
          platform.getPosition().y &&
        this.shape.getPosition().y + this.shape.getSize().y <
          platform.getPosition().y + platform.getSize().y &&
        this.shape.getPosition().x + this.shape.getSize().x - 20 >
          platform.getPosition().x && // added "- 20" to better adjust hitbox
        this.shape.getPosition().x + 20 <
          platform.getPosition().x + platform.getSize().x && // // added "+ 20" to better adjust hitbox
        this.shape.getVelocity().y > 0.5
      ) {
        // Makes it so that the MainCharacter only jumps on the platforms if is falling at a certain velocity
        this.shape.jump();
      }
    }
  }

  private generateEnemy() {
    let y = height;
    while (y > 0) {
      let x = random(0, width - 220);
      let enemy = new Enemy1(x, y, 150, 100, images.enemy);
      this.enemies.push(enemy);
      y -= 450;
    }
  }

  // randomly creates the X position for the platform but makes sure that there is always a 120 px gap
  // between the height of each platform
  private generatePlatforms() {
    let y = height;
    while (y > 0) {
      // prevents the platforms from being spawned partially "out of bounds"
      let x = random(0, width - 220);
      let platform = new Platform(
        x,
        y,
        220,
        20,
        "./assets/images/platform.png"
      );
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
        let newPlatform = new Platform(
          x,
          0,
          220,
          20,
          "./assets/images/platform.png"
        );
        this.platforms.push(newPlatform);
        this.score += 1 * this.scoreMultiplier;
        this.timeSinceLastMultiplierIncrease += 1;
        if (this.timeSinceLastMultiplierIncrease >= 10) {
          this.scoreMultiplier += 1;
          this.timeSinceLastMultiplierIncrease = 0;
        }
      }
    }
  }

  private movePlatforms() {
    if (
      this.shape.getPosition().y < height * 0.5 &&
      this.shape.getIsJumping()
    ) {
      for (let platform of this.platforms) {
        platform.getPosition().y += 4.7;
        this.shape.getPosition().y += 0.5;
      }
    }
  }

  // Function to track the score of the current game and display it in the top-left corner
  private getScore() {
    fill(0);
    textSize(21);
    text("Score: " + this.score, 10, 30);
  }
}
