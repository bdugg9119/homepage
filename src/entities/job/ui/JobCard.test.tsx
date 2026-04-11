import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import JobCard from "./JobCard";

describe("JobCard", () => {
  const DEFAULT_PROPS = {
    company: "Acme Corp",
    role: "Senior Engineer",
    period: "2023 - Present",
    location: "Pittsburgh, PA",
    highlights: [
      "Led frontend architecture redesign.",
      "Increased test coverage to 95%.",
    ],
  };

  it("renders the company name as a heading", () => {
    render(<JobCard {...DEFAULT_PROPS} />);

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Acme Corp");
  });

  it("renders the role", () => {
    render(<JobCard {...DEFAULT_PROPS} />);

    expect(screen.getByText("Senior Engineer")).toBeInTheDocument();
  });

  it("renders the period and location", () => {
    render(<JobCard {...DEFAULT_PROPS} />);

    expect(screen.getByText("2023 - Present")).toBeInTheDocument();
    expect(screen.getByText("Pittsburgh, PA")).toBeInTheDocument();
  });

  it("renders all highlight bullets", () => {
    render(<JobCard {...DEFAULT_PROPS} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent("Led frontend architecture redesign.");
    expect(listItems[1]).toHaveTextContent("Increased test coverage to 95%.");
  });
});
