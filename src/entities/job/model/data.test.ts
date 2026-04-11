import { describe, it, expect } from "vitest";
import { JOBS } from "./data";

describe("JOBS data", () => {
  it("contains at least one job entry", () => {
    expect(JOBS.length).toBeGreaterThan(0);
  });

  it("has required fields on every entry", () => {
    for (const job of JOBS) {
      expect(job.company).toBeTruthy();
      expect(job.role).toBeTruthy();
      expect(job.period).toBeTruthy();
      expect(job.location).toBeTruthy();
      expect(job.highlights.length).toBeGreaterThan(0);
    }
  });

  it("lists jobs in reverse chronological order", () => {
    const firstJob = JOBS[0];
    const lastJob = JOBS[JOBS.length - 1];

    expect(firstJob?.period).toContain("Present");
    expect(lastJob?.period).toContain("2016");
  });
});
