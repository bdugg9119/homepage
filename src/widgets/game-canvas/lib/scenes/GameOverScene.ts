import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";
import { getHighScore, setHighScore } from "../highScore";

type GameOverData = {
  readonly score: number;
};

const SCENE_KEY = "GameOverScene";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEY });
  }

  create(data: GameOverData): void {
    const centerX = GAME_CONFIG.width / 2;
    const centerY = GAME_CONFIG.height / 2;
    const { score } = data;
    const previousHigh = getHighScore();
    const isNewHighScore = score > previousHigh;

    if (isNewHighScore) {
      setHighScore(score);
    }

    this.add
      .text(centerX, centerY - 80, "GAME OVER", {
        fontFamily: "monospace",
        fontSize: "32px",
        color: "#f1f5f9",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 30, "Score: " + String(score), {
        fontFamily: "monospace",
        fontSize: "22px",
        color: "#06d6a0",
      })
      .setOrigin(0.5);

    const highScoreValue = isNewHighScore ? score : previousHigh;

    this.add
      .text(centerX, centerY + 10, "High Score: " + String(highScoreValue), {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#f4a261",
      })
      .setOrigin(0.5);

    if (isNewHighScore) {
      this.add
        .text(centerX, centerY + 45, "New High Score!", {
          fontFamily: "monospace",
          fontSize: "14px",
          color: "#f4a261",
        })
        .setOrigin(0.5);
    }

    this.add
      .text(centerX, centerY + 90, "Click or Tap to Play Again", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#94a3b8",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}
