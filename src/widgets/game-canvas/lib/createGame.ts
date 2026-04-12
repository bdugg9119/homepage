import * as Phaser from "phaser";
import { GAME_CONFIG } from "./config";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";

export function createGame(container: HTMLDivElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent: container,
    width: GAME_CONFIG.width,
    height: GAME_CONFIG.height,
    backgroundColor: GAME_CONFIG.backgroundColor,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: GAME_CONFIG.gravity },
        debug: false,
      },
    },
    scene: [MenuScene, GameScene, GameOverScene],
  });
}
