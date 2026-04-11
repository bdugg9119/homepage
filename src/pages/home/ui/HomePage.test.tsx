import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/test/render";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the hero heading", () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole("heading", { level: 1, name: /brian duggan/i })).toBeInTheDocument();
  });

  it("renders the Technical Skills section", () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole("heading", { level: 2, name: /technical skills/i })).toBeInTheDocument();
  });

  it("renders the Experience section", () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole("heading", { level: 2, name: /experience/i })).toBeInTheDocument();
  });
});
