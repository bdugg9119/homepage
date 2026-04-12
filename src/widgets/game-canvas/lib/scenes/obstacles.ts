import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";

type ObstacleType = "walls" | "slanted" | "staggered" | "minefield";

const STAGGERED_SCORE = 150;
const SLANTED_SCORE = 225;
const MINEFIELD_SCORE = 300;
const STAGGER_OFFSET = 80;
const MINE_SIZE = 15;
const MINE_COLOR = 0xe63946;
const MINE_SPREAD_X = 140;
const MINE_MIN_SPACING = 45;
const SLANT_SEG = 15;
const SLANT_MAX_SPREAD = 100;

export function spawnObstacle(
  scene: Phaser.Scene,
  group: Phaser.Physics.Arcade.Group,
  scrollSpeed: number,
  score: number,
): void {
  const types = getAvailableTypes(score);
  const type = types[Phaser.Math.Between(0, types.length - 1)];

  switch (type) {
    case "walls": spawnWallPair(scene, group, scrollSpeed); break;
    case "slanted": spawnSlantedWall(scene, group, scrollSpeed); break;
    case "staggered": spawnStaggeredWalls(scene, group, scrollSpeed); break;
    case "minefield": spawnMinefield(scene, group, scrollSpeed); break;
  }
}

function getAvailableTypes(score: number): ObstacleType[] {
  const types: ObstacleType[] = ["walls"];
  if (score >= SLANTED_SCORE) { types.push("slanted"); }
  if (score >= STAGGERED_SCORE) { types.push("staggered"); }
  if (score >= MINEFIELD_SCORE) { types.push("minefield"); }
  return types;
}

function spawnWallPair(
  scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, scrollSpeed: number,
): void {
  spawnWallColumn(scene, group, GAME_CONFIG.width + GAME_CONFIG.obstacleWidth, randomGapTop(), scrollSpeed);
}

function spawnSlantedWall(
  scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, scrollSpeed: number,
): void {
  const { width, height, boundaryThickness, gapSize } = GAME_CONFIG;
  const playableTop = boundaryThickness;
  const playableH = height - boundaryThickness * 2;
  const segments = Math.floor(playableH / SLANT_SEG);
  const spread = Phaser.Math.Between(40, SLANT_MAX_SPREAD);
  const dir = Phaser.Math.Between(0, 1) === 0 ? 1 : -1;
  const gapSegs = Math.ceil(gapSize / SLANT_SEG);
  const gapStart = Phaser.Math.Between(1, segments - gapSegs - 1);
  const baseX = width + SLANT_MAX_SPREAD / 2 + SLANT_SEG;

  for (let i = 0; i < segments; i++) {
    if (i >= gapStart && i < gapStart + gapSegs) { continue; }
    const t = i / (segments - 1);
    const x = baseX + (t - 0.5) * spread * dir;
    const y = playableTop + SLANT_SEG / 2 + i * SLANT_SEG;
    addObstacle(scene, group, x, y, SLANT_SEG, scrollSpeed, SLANT_SEG);
  }
}

function spawnStaggeredWalls(
  scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, scrollSpeed: number,
): void {
  const { width, obstacleWidth, boundaryThickness, height, gapSize, playerSize } = GAME_CONFIG;
  const baseX = width + obstacleWidth;
  const firstGapTop = randomGapTop();
  const maxOffset = gapSize - playerSize * 2;
  const minGap = boundaryThickness + 20;
  const maxGap = height - boundaryThickness - gapSize - 20;
  const raw = firstGapTop + Phaser.Math.Between(-maxOffset, maxOffset);
  const secondGapTop = Math.max(minGap, Math.min(maxGap, raw));
  spawnWallColumn(scene, group, baseX, firstGapTop, scrollSpeed);
  spawnWallColumn(scene, group, baseX + STAGGER_OFFSET, secondGapTop, scrollSpeed);
}

function spawnMinefield(
  scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, scrollSpeed: number,
): void {
  const { width, height, boundaryThickness } = GAME_CONFIG;
  const count = Phaser.Math.Between(4, 6);
  const mines: { x: number; y: number }[] = [];
  const margin = boundaryThickness + MINE_SIZE;

  for (let i = 0; i < count; i++) {
    let x = 0;
    let y = 0;
    let attempts = 0;
    do {
      x = width + Phaser.Math.Between(20, MINE_SPREAD_X);
      y = Phaser.Math.Between(margin, height - margin);
      attempts += 1;
    } while (attempts < 20 && mines.some((m) => Math.hypot(m.x - x, m.y - y) < MINE_MIN_SPACING));
    mines.push({ x, y });
    addObstacle(scene, group, x, y, MINE_SIZE, scrollSpeed, MINE_SIZE, MINE_COLOR);
  }
}

function randomGapTop(): number {
  const { boundaryThickness, height, gapSize } = GAME_CONFIG;
  return Phaser.Math.Between(boundaryThickness + 20, height - boundaryThickness - gapSize - 20);
}

function spawnWallColumn(
  scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group,
  x: number, gapTop: number, scrollSpeed: number,
): void {
  const { height, boundaryThickness, gapSize } = GAME_CONFIG;
  const topH = gapTop - boundaryThickness;
  const botY = gapTop + gapSize;
  const botH = height - boundaryThickness - botY;
  if (topH > 0) { addObstacle(scene, group, x, boundaryThickness + topH / 2, topH, scrollSpeed); }
  if (botH > 0) { addObstacle(scene, group, x, botY + botH / 2, botH, scrollSpeed); }
}

function addObstacle(
  scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group,
  x: number, y: number, h: number, scrollSpeed: number,
  w = GAME_CONFIG.obstacleWidth, color = GAME_CONFIG.obstacleColor,
): void {
  const rect = scene.add.rectangle(x, y, w, h, color);
  scene.physics.add.existing(rect);
  group.add(rect);
  const body = rect.body as Phaser.Physics.Arcade.Body;
  body.setVelocityX(-scrollSpeed);
  body.setAllowGravity(false);
  body.setImmovable(true);
}

export function cleanOffscreenObstacles(group: Phaser.Physics.Arcade.Group): void {
  group.getChildren().forEach((obstacle) => {
    const rect = obstacle as Phaser.GameObjects.Rectangle;
    if (rect.x < -rect.width) { rect.destroy(); }
  });
}
