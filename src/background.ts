class Background {
    private size: p5.Vector;
    private img: p5.Image;
    private currentBackgroundIndex: number = 0;
    private backgroundChangeScoreIncrement: number = 8;
    private score: number;

    constructor(size: p5.Vector, img: p5.Image) {
        this.size = size;
        this.img = img;
        this.score = 0;
    }

    public update() {}

    public draw() {
        this.drawBackground();
    }

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
}