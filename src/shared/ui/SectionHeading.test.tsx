import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SectionHeading from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders the title text", () => {
    render(<SectionHeading title="Technical Skills" />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Technical Skills");
  });
});
