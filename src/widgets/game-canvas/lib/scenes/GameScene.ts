import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";
import { createGameHud, updateHudScore, type GameHud } from "./hud";
import { spawnObstacle, cleanOffscreenObstacles } from "./obstacles";
import { createPlayer, createBoundaries, createPlayerTrail, squishOnJump, checkLanding, type PlayerSprite } from "./player";
import { spawnPowerUp, createInversionBar, updateInversionBar } from "./powerup";

const SCENE_KEY = "GameScene";
const POWER_UP_CHANCE = 0.12;

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

  constructor() { super({ key: SCENE_KEY }); }

  create(): void {
    this.score = 0;
    this.scrollSpeed = GAME_CONFIG.initialScrollSpeed;
    this.isGameOver = false;
    this.isGravityInverted = false;
    this.inversionBar = null; this.inversionEndTimer = null;
    this.wasOnGround = false;
    this.player = createPlayer(this);
    createBoundaries(this, this.player);
    createPlayerTrail(this, this.player);
    this.createGroups();
    this.hud = createGameHud(this);
    this.setupInput();
    this.startTimers();
  }

  update(_time: number, delta: number): void {
    if (this.isGameOver) { return; }
    this.applyGravity(delta);
    this.wasOnGround = checkLanding(this, this.player, this.wasOnGround, this.isGravityInverted);
    if (this.isGravityInverted && this.inversionBar) {
      const fraction = 1 - (this.time.now - this.inversionStartTime) / GAME_CONFIG.inversionDurationMs;
      updateInversionBar(this.inversionBar, fraction);
    }
    cleanOffscreenObstacles(this.obstacles);
    cleanOffscreenObstacles(this.powerUps);
  }

  private createGroups(): void {
    this.obstacles = this.physics.add.group();
    this.physics.add.overlap(this.player, this.obstacles, () => { this.handleGameOver(); });
    this.powerUps = this.physics.add.group();
    this.physics.add.overlap(this.player, this.powerUps, (_p, orb) => {
      this.handlePowerUpCollect(orb as Phaser.GameObjects.GameObject);
    });
  }

  private setupInput(): void {
    this.input.on("pointerdown", () => { this.handleJump(); });
    this.input.keyboard?.on("keydown-SPACE", () => { this.handleJump(); });
  }

  private startTimers(): void {
    this.scoreTimer = this.time.addEvent({
      delay: GAME_CONFIG.scoreIntervalMs,
      callback: () => { this.score += 1; updateHudScore(this, this.hud, this.score); },
      loop: true,
    });
    this.spawnTimer = this.time.addEvent({
      delay: GAME_CONFIG.spawnIntervalMs,
      callback: () => { this.handleSpawn(); },
      loop: true,
    });
  }

  private handleSpawn(): void {
    if (!this.isGravityInverted && this.score >= 500 && Math.random() < POWER_UP_CHANCE) {
      spawnPowerUp(this, this.powerUps, this.scrollSpeed);
    } else {
      spawnObstacle(this, this.obstacles, this.scrollSpeed, this.score);
    }
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
    powerUp.destroy();
    this.score += GAME_CONFIG.inversionBonus;
    updateHudScore(this, this.hud, this.score);
    this.startGravityInversion();
  }
  private startGravityInversion(): void {
    this.isGravityInverted = true;
    this.inversionStartTime = this.time.now;
    this.inversionBar?.destroy();
    this.inversionBar = createInversionBar(this);
    this.inversionEndTimer?.destroy();
    this.inversionEndTimer = this.time.delayedCall(GAME_CONFIG.inversionDurationMs, () => {
      this.isGravityInverted = false;
      this.inversionBar?.destroy();
      this.inversionBar = null;
      this.inversionEndTimer = null;
    });
  }
  private rampDifficulty(): void {
    const { maxScrollSpeed, speedIncrement, minSpawnIntervalMs, spawnIntervalDecrement } = GAME_CONFIG;
    if (this.scrollSpeed < maxScrollSpeed) {
      this.scrollSpeed = Math.min(this.scrollSpeed + speedIncrement, maxScrollSpeed);
    }
    const currentDelay = this.spawnTimer.delay;
    if (currentDelay > minSpawnIntervalMs) {
      this.spawnTimer.destroy();
      this.spawnTimer = this.time.addEvent({
        delay: Math.max(currentDelay - spawnIntervalDecrement, minSpawnIntervalMs),
        callback: () => { this.handleSpawn(); },
        loop: true,
      });
    }
  }
  private handleGameOver(): void {
    if (this.isGameOver) { return; }
    this.isGameOver = true;
    this.scoreTimer.destroy();
    this.spawnTimer.destroy();
    this.inversionEndTimer?.destroy();
    this.physics.pause();
    this.scene.start("GameOverScene", { score: this.score, isNewHighScore: this.hud.hasNewHighScore });
  }
}
