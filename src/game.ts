class Game {
  private gameBoard: GameBoard;
  private startMenu: StartMenu;
  private howToPlay: HowToPlay;
  private endMenu: EndMenu;
  private activeScene: "start" | "howtoplay" | "play" | "end";
  private _highscore: number;

  constructor() {
    this.gameBoard = new GameBoard();
    this.startMenu = new StartMenu();
    this.howToPlay = new HowToPlay();
    this.endMenu = new EndMenu(this.gameBoard.getScore());
    this.activeScene = "end";
    this._highscore = Number(localStorage.getItem("highscore")) || 0;
  }
  
  public get highscore(): number {
    return this._highscore;
  }
  public update() {
    if (this.gameBoard.getScore() > this.highscore) {
      this._highscore = this.gameBoard.getScore();
      localStorage.setItem("highscore", this.highscore.toString());
    }
    // PLATSHÅLLARE
    if (keyIsPressed && key === "1"){
      this.activeScene = "play"
    }
    if (keyIsPressed && key === "2"){
      this.activeScene = "end"
    }
    //
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
      this.updateScore();
    } else if (this.activeScene === "start") {
      this.startMenu.draw()
    } else if (this.activeScene === "howtoplay") {
      this.howToPlay.draw()
    }
    else if (this.activeScene === "end") {
      this.endMenu.draw();
    }
  }

  public updateScore() {
    this.endMenu.setScore(this.gameBoard.getScore());
  }

  public getHighscore(): number {
    return this.highscore;
}
}
