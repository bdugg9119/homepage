import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import JobEntry from "./JobEntry";

describe("JobEntry", () => {
  const DEFAULT_PROPS = {
    company: "Acme Corp",
    role: "Senior Engineer",
    period: "2023 - Present",
    location: "Pittsburgh, PA",
    highlights: ["Built a dashboard.", "Mentored junior engineers."],
  };

  it("renders the company name as a heading", () => {
    render(<JobEntry {...DEFAULT_PROPS} />);

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Acme Corp");
  });

  it("renders the role in italics", () => {
    render(<JobEntry {...DEFAULT_PROPS} />);

    const roleEl = screen.getByText("Senior Engineer");
    expect(roleEl.tagName).toBe("P");
    expect(roleEl.className).toContain("italic");
  });

  it("renders all bullet points", () => {
    render(<JobEntry {...DEFAULT_PROPS} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
  });
});
