class Game {
  private gameBoard: GameBoard;
  // private endMenu: EndMenu;
  // private startMenu: StartMenu;
  // private activeScene: string;
  // private highscores: number[];

  constructor() {
    this.gameBoard = new GameBoard;
  }

  public update() {
    this.gameBoard.update();
  }

  public draw() {
    this.gameBoard.draw();
  }


  public startGame() {

  }
}
