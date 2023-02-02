/// <reference path="entity.ts"  />
class MainCharacter extends Entity {
  // private isFalling: boolean;
  public isFalling: boolean;
  private isJumping: boolean;
  private speed: number;
  public bubbles: Bubble[];
  private canShoot: boolean | undefined;
  private iGameBoard: IGameBoard;
  constructor(iGameBoard: IGameBoard) {
    super(
      createVector(width * 0.4, height * 0.29),
      createVector(0, 0),
      createVector(0, 0.1),
      createVector(70, 80),
      images.bumpy
    );
    this.isFalling = false;
    this.isJumping = true;
    this.speed = 5;
    this.bubbles = [];
    this.canShoot = true;
    this.iGameBoard = iGameBoard;
  }

  public update() {
    this.bubbles.forEach((bubble) => bubble.update());
    if (this.isJumping) {
      this.velocity.add(this.gravity);
      this.position.add(this.velocity);
      this.position.y += this.velocity.y;
      if (this.position.y + this.size.y >= height) {
        this.position.y = height - this.size.y;
        this.velocity.y = 0;
        this.isJumping = false;
      }
    }
    // Checks if left or right arrow is held down
    // and moves the shape in the designated direction if the conditions are met
    if (keyIsDown(LEFT_ARROW)) {
      this.position.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.position.x += this.speed;
    }
    if (keyIsDown(32)) {
      // Key 32 is Space
      this.shoot();
    }
    if (keyIsDown(UP_ARROW)) {
      this.shoot();
    }

    // Checks if half of the size of the shape is outside of either side of the screen
    // and positions the shape on corresponding side if conditions are met
    this.position.x += this.velocity.x;
    if (this.position.x < 0 - this.size.x * 0.5) {
      this.position.x = width - this.size.x * 0.5;
    } else if (this.position.x > width - this.size.x * 0.5) {
      this.position.x = 0 - this.size.x * 0.5;
    }
  }

  public draw() {
    this.bubbles.forEach((bubble) => bubble.draw());
    image(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }

  public shoot() {
    if (this.canShoot === true && this.iGameBoard.isRocketBoostActive === false
      &&this.iGameBoard.isBalloonBoostActive === false) {
      sounds.bubbleSound.play();
      let bubble = new Bubble(
        createVector(this.position.x + 25, this.position.y)
      );
      this.bubbles.push(bubble);
      this.iGameBoard.score -= 10;
      if (this.iGameBoard.score < 0) {
        this.iGameBoard.score = 0;
      }
    } else {
      return;
    }
    this.canShoot = false;
    setTimeout(() => (this.canShoot = true), 200);
  }

  public jump() {
    sounds.jumpSound.play();
    this.velocity.y = -5;
    this.isJumping = true;
  }

  public getVelocity(): p5.Vector {
    return this.velocity;
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }

  public setSize(size: p5.Vector) {
    this.size = size;
  }

  public getIsJumping() {
    return this.isJumping;
  }

  public getImg() {
    return this.img;
  }

  public setImg(img: p5.Image) {
    this.img = img;
  }
}
