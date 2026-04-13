import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";
import { getHighScore } from "../highScore";

const SCENE_KEY = "MenuScene";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEY });
  }

  create(): void {
    const centerX = GAME_CONFIG.width / 2;
    const centerY = GAME_CONFIG.height / 2;

    this.add
      .text(centerX, centerY - 60, "JUMPY SQUARE", {
        fontFamily: "monospace",
        fontSize: "36px",
        color: "#06d6a0",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY, "Click or Tap to Start", {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#f1f5f9",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY + 40, "Tap or press space to jump", {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "#94a3b8",
      })
      .setOrigin(0.5);

    const highScore = getHighScore();

    if (highScore > 0) {
      this.add
        .text(centerX, centerY + 90, "High Score: " + String(highScore), {
          fontFamily: "monospace",
          fontSize: "16px",
          color: "#f4a261",
        })
        .setOrigin(0.5);
    }

    this.input.once("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}
