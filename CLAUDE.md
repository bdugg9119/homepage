# Project: Brian's Portfolio / Homepage

## Stack

- Vite + React + TypeScript + Tailwind CSS v4

## Commands

- `npm run dev` — start dev server
- `npm run build` — typecheck then build
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` / `npm run format:check` — Prettier
- `npm run typecheck` — TypeScript compiler check
- `npm run test:run` — run Vitest once
- `npm run test:e2e` — run Playwright e2e tests
- Run `npm run lint`, `npm run typecheck`, and `npm run test:run` to verify changes before considering work complete.

## Architecture: Feature-Sliced Design (FSD)

The `src/` directory is organized into layers, each with slices and segments

```
src/
  app/          — Entrypoint, router, global styles (no slices)
  pages/        — Route-level screens (thin: compose widgets only)
  widgets/      — Self-contained UI blocks (navbar, hero, skill-grid, etc.)
  entities/     — Business domain objects with ui/, model/ segments (job, skill)
  shared/       — Project-agnostic UI primitives and utilities (ui/, lib/)
```

- **Import rule:** Code may only import from layers below it (app → pages → widgets → entities → shared). Never import from the same layer or above.
- Each slice exposes a public API via `index.ts` — always import through it, never reach into internal files.
- Segments: `ui/` (components), `model/` (types, data, logic), `lib/` (helpers), `config/` (constants).
- **Path alias:** Use `@/` for `src/` (e.g., `import { Navbar } from "@/widgets/navbar"`).

## Code Standards

- One React component per file, filename matches component name in PascalCase.
- **Keep files under 150 lines.** Split into focused modules if exceeded.
- Pages must be thin: only compose widgets — no domain logic or inline sub-components.
- Use **function declarations** for components (`function Foo()`), not arrow functions.
- Props must be defined as a named `type` above the component.
- Use explicit return types on exported functions and components.
- No non-null assertions (`!`) outside of `app/index.tsx`.
- No `console.log` — use `console.warn` or `console.error` only when necessary.
- Every image and interactive element must have accessible text (alt text, aria-labels).

### Naming

- Boolean variables/props: prefix with `is`, `has`, `should`, or `can`
- Event handlers: prefix with `handle` (e.g., `handleClick`), callback props with `on` (e.g., `onClick`)

### Tailwind

- No custom CSS except the `@theme` block in `app/global.css`.
- Extract a component for repeated class combinations — do not use `@apply`.

## Testing

### Unit Tests (Vitest + React Testing Library)

Test files live alongside code (e.g., `SkillCard.test.tsx` next to `SkillCard.tsx`).

- Use `renderWithProviders` from `@/test/render` for components needing routing context (NavLink, Link). Use plain `render` otherwise.
- Define a `DEFAULT_PROPS` const at the top of each describe block — override per test as needed.
- Never mock React components. Only mock external services/APIs/browser APIs.
- Avoid `waitFor` unless testing genuinely async behavior.

### E2E Tests (Playwright)

Test files live in `e2e/`, organized by page or user flow.

- Always use `{ exact: true }` with `getByText` when text could match multiple elements.
- Scope locators to a parent when the same text appears in multiple sections.
- Never use `page.waitForTimeout` — use auto-waiting assertions (`toBeVisible`, `toHaveURL`).
- Never use CSS selectors or XPath — always use semantic locators.
- Test downloads by awaiting `page.waitForEvent("download")` and asserting the filename.
