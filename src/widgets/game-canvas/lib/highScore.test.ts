import { describe, it, expect, beforeEach } from "vitest";
import { getHighScore, setHighScore } from "./highScore";

describe("highScore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getHighScore", () => {
    it("returns 0 when no score is stored", () => {
      expect(getHighScore()).toBe(0);
    });

    it("returns the stored score as a number", () => {
      localStorage.setItem("gravity-runner-high-score", "42");

      expect(getHighScore()).toBe(42);
    });

    it("returns 0 for invalid stored values", () => {
      localStorage.setItem("gravity-runner-high-score", "not-a-number");

      expect(getHighScore()).toBe(0);
    });

    it("returns 0 for negative stored values", () => {
      localStorage.setItem("gravity-runner-high-score", "-5");

      expect(getHighScore()).toBe(0);
    });

    it("floors decimal values", () => {
      localStorage.setItem("gravity-runner-high-score", "99.7");

      expect(getHighScore()).toBe(99);
    });
  });

  describe("setHighScore", () => {
    it("persists a score to localStorage", () => {
      setHighScore(100);

      expect(localStorage.getItem("gravity-runner-high-score")).toBe("100");
    });

    it("floors decimal scores before storing", () => {
      setHighScore(55.9);

      expect(localStorage.getItem("gravity-runner-high-score")).toBe("55");
    });

    it("overwrites a previous high score", () => {
      setHighScore(10);
      setHighScore(25);

      expect(getHighScore()).toBe(25);
    });
  });
});
