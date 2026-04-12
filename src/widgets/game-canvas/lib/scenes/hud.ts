import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";
import { getHighScore, setHighScore } from "../highScore";

export type GameHud = {
  scoreText: Phaser.GameObjects.Text;
  highScoreText: Phaser.GameObjects.Text;
  highScore: number;
  hasNewHighScore: boolean;
};

export function createGameHud(scene: Phaser.Scene): GameHud {
  const scoreText = scene.add
    .text(GAME_CONFIG.width / 2, 30, "0", {
      fontFamily: "monospace",
      fontSize: "20px",
      color: "#f1f5f9",
    })
    .setOrigin(0.5)
    .setDepth(10);

  const highScore = getHighScore();
  const highScoreText = scene.add
    .text(GAME_CONFIG.width - 10, 30, "HI " + String(highScore), {
      fontFamily: "monospace",
      fontSize: "14px",
      color: "#f4a261",
    })
    .setOrigin(1, 0.5)
    .setDepth(10);

  return { scoreText, highScoreText, highScore, hasNewHighScore: false };
}

export function updateHudScore(scene: Phaser.Scene, hud: GameHud, score: number): void {
  hud.scoreText.setText(String(score));

  if (!hud.hasNewHighScore && score > hud.highScore) {
    hud.hasNewHighScore = true;
    hud.highScore = score;
    setHighScore(score);
    hud.highScoreText.setText("HI " + String(score));
    hud.highScoreText.setColor("#06d6a0");
    showNewHighScoreBanner(scene);
  } else if (hud.hasNewHighScore) {
    hud.highScore = score;
    setHighScore(score);
    hud.highScoreText.setText("HI " + String(score));
  }
}

function showNewHighScoreBanner(scene: Phaser.Scene): void {
  const banner = scene.add
    .text(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2, "NEW HIGH SCORE!", {
      fontFamily: "monospace",
      fontSize: "24px",
      color: "#f4a261",
    })
    .setOrigin(0.5)
    .setDepth(20)
    .setAlpha(0);

  scene.tweens.add({
    targets: banner,
    alpha: { from: 0, to: 1 },
    scale: { from: 0.5, to: 1.2 },
    duration: 400,
    yoyo: true,
    hold: 800,
    onComplete: () => {
      banner.destroy();
    },
  });
}
