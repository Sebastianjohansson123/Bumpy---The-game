class Game {
  private gameBoard: GameBoard;
  private startMenu: StartMenu;
  private endMenu: EndMenu;
  private activeScene: "start" | "play" | "end";
  // private highscores: number[];

  constructor() {
    this.gameBoard = new GameBoard();
    this.startMenu = new StartMenu();
    this.endMenu = new EndMenu();
    this.activeScene = "end"
  }
  
  public update() {
    if (this.activeScene === "play") {
      this.gameBoard.update();
    } else if (this.activeScene === "start") {
      this.startMenu.update();
    }
    else if (this.activeScene === "end") {
      this.endMenu.update();
    }
  }
  
  public draw() {
    if (this.activeScene === "play") {
      this.gameBoard.draw();
    } else if (this.activeScene === "start") {
      this.startMenu.draw()
    }
    else if (this.activeScene === "end") {
      this.endMenu.draw();
    }
  }


  public startGame() {

  }
}
