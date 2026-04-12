import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";

type PlayerSprite = Phaser.GameObjects.Rectangle & {
  body: Phaser.Physics.Arcade.Body;
};

export function createPlayer(scene: Phaser.Scene): PlayerSprite {
  const { playerOffsetX, height, boundaryThickness, playerSize, playerColor, width } = GAME_CONFIG;

  const rect = scene.add.rectangle(playerOffsetX, height / 2, playerSize, playerSize, playerColor);
  scene.physics.add.existing(rect);

  const player = rect as PlayerSprite;
  player.body.setCollideWorldBounds(false);
  player.body.setAllowGravity(false);

  const playableTop = boundaryThickness;
  const playableHeight = height - boundaryThickness * 2;
  player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, playableTop, width, playableHeight));

  return player;
}

export function createBoundaries(
  scene: Phaser.Scene,
  player: PlayerSprite,
): void {
  const { width, height, boundaryThickness, boundaryColor } = GAME_CONFIG;

  const ceiling = scene.add.rectangle(width / 2, boundaryThickness / 2, width, boundaryThickness, boundaryColor);
  const floor = scene.add.rectangle(
    width / 2,
    height - boundaryThickness / 2,
    width,
    boundaryThickness,
    boundaryColor,
  );

  scene.physics.add.existing(ceiling, true);
  scene.physics.add.existing(floor, true);

  scene.physics.add.collider(player, ceiling);
  scene.physics.add.collider(player, floor);
}

export type { PlayerSprite };
