import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillCard from "./SkillCard";

describe("SkillCard", () => {
  const DEFAULT_PROPS = {
    title: "Frontend",
    skills: ["React", "TypeScript", "Tailwind"],
  };

  it("renders the category title", () => {
    render(<SkillCard {...DEFAULT_PROPS} />);

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Frontend");
  });

  it("renders all skill badges", () => {
    render(<SkillCard {...DEFAULT_PROPS} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("renders the correct number of skills", () => {
    const { container } = render(<SkillCard {...DEFAULT_PROPS} />);

    const badges = container.querySelectorAll("span.rounded-md");
    expect(badges).toHaveLength(3);
  });
});
