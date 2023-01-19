class Platform extends Entity {
  // private breakable: boolean;
  // private moveable: boolean;

  constructor(x: number, y: number, width: number, height: number, img: string) {
    super()
    this.position = createVector(x, y);
    this.size = createVector(width/2, height);
    this.img = loadImage(img);
  }

  public draw() {
    image(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public getSize(): p5.Vector {
    return this.size;
  }

}