abstract class Entity {
  // private images: p5.Image[]; 
  protected position: p5.Vector;
  protected velocity: p5.Vector;
  protected gravity: p5.Vector;
  protected size: p5.Vector;
  protected img: p5.Image;

  constructor() {
    this.position = new p5.Vector;
    this.velocity = new p5.Vector;
    this.gravity = new p5.Vector;
    this.size = new p5.Vector;
    this.img = new p5.Image(0, 0);
  }  
  
  public update(){
      
    } 
    
  public draw() {

    }
    
    
}