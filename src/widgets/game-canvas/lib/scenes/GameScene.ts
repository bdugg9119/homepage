import * as Phaser from "phaser";
import { GAME_CONFIG } from "../config";
import { spawnObstaclePair, cleanOffscreenObstacles } from "./obstacles";
import { createPlayer, createBoundaries, type PlayerSprite } from "./player";

const SCENE_KEY = "GameScene";

export default class GameScene extends Phaser.Scene {
  private player!: PlayerSprite;
  private isGravityDown = true;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private scoreTimer!: Phaser.Time.TimerEvent;
  private scrollSpeed = GAME_CONFIG.initialScrollSpeed;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private spawnTimer!: Phaser.Time.TimerEvent;
  private isGameOver = false;

  constructor() {
    super({ key: SCENE_KEY });
  }

  create(): void {
    this.resetState();
    this.player = createPlayer(this);
    createBoundaries(this, this.player);
    this.createObstacles();
    this.createHud();
    this.setupInput();
    this.startTimers();
  }

  update(): void {
    if (this.isGameOver) {
      return;
    }

    this.clampPlayerVelocity();
    cleanOffscreenObstacles(this.obstacles);
  }

  private resetState(): void {
    this.isGravityDown = true;
    this.score = 0;
    this.scrollSpeed = GAME_CONFIG.initialScrollSpeed;
    this.isGameOver = false;
  }

  private createHud(): void {
    this.scoreText = this.add
      .text(GAME_CONFIG.width / 2, 30, "0", {
        fontFamily: "monospace",
        fontSize: "20px",
        color: "#f1f5f9",
      })
      .setOrigin(0.5)
      .setDepth(10);
  }

  private createObstacles(): void {
    this.obstacles = this.physics.add.group();
    this.physics.add.overlap(this.player, this.obstacles, () => {
      this.handleGameOver();
    });
  }

  private setupInput(): void {
    this.input.on("pointerdown", () => {
      this.handleFlipGravity();
    });
  }

  private startTimers(): void {
    this.scoreTimer = this.time.addEvent({
      delay: GAME_CONFIG.scoreIntervalMs,
      callback: () => { this.incrementScore(); },
      loop: true,
    });

    this.spawnTimer = this.time.addEvent({
      delay: GAME_CONFIG.spawnIntervalMs,
      callback: () => { this.handleSpawn(); },
      loop: true,
    });
  }

  private handleFlipGravity(): void {
    if (this.isGameOver) {
      return;
    }

    this.isGravityDown = !this.isGravityDown;
    const direction = this.isGravityDown ? 1 : -1;
    this.player.body.setGravityY(GAME_CONFIG.gravity * direction);
    this.player.body.setVelocityY(0);
  }

  private incrementScore(): void {
    this.score += 1;
    this.scoreText.setText(String(this.score));
  }

  private handleSpawn(): void {
    spawnObstaclePair(this, this.obstacles, this.scrollSpeed);
    this.rampDifficulty();
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

  private clampPlayerVelocity(): void {
    const vy = this.player.body.velocity.y;
    const max = GAME_CONFIG.maxVelocityY;

    if (Math.abs(vy) > max) {
      this.player.body.setVelocityY(vy > 0 ? max : -max);
    }
  }

  private handleGameOver(): void {
    if (this.isGameOver) {
      return;
    }

    this.isGameOver = true;
    this.scoreTimer.destroy();
    this.spawnTimer.destroy();
    this.physics.pause();

    this.scene.start("GameOverScene", { score: this.score });
  }
}
