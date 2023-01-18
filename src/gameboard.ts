class GameBoard {
  // private entities: entity [];
  // private backgrounds: Background[];
  // private: number;
  // private isGameOver: boolean;
  private shape: MainCharacter;
  private platforms: Platform[];

  constructor() {
    this.shape = new MainCharacter("./assets/images/bumpy.png");
    this.platforms = [], new Platform(50, 50, 100, 100, "./assets/images/platform.png");
    this.spawnPlatforms();
  }

  public update() {
    this.shape.update();
    this.detectCollision();
  }

  public draw() {
    this.shape.draw();
    this.platforms;
    this.platforms.forEach(platform => platform.draw());
  }

  // checks if the shape(the moving rectangle) gets in contact with the upper part of
  // the platforms and triggers an automatic jump if it does
  private detectCollision() {
    for (let platform of this.platforms) {
      if (this.shape.getPosition().y + this.shape.getSize().y > platform.getPosition().y 
          && this.shape.getPosition().y + this.shape.getSize().y < platform.getPosition().y + platform.getSize().y
          && (this.shape.getPosition().x + this.shape.getSize().x > platform.getPosition().x 
              && this.shape.getPosition().x < platform.getPosition().x + platform.getSize().x)) {
        this.shape.jump();
      }
    }
  }
  // randomly creates the X position for the platform but makes sure that there is always a 200 px gap
  // between the height of each platform
  private spawnPlatforms() {
    let y = height -120;
    while (y > 0) {
      // prevents the platforms from being spawned partially "out of bounds"
      let x = random(0, width - 220);
      let platform = new Platform(x, y, 220, 20, "./assets/images/platform.png");
      this.platforms.push(platform);
      y -= 200;
    }
  }

}