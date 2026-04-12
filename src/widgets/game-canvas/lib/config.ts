export type GameConfig = {
  readonly width: number;
  readonly height: number;
  readonly gravity: number;
  readonly jumpForce: number;
  readonly maxVelocityY: number;
  readonly playerSize: number;
  readonly playerOffsetX: number;
  readonly boundaryThickness: number;
  readonly obstacleWidth: number;
  readonly gapSize: number;
  readonly initialScrollSpeed: number;
  readonly maxScrollSpeed: number;
  readonly speedIncrement: number;
  readonly spawnIntervalMs: number;
  readonly minSpawnIntervalMs: number;
  readonly spawnIntervalDecrement: number;
  readonly scoreIntervalMs: number;
  readonly backgroundColor: number;
  readonly playerColor: number;
  readonly inversionDurationMs: number;
  readonly inversionBonus: number;
  readonly obstacleColor: number;
  readonly boundaryColor: number;
  readonly starDurationMs: number;
  readonly starSpeedMultiplier: number;
  readonly starScoreMultiplier: number;
  readonly starDestroyBonus: number;
  readonly starColor: number;
};

export const GAME_CONFIG: GameConfig = {
  width: 800,
  height: 400,
  gravity: 1200,
  jumpForce: 420,
  maxVelocityY: 600,
  playerSize: 20,
  playerOffsetX: 120,
  boundaryThickness: 10,
  obstacleWidth: 30,
  gapSize: 100,
  initialScrollSpeed: 200,
  maxScrollSpeed: 500,
  speedIncrement: 5,
  spawnIntervalMs: 2000,
  minSpawnIntervalMs: 800,
  spawnIntervalDecrement: 25,
  scoreIntervalMs: 100,
  backgroundColor: 0x0a0e1a,
  playerColor: 0x06d6a0,
  inversionDurationMs: 5000,
  inversionBonus: 100,
  obstacleColor: 0xf4a261,
  boundaryColor: 0x1a2240,
  starDurationMs: 6000,
  starSpeedMultiplier: 2.5,
  starScoreMultiplier: 5,
  starDestroyBonus: 50,
  starColor: 0xffd700,
};
