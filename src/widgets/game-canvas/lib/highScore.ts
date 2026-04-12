const STORAGE_KEY = "gravity-runner-high-score";

export function getHighScore(): number {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === null) {
    return 0;
  }

  const parsed = Number(stored);

  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0;
}

export function setHighScore(score: number): void {
  localStorage.setItem(STORAGE_KEY, String(Math.floor(score)));
}
