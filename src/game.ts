class Game {
  private gameBoard: GameBoard;
  // private endMenu: EndMenu;
  private startMenu: StartMenu;
  private activeScene: "start" | "play" | "end";
  // private highscores: number[];

  constructor() {
    this.gameBoard = new GameBoard();
    this.startMenu = new StartMenu();
    this.activeScene = "play"
  }

  public update() {
    if (this.activeScene === "play") {
      this.gameBoard.update();
    } else if (this.activeScene === "start") {
      this.startMenu.update()
    }
  }
  
  public draw() {
    if (this.activeScene === "play") {
      this.gameBoard.draw();
    } else if (this.activeScene === "start") {
      this.startMenu.draw()
    }
  }


  public startGame() {

  }
}
