import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";

const POWER_UP_SIZE = 18;
const POWER_UP_COLOR = 0x7b2ff7;
const POWER_UP_GLOW = 0xb57bff;

export function spawnPowerUp(
  scene: Phaser.Scene,
  group: Phaser.Physics.Arcade.Group,
  scrollSpeed: number,
): void {
  const { width, height, boundaryThickness } = GAME_CONFIG;
  const margin = boundaryThickness + POWER_UP_SIZE;
  const x = width + POWER_UP_SIZE;
  const y = Phaser.Math.Between(margin, height - margin);

  const orb = scene.add.rectangle(x, y, POWER_UP_SIZE, POWER_UP_SIZE, POWER_UP_COLOR);
  orb.setStrokeStyle(3, POWER_UP_GLOW, 0.8);
  scene.physics.add.existing(orb);
  group.add(orb);

  const body = orb.body as Phaser.Physics.Arcade.Body;
  body.setVelocityX(-scrollSpeed);
  body.setAllowGravity(false);
  body.setImmovable(true);

  scene.tweens.add({
    targets: orb,
    scaleX: 1.3,
    scaleY: 1.3,
    alpha: 0.6,
    duration: 400,
    yoyo: true,
    loop: -1,
    ease: "Sine.easeInOut",
  });
}

export function createInversionBar(scene: Phaser.Scene): Phaser.GameObjects.Rectangle {
  const barWidth = GAME_CONFIG.width * 0.6;
  const x = GAME_CONFIG.width / 2;
  const y = GAME_CONFIG.height - 22;
  const bar = scene.add.rectangle(x, y, barWidth, 6, 0x06d6a0);
  bar.setDepth(10);
  return bar;
}

export function updateInversionBar(
  bar: Phaser.GameObjects.Rectangle,
  fraction: number,
): void {
  const clamped = Math.max(0, Math.min(1, fraction));
  bar.width = GAME_CONFIG.width * 0.6 * clamped;

  if (clamped > 0.5) {
    bar.setFillStyle(0x06d6a0);
  } else if (clamped > 0.25) {
    bar.setFillStyle(0xf4a261);
  } else {
    bar.setFillStyle(0xe63946);
  }

  if (clamped < 0.25) {
    bar.setAlpha(0.5 + Math.sin(Date.now() * 0.02) * 0.5);
  } else {
    bar.setAlpha(1);
  }
}
