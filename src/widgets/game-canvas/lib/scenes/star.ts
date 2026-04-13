import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";
import type { PlayerSprite } from "./player";

const STAR_SIZE = 24;
const STAR_COLOR = GAME_CONFIG.starColor;
const STAR_GLOW = 0xffec8b;
const TEXTURE_KEY = "star_power";

function drawStar(
  gfx: Phaser.GameObjects.Graphics, cx: number, cy: number, outer: number, inner: number,
): void {
  gfx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) { gfx.moveTo(x, y); } else { gfx.lineTo(x, y); }
  }
  gfx.closePath();
  gfx.fillPath();
}

function ensureStarTexture(scene: Phaser.Scene): void {
  if (scene.textures.exists(TEXTURE_KEY)) { return; }
  const s = STAR_SIZE;
  const mid = s / 2;
  const gfx = scene.add.graphics();
  gfx.fillStyle(STAR_GLOW, 0.5);
  drawStar(gfx, mid, mid, mid, mid * 0.4);
  gfx.fillStyle(STAR_COLOR, 1);
  drawStar(gfx, mid, mid, mid - 2, mid * 0.35);
  gfx.generateTexture(TEXTURE_KEY, s, s);
  gfx.destroy();
}

export function spawnStarPowerUp(
  scene: Phaser.Scene,
  group: Phaser.Physics.Arcade.Group,
  scrollSpeed: number,
): void {
  ensureStarTexture(scene);
  const { width, height, boundaryThickness } = GAME_CONFIG;
  const margin = boundaryThickness + STAR_SIZE;
  const x = width + STAR_SIZE;
  const y = Phaser.Math.Between(margin, height - margin);
  const star = scene.add.image(x, y, TEXTURE_KEY);
  star.setData("type", "star");
  scene.physics.add.existing(star);
  group.add(star);
  const body = star.body as Phaser.Physics.Arcade.Body;
  body.setVelocityX(-scrollSpeed);
  body.setAllowGravity(false);
  body.setImmovable(true);
  scene.tweens.add({
    targets: star, scaleX: 1.4, scaleY: 1.4, alpha: 0.5,
    duration: 500, yoyo: true, loop: -1, ease: "Sine.easeInOut",
  });
  scene.tweens.add({ targets: star, angle: 360, duration: 2000, loop: -1 });
}

type StarResult = {
  bar: Phaser.GameObjects.Rectangle;
  timer: Phaser.Time.TimerEvent;
  emitter: Phaser.GameObjects.Particles.ParticleEmitter;
  star: Phaser.GameObjects.Image;
  boostedSpeed: number;
};

export function activateStarMode(
  scene: Phaser.Scene, player: PlayerSprite, scrollSpeed: number, onEnd: () => void,
): StarResult {
  player.setFillStyle(STAR_COLOR); scene.tweens.killTweensOf(player);
  player.setScale(1, 1); player.setVisible(false);
  ensureStarTextures(scene);
  const star = scene.add.image(player.x, player.y, "star_player").setDepth(player.depth);
  scene.tweens.add({ targets: star, angle: 360, duration: 400, loop: -1 });
  const emitter = scene.add.particles(0, 0, "star_particle", {
    follow: star, speed: { min: 40, max: 120 },
    lifespan: 500, scale: { start: 1.5, end: 0 },
    alpha: { start: 0.9, end: 0 }, frequency: 10,
    quantity: 4, angle: { min: 90, max: 270 },
  });
  const bar = createStarBar(scene);
  const timer = scene.time.delayedCall(GAME_CONFIG.starDurationMs, () => {
    player.setFillStyle(GAME_CONFIG.playerColor);
    player.setScale(1, 1); player.setAlpha(1); player.setVisible(true);
    emitter.destroy(); bar.destroy(); star.destroy();
    onEnd();
  });
  return { bar, timer, emitter, star, boostedSpeed: scrollSpeed * GAME_CONFIG.starSpeedMultiplier };
}

function ensureStarTextures(scene: Phaser.Scene): void {
  if (!scene.textures.exists("star_particle")) {
    const g = scene.add.graphics(); g.fillStyle(STAR_COLOR, 1); g.fillRect(0, 0, 6, 6);
    g.generateTexture("star_particle", 6, 6); g.destroy();
  }
  if (!scene.textures.exists("star_player")) {
    const s = 40, h = s / 2, g = scene.add.graphics();
    g.fillStyle(STAR_GLOW, 0.5); drawStar(g, h, h, h, h * 0.4); g.fillStyle(STAR_COLOR, 1); drawStar(g, h, h, h - 2, h * 0.35);
    g.generateTexture("star_player", s, s); g.destroy();
  }
}

function createStarBar(scene: Phaser.Scene): Phaser.GameObjects.Rectangle {
  const barWidth = GAME_CONFIG.width * 0.6;
  const bar = scene.add.rectangle(GAME_CONFIG.width / 2, GAME_CONFIG.height - 32, barWidth, 6, STAR_COLOR);
  bar.setDepth(10);
  return bar;
}

export function updateStarState(
  bar: Phaser.GameObjects.Rectangle, player: PlayerSprite,
  star: Phaser.GameObjects.Image, fraction: number,
): void {
  const f = Math.max(0, Math.min(1, fraction));
  bar.width = GAME_CONFIG.width * 0.6 * f;
  const growIn = Math.min(1, (1 - f) * 20);
  const fadeOut = Math.min(1, f * 20);
  const env = growIn * fadeOut;
  const breathe = Math.sin(Date.now() * 0.008);
  const base = 1.5 + (1 - f) * 0.3;
  star.setPosition(player.x, player.y); star.setScale(0.5 + (base - 0.5 + breathe * 0.15) * env);
  if (f < 0.25) {
    const flash = 0.5 + Math.sin(Date.now() * 0.02) * 0.5;
    bar.setAlpha(flash); star.setAlpha(flash);
  } else if (f < 0.5) {
    bar.setAlpha(1);
    star.setAlpha(0.7 + Math.sin(Date.now() * 0.01) * 0.3);
  } else { bar.setAlpha(1); star.setAlpha(1); }
}

export function createStarExplosion(scene: Phaser.Scene, x: number, y: number): void {
  const count = 6;
  for (let i = 0; i < count; i++) {
    const shard = scene.add.rectangle(x, y, 8, 8, STAR_COLOR);
    const angle = (i / count) * Math.PI * 2;
    scene.tweens.add({
      targets: shard,
      x: x + Math.cos(angle) * 60, y: y + Math.sin(angle) * 60,
      alpha: 0, scaleX: 0.2, scaleY: 0.2,
      duration: 300, ease: "Quad.easeOut",
      onComplete: () => { shard.destroy(); },
    });
  }
}
