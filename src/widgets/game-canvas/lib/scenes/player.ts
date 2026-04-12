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

export function createPlayerTrail(scene: Phaser.Scene, player: PlayerSprite): void {
  if (!scene.textures.exists("trail_particle")) {
    const gfx = scene.add.graphics();
    gfx.fillStyle(GAME_CONFIG.playerColor, 1);
    gfx.fillRect(0, 0, 6, 6);
    gfx.generateTexture("trail_particle", 6, 6);
    gfx.destroy();
  }

  scene.add.particles(0, 0, "trail_particle", {
    follow: player,
    followOffset: { x: -GAME_CONFIG.playerSize / 2, y: 0 },
    speed: { min: 5, max: 20 },
    scale: { start: 0.6, end: 0 },
    alpha: { start: 0.4, end: 0 },
    lifespan: 400,
    frequency: 30,
    quantity: 2,
    angle: { min: 150, max: 210 },
  });
}

export function squishOnLand(scene: Phaser.Scene, player: PlayerSprite): void {
  scene.tweens.killTweensOf(player);
  player.setScale(1, 1);
  scene.tweens.add({
    targets: player,
    scaleX: 1.3,
    scaleY: 0.7,
    duration: 80,
    yoyo: true,
    ease: "Quad.easeOut",
    onComplete: () => {
      player.setScale(1, 1);
      scene.tweens.add({
        targets: player, scaleX: 1.14, scaleY: 0.86,
        duration: 450, yoyo: true, loop: -1, ease: "Sine.easeInOut",
      });
    },
  });
}

export function squishOnJump(scene: Phaser.Scene, player: PlayerSprite): void {
  scene.tweens.killTweensOf(player);
  player.setScale(1, 1);
  scene.tweens.add({
    targets: player,
    scaleX: 0.7,
    scaleY: 1.3,
    duration: 80,
    yoyo: true,
    ease: "Quad.easeOut",
    onComplete: () => { player.setScale(1, 1); },
  });
}

export function checkLanding(
  scene: Phaser.Scene, player: PlayerSprite,
  wasOnGround: boolean, isInverted: boolean, skipSquish = false,
): boolean {
  const isOnGround = isInverted ? player.body.blocked.up : player.body.blocked.down;
  if (isOnGround && !wasOnGround && !skipSquish) { squishOnLand(scene, player); return true; }
  if (wasOnGround) {
    const vy = player.body.velocity.y;
    return isInverted ? vy <= 50 : vy >= -50;
  }
  return isOnGround;
}

export type { PlayerSprite };
