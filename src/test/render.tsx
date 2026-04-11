import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

function TestProviders({ children }: { children: React.ReactNode }): React.ReactElement {
  return <BrowserRouter>{children}</BrowserRouter>;
}

function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> {
  return render(ui, { wrapper: TestProviders, ...options });
}

export { renderWithProviders };
