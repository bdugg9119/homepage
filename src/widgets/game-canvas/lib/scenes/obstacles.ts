import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";

export function spawnObstaclePair(
  scene: Phaser.Scene,
  group: Phaser.Physics.Arcade.Group,
  scrollSpeed: number,
): void {
  const { width, height, boundaryThickness, obstacleWidth, gapSize } = GAME_CONFIG;

  const playableHeight = height - boundaryThickness * 2;
  const minGapTop = boundaryThickness + 20;
  const maxGapTop = height - boundaryThickness - gapSize - 20;
  const gapTop = Phaser.Math.Between(minGapTop, maxGapTop);

  const topHeight = gapTop - boundaryThickness;
  const bottomY = gapTop + gapSize;
  const bottomHeight = playableHeight - topHeight - gapSize;

  if (topHeight > 0) {
    addObstacle(scene, group, width + obstacleWidth, boundaryThickness + topHeight / 2, topHeight, scrollSpeed);
  }

  if (bottomHeight > 0) {
    addObstacle(scene, group, width + obstacleWidth, bottomY + bottomHeight / 2, bottomHeight, scrollSpeed);
  }
}

function addObstacle(
  scene: Phaser.Scene,
  group: Phaser.Physics.Arcade.Group,
  x: number,
  y: number,
  height: number,
  scrollSpeed: number,
): void {
  const rect = scene.add.rectangle(x, y, GAME_CONFIG.obstacleWidth, height, GAME_CONFIG.obstacleColor);
  scene.physics.add.existing(rect);
  group.add(rect);

  // Body properties must be set AFTER group.add — the group resets them
  const body = rect.body as Phaser.Physics.Arcade.Body;
  body.setVelocityX(-scrollSpeed);
  body.setAllowGravity(false);
  body.setImmovable(true);
}

export function cleanOffscreenObstacles(group: Phaser.Physics.Arcade.Group): void {
  group.getChildren().forEach((obstacle) => {
    const rect = obstacle as Phaser.GameObjects.Rectangle;

    if (rect.x < -GAME_CONFIG.obstacleWidth) {
      rect.destroy();
    }
  });
}
