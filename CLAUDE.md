# Project: Brian's Portfolio / Homepage

## Stack

- Vite + React + TypeScript + Tailwind CSS v4

## Commands

- `npm run dev` — start dev server
- `npm run build` — typecheck then build
- `npm run lint` — run ESLint
- `npm run lint:fix` — auto-fix ESLint issues
- `npm run format` — format with Prettier
- `npm run format:check` — check formatting
- `npm run typecheck` — run TypeScript compiler check
- `npm run test` — run Vitest in watch mode
- `npm run test:run` — run Vitest once (CI-friendly)
- `npm run test:coverage` — run Vitest with coverage report
- `npm run test:e2e` — run Playwright end-to-end tests
- `npm run test:e2e:ui` — run Playwright with interactive UI

## Code Standards (strictly enforced)

### Architecture: Feature-Sliced Design (FSD)

This project follows [Feature-Sliced Design](https://fsd.how). The `src/` directory is organized into layers, each with slices and segments:

```
src/
  app/          — Entrypoint, router, global styles (no slices)
  pages/        — Route-level screens (thin: compose widgets only)
  widgets/      — Self-contained UI blocks (navbar, hero, skill-grid, etc.)
  entities/     — Business domain objects with ui/, model/ segments (job, skill)
  shared/       — Project-agnostic UI primitives and utilities (ui/, lib/)
```

**Layer import rules (strictly enforced):**
- Code may only import from layers **below** it: app → pages → widgets → entities → shared
- Code may **never** import from the same layer or above
- Each slice exposes a public API via `index.ts` — always import through it, never reach into internal files

**Segments within slices:**
- `ui/` — React components
- `model/` — Types, data, business logic
- `lib/` — Internal helpers
- `config/` — Constants, feature flags

**Path alias:** Use `@/` to reference `src/` (e.g., `import { Navbar } from "@/widgets/navbar"`).

### File & Component Organization

- One React component per file. The file name must match the component name in PascalCase (e.g., `ContactForm.tsx` exports `ContactForm`).
- Keep files under 150 lines. If a file grows beyond that, split it into smaller, focused modules.
- Page components must be thin: only compose widgets — no domain logic, no sub-components defined inline.

### TypeScript

- Use explicit return types on all exported functions and components.
- Prefer `type` over `interface` unless extending is needed.
- No `any`. Use `unknown` and narrow with type guards if the type is truly unknown.
- No type assertions (`as`) unless absolutely unavoidable, and add a comment explaining why.
- No non-null assertions (`!`) outside of the one in `app/index.tsx` for `getElementById`.

### React

- Use function declarations (`function Foo()`) for components, not arrow functions assigned to variables.
- Props must be defined as a named `type` above the component (e.g., `type CardProps = { ... }`).
- No inline styles. Use Tailwind classes exclusively.
- Extract event handlers into named functions — no complex inline lambdas in JSX.
- Colocate hooks near the top of the component body, before any early returns.

### Styling (Tailwind)

- Use Tailwind utility classes only. No custom CSS except for the Tailwind import and `@theme` block in `app/global.css`.
- For repeated class combinations, extract a component — do not use `@apply`.
- Keep className strings readable: group related utilities (layout, spacing, typography, color) on separate lines if they get long.

### Naming

- Components & types: PascalCase
- Functions & variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Boolean variables/props: prefix with `is`, `has`, `should`, or `can`
- Event handlers: prefix with `handle` (e.g., `handleClick`), callback props with `on` (e.g., `onClick`)

### General

- No `console.log` — use `console.warn` or `console.error` only when necessary.
- No commented-out code. Delete it; git has history.
- No TODO comments without a linked issue or clear plan.
- Prefer early returns over nested conditionals.
- Every image and interactive element must have accessible text (alt text, aria-labels).
- Run `npm run lint`, `npm run typecheck`, and `npm run test:run` to verify changes before considering work complete.

### Testing — Unit Tests (Vitest + React Testing Library)

Unit test files live alongside the code they test (e.g., `SkillCard.test.tsx` next to `SkillCard.tsx`).

**What to test:**
- Every exported component must have a corresponding `.test.tsx` file.
- Every data module (e.g., `model/data.ts`) must have a corresponding `.test.ts` file.
- Test **behavior and rendered output**, not implementation details (no testing internal state, no snapshot tests).

**How to write tests:**
- Use `describe` blocks grouped by component/module name.
- Each `it`/`test` block should test **one specific behavior** with a clear, readable name.
- Query elements using accessible roles and labels (`getByRole`, `getByLabelText`) as the first choice. Use `getByText` only when no semantic role exists.
- Use `renderWithProviders` from `@/test/render` for any component that needs routing context (NavLink, Link, etc.). Use plain `render` for components that don't need providers.
- Define a `DEFAULT_PROPS` const at the top of each describe block for components with props — override specific props per test as needed.
- Never use `container.querySelector` or `container.innerHTML` for assertions unless absolutely no accessible query is possible.
- Never mock React components. Only mock external services, APIs, or browser APIs when necessary.
- Avoid `waitFor` unless testing genuinely async behavior (data fetching, timers). Most RTL renders are synchronous.

### Testing — End-to-End Tests (Playwright)

E2E test files live in the `e2e/` directory, organized by page or user flow (e.g., `navigation.spec.ts`, `home.spec.ts`).

**What to test:**
- Every page must have an e2e spec verifying its critical content renders.
- Navigation flows between pages must be tested.
- Interactive features (downloads, form submissions, modals) must be tested for real user behavior.

**How to write tests:**
- Use Playwright's built-in locators: `getByRole`, `getByLabel`, `getByText` — prefer role-based queries.
- Always use `{ exact: true }` with `getByText` when the text could match multiple elements on the page.
- Scope locators to a parent when the same text appears in multiple sections (e.g., `page.locator("nav").getByRole(...)`).
- Use `test.beforeEach` for common setup like `page.goto`.
- Never use `page.waitForTimeout` — use Playwright's auto-waiting assertions (`toBeVisible`, `toHaveURL`, etc.).
- Never use CSS selectors or XPath — always use semantic locators.
- Test the download flow by awaiting `page.waitForEvent("download")` and asserting the suggested filename.
