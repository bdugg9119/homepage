import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";
import { createGameHud, updateHudScore, type GameHud } from "./hud";
import { spawnObstacle, cleanOffscreenObstacles } from "./obstacles";
import { createPlayer, createBoundaries, createPlayerTrail, squishOnJump, checkLanding, type PlayerSprite } from "./player";
import { spawnPowerUp, createInversionBar, updateInversionBar } from "./powerup";
import { spawnStarPowerUp, activateStarMode, updateStarBar, createStarExplosion } from "./star";

const SCENE_KEY = "GameScene";
const POWER_UP_CHANCE = 0.12;
const STAR_CHANCE = 0.03;

export default class GameScene extends Phaser.Scene {
  private player!: PlayerSprite;
  private score = 0;
  private hud!: GameHud;
  private scoreTimer!: Phaser.Time.TimerEvent;
  private scrollSpeed = GAME_CONFIG.initialScrollSpeed;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private powerUps!: Phaser.Physics.Arcade.Group;
  private spawnTimer!: Phaser.Time.TimerEvent;
  private isGameOver = false;
  private isGravityInverted = false;
  private inversionBar: Phaser.GameObjects.Rectangle | null = null;
  private inversionStartTime = 0;
  private inversionEndTimer: Phaser.Time.TimerEvent | null = null;
  private wasOnGround = false;
  private isStarPowered = false;
  private starBar: Phaser.GameObjects.Rectangle | null = null;
  private starStartTime = 0;
  private starEndTimer: Phaser.Time.TimerEvent | null = null;
  private preStarSpeed = 0;

  constructor() { super({ key: SCENE_KEY }); }
  create(): void {
    this.score = 0; this.scrollSpeed = GAME_CONFIG.initialScrollSpeed;
    this.isGameOver = false; this.isGravityInverted = false; this.isStarPowered = false;
    this.inversionBar = null; this.inversionEndTimer = null;
    this.starBar = null; this.starEndTimer = null; this.wasOnGround = false;
    this.player = createPlayer(this);
    createBoundaries(this, this.player); createPlayerTrail(this, this.player);
    this.createGroups(); this.hud = createGameHud(this);
    this.input.on("pointerdown", () => { this.handleJump(); });
    this.input.keyboard?.on("keydown-SPACE", () => { this.handleJump(); });
    this.startTimers();
  }

  update(_time: number, delta: number): void {
    if (this.isGameOver) { return; }
    this.applyGravity(delta);
    this.wasOnGround = checkLanding(this, this.player, this.wasOnGround, this.isGravityInverted);
    if (this.isGravityInverted && this.inversionBar) {
      updateInversionBar(this.inversionBar, 1 - (this.time.now - this.inversionStartTime) / GAME_CONFIG.inversionDurationMs);
    }
    if (this.isStarPowered && this.starBar) {
      updateStarBar(this.starBar, 1 - (this.time.now - this.starStartTime) / GAME_CONFIG.starDurationMs);
    }
    cleanOffscreenObstacles(this.obstacles); cleanOffscreenObstacles(this.powerUps);
  }

  private createGroups(): void {
    this.obstacles = this.physics.add.group();
    this.physics.add.overlap(this.player, this.obstacles, (_p, obs) => {
      if (this.isStarPowered) { this.smashObstacle(obs as Phaser.GameObjects.GameObject); }
      else { this.handleGameOver(); }
    });
    this.powerUps = this.physics.add.group();
    this.physics.add.overlap(this.player, this.powerUps, (_p, orb) => {
      this.handlePowerUpCollect(orb as Phaser.GameObjects.GameObject);
    });
  }

  private startTimers(): void {
    this.scoreTimer = this.time.addEvent({ delay: GAME_CONFIG.scoreIntervalMs, loop: true,
      callback: () => { this.score += this.isStarPowered ? GAME_CONFIG.starScoreMultiplier : 1; updateHudScore(this, this.hud, this.score); },
    });
    this.spawnTimer = this.time.addEvent({ delay: GAME_CONFIG.spawnIntervalMs, loop: true,
      callback: () => { this.handleSpawn(); },
    });
  }
  private handleSpawn(): void {
    const roll = Math.random();
    if (!this.isStarPowered && this.score >= 800 && roll < STAR_CHANCE) {
      spawnStarPowerUp(this, this.powerUps, this.scrollSpeed);
    } else if (!this.isGravityInverted && !this.isStarPowered && this.score >= 500 && roll < POWER_UP_CHANCE) {
      spawnPowerUp(this, this.powerUps, this.scrollSpeed);
    } else { spawnObstacle(this, this.obstacles, this.scrollSpeed, this.score); }
    this.rampDifficulty();
  }
  private applyGravity(delta: number): void {
    const dir = this.isGravityInverted ? -1 : 1;
    const vy = this.player.body.velocity.y + GAME_CONFIG.gravity * dir * (delta / 1000);
    const max = GAME_CONFIG.maxVelocityY;
    this.player.body.setVelocityY(Math.max(-max, Math.min(vy, max)));
  }
  private handleJump(): void {
    if (this.isGameOver) { return; }
    this.player.body.setVelocityY(GAME_CONFIG.jumpForce * (this.isGravityInverted ? 1 : -1));
    squishOnJump(this, this.player);
  }
  private handlePowerUpCollect(powerUp: Phaser.GameObjects.GameObject): void {
    const isStar = powerUp.getData("type") === "star";
    powerUp.destroy();
    if (isStar) { this.startStarMode(); return; }
    this.score += GAME_CONFIG.inversionBonus;
    updateHudScore(this, this.hud, this.score); this.startGravityInversion();
  }
  private startGravityInversion(): void {
    this.isGravityInverted = true; this.inversionStartTime = this.time.now;
    this.inversionBar?.destroy(); this.inversionBar = createInversionBar(this);
    this.inversionEndTimer?.destroy();
    this.inversionEndTimer = this.time.delayedCall(GAME_CONFIG.inversionDurationMs, () => {
      this.isGravityInverted = false;
      this.inversionBar?.destroy(); this.inversionBar = null; this.inversionEndTimer = null;
    });
  }
  private startStarMode(): void {
    this.isStarPowered = true; this.starStartTime = this.time.now; this.preStarSpeed = this.scrollSpeed;
    this.starBar?.destroy(); this.starEndTimer?.destroy();
    const r = activateStarMode(this, this.player, this.scrollSpeed, () => {
      this.isStarPowered = false; this.scrollSpeed = this.preStarSpeed; this.starBar = null; this.starEndTimer = null;
    });
    this.scrollSpeed = r.boostedSpeed; this.starBar = r.bar; this.starEndTimer = r.timer;
  }
  private smashObstacle(obs: Phaser.GameObjects.GameObject): void {
    const r = obs as Phaser.GameObjects.Rectangle;
    createStarExplosion(this, r.x, r.y); r.destroy();
    this.score += GAME_CONFIG.starDestroyBonus; updateHudScore(this, this.hud, this.score);
  }
  private rampDifficulty(): void {
    const { maxScrollSpeed, speedIncrement, minSpawnIntervalMs, spawnIntervalDecrement } = GAME_CONFIG;
    this.scrollSpeed = Math.min(this.scrollSpeed + speedIncrement, maxScrollSpeed);
    const currentDelay = this.spawnTimer.delay;
    if (currentDelay > minSpawnIntervalMs) {
      this.spawnTimer.destroy();
      this.spawnTimer = this.time.addEvent({
        delay: Math.max(currentDelay - spawnIntervalDecrement, minSpawnIntervalMs),
        callback: () => { this.handleSpawn(); }, loop: true,
      });
    }
  }
  private handleGameOver(): void {
    if (this.isGameOver) { return; }
    this.isGameOver = true;
    this.scoreTimer.destroy(); this.spawnTimer.destroy(); this.inversionEndTimer?.destroy(); this.starEndTimer?.destroy();
    this.physics.pause();
    this.scene.start("GameOverScene", { score: this.score, isNewHighScore: this.hud.hasNewHighScore });
  }
}
