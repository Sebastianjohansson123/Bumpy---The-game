class MainCharacter extends Entity {
  // private isFalling: boolean;
  private isJumping: boolean;
  private speed: number;
  private bullets: Bullet[];
  private canShoot:boolean | undefined;

  constructor(img: string) {
    super()
   //private handleCollisions()
   //private jump()
   //private shoot()
   this.position = createVector(width * 0.4, height * 0.5);
   this.velocity = createVector(0, 0);
   this.gravity = createVector(0, 0.1);
   this.size = createVector(70, 80);
   this.img = loadImage(img);
   this.isJumping = true;
   this.speed = 5;
   this.bullets = [];
   this.canShoot = true;
  }

  public update() {
    this.bullets.forEach(bullet => bullet.update());
    // check if shape is colliding with the bottom of the canvas
    if (this.position.y + this.size.y >= height) {
      // this.jump();
    }
    
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
    if (keyIsDown(UP_ARROW)) {
      this.shoot();
    }


  

// Checks if half of the size of the shape is outside of either side of the screen
// and positions the shape on corresponding side if conditions are met

this.position.x += this.velocity.x;
if (this.position.x < 0 - (this.size.x * 0.5)) {
  this.position.x = width - (this.size.x * 0.5);
} else if (this.position.x > width - (this.size.x * 0.5)) {
  this.position.x = 0 - (this.size.x * 0.5);
} // TODO: separate to own function and reduce repetition
  }

  public draw() {
    this.bullets.forEach(bullet => bullet.draw())
    image(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }

  public shoot() {
    if (this.canShoot === true) {
      bulletSound.play();
      let bullet = new Bullet(this);
      this.bullets.push(bullet);
    } else {
      return;
    }
    this.canShoot = false;
    setTimeout(() => this.canShoot = true, 500);
  }

  public jump() {
    jumpSound.play();
    this.velocity.y = -5;
    this.isJumping = true;
}

  public getVelocity() {
  return this.velocity
  } 

  public getPosition() {
    return this.position
  }

   public getSize() {
    return this.size
  }
  public getIsJumping() {
    return this.isJumping
  }
}
