import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/test/render";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the site title as a link to home", () => {
    renderWithProviders(<Navbar />);

    const titleLink = screen.getByRole("link", { name: /brian duggan/i });
    expect(titleLink).toHaveAttribute("href", "/");
  });

  it("renders Home and Resume navigation links", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByRole("link", { name: /^home$/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /^resume$/i })).toHaveAttribute("href", "/resume");
  });
});
