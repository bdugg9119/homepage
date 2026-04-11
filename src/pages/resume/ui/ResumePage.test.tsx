import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/test/render";
import ResumePage from "./ResumePage";

describe("ResumePage", () => {
  it("renders the page title", () => {
    renderWithProviders(<ResumePage />);

    expect(screen.getByRole("heading", { level: 1, name: /^resume$/i })).toBeInTheDocument();
  });

  it("renders the download button", () => {
    renderWithProviders(<ResumePage />);

    const downloadLink = screen.getByRole("link", { name: /download pdf/i });
    expect(downloadLink).toHaveAttribute("href", "/Brian_Duggan_Resume.pdf");
    expect(downloadLink).toHaveAttribute("download", "Brian_Duggan_Resume.pdf");
  });

  it("renders the resume document with name heading", () => {
    renderWithProviders(<ResumePage />);

    const headings = screen.getAllByRole("heading", { name: /brian duggan/i });
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });
});
