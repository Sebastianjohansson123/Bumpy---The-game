interface IGame {
  activeScene: "start" | "howtoplay" | "scoreboard" | "play" | "end";
  resetGameBoard: () => void;
}

class Game implements IGame {
  private gameBoard: GameBoard;
  private startMenu: StartMenu;
  private howToPlay: HowToPlay;
  private endMenu: EndMenu;
  private scoreboard: Scoreboard;
  public activeScene: "start" | "howtoplay" | "scoreboard" | "play" | "end";
  private _highscores: number[];


  constructor() {
    this.gameBoard = new GameBoard();
    this.startMenu = new StartMenu(this);
    this.howToPlay = new HowToPlay();
    this.endMenu = new EndMenu();
    this.scoreboard = new Scoreboard();
    this.activeScene = "start";
    let highscoresString = localStorage.getItem("highscores");
    if (highscoresString) {
      this._highscores = JSON.parse(highscoresString);
    } else {
      this._highscores = [0, 0, 0];
    }
  }

  public get highscores(): number[] {
    return this._highscores;
  }

  public update() {
    if (this.activeScene === "start") {
      this.startMenu.update();
    } else if (this.activeScene === "howtoplay") {
      this.howToPlay.update();
    } else if (this.activeScene === "scoreboard") {
      this.scoreboard.update();
    } else if (this.activeScene === "play") {
      this.gameBoard.update();
    } else if (this.activeScene === "end") {
      this.endMenu.update();
      this.updateHighscores();
    }

    if (this.activeScene === "play") {
      if (!sounds.song.pause) {
        sounds.song.play();
      }
    } else if (this.activeScene === "end" || this.activeScene === "howtoplay" || this.activeScene === "start" || this.activeScene === "scoreboard") {
      sounds.song.pause();
    }

  }

  public draw() {
    if (this.activeScene === "start") {
      this.startMenu.draw();
    } else if (this.activeScene === "howtoplay") {
      this.howToPlay.draw();
    } else if (this.activeScene === "scoreboard") {
      this.scoreboard.draw();
    } else if (this.activeScene === "play") {
      this.gameBoard.draw();
    } else if (this.activeScene === "end") {
      this.endMenu.draw();
    }
  }

  private updateHighscores() {
    let currentScore = this.gameBoard.getScore();
    if (this._highscores.indexOf(currentScore) === -1) {
      if (currentScore > this.highscores[2]) {
        this._highscores.pop();
        this._highscores.unshift(currentScore);
        this._highscores.sort(function (a, b) {
          return b - a;
        });
        localStorage.setItem("highscores", JSON.stringify(this._highscores));
      }
    }
    let filteredScore = this._highscores.filter((s) => s !== currentScore);
    if (filteredScore.length < 3) {
      filteredScore.unshift(currentScore);
      filteredScore.sort(function (a, b) {
        return b - a;
      });
      this._highscores = filteredScore;
      localStorage.setItem("highscores", JSON.stringify(this._highscores));
    }
  }

  public setEndMenuScore() {
    return this.gameBoard.getScore();
  }

  public getTopHighscore(): number {
    return this._highscores[0];
  }
  public getSecondHighscore(): number {
    return this._highscores[1];
  }
  public getThirdHighscore(): number {
    return this._highscores[2];
  }
  public resetGameBoard() {
    this.gameBoard = new GameBoard();
  }
}
