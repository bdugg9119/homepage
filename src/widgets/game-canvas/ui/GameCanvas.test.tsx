import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "@/test/render";
import GameCanvas from "./GameCanvas";

vi.mock("../lib/createGame", () => ({
  createGame: vi.fn(() => ({ destroy: vi.fn() })),
}));

describe("GameCanvas", () => {
  it("renders the game container", () => {
    renderWithProviders(<GameCanvas />);

    expect(screen.getByLabelText("Jumpy Square game")).toBeInTheDocument();
  });
});
