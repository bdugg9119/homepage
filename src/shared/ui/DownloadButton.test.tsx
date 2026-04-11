import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DownloadButton from "./DownloadButton";

describe("DownloadButton", () => {
  const DEFAULT_PROPS = {
    href: "/test.pdf",
    filename: "test.pdf",
    label: "Download PDF",
  };

  it("renders as a link with the correct href", () => {
    render(<DownloadButton {...DEFAULT_PROPS} />);

    const link = screen.getByRole("link", { name: /download pdf/i });
    expect(link).toHaveAttribute("href", "/test.pdf");
  });

  it("sets the download attribute to the filename", () => {
    render(<DownloadButton {...DEFAULT_PROPS} />);

    const link = screen.getByRole("link", { name: /download pdf/i });
    expect(link).toHaveAttribute("download", "test.pdf");
  });

  it("renders the label text", () => {
    render(<DownloadButton {...DEFAULT_PROPS} label="Get Resume" />);

    expect(screen.getByRole("link", { name: /get resume/i })).toBeInTheDocument();
  });
});
