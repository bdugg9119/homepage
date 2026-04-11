import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders the name as a heading", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Brian Duggan");
  });

  it("renders the role badge", () => {
    render(<Hero />);

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("renders the location", () => {
    render(<Hero />);

    expect(screen.getByText("Pittsburgh, PA")).toBeInTheDocument();
  });

  it("renders the email as a mailto link", () => {
    render(<Hero />);

    const emailLink = screen.getByRole("link", { name: /brianduggan@pm\.me/i });
    expect(emailLink).toHaveAttribute("href", "mailto:BrianDuggan@pm.me");
  });
});
