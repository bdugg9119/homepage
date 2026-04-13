import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "@/test/render";
import GamePage from "./GamePage";

vi.mock("@/widgets/game-canvas", () => ({
  GameCanvas: function MockGameCanvas(): React.ReactElement {
    return <div aria-label="Jumpy Square game" />;
  },
}));

describe("GamePage", () => {
  it("renders the game canvas", () => {
    renderWithProviders(<GamePage />);

    expect(screen.getByLabelText("Jumpy Square game")).toBeInTheDocument();
  });
});
