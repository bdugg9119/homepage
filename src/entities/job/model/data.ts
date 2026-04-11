import type { Job } from "./types";

export const JOBS: Job[] = [
  {
    company: "Rockfish Data",
    role: "Staff Frontend Engineer",
    period: "2025 – Present",
    location: "Pittsburgh, PA",
    highlights: [
      "Architected the primary AI product interface for a B2B SaaS platform, building a streaming LLM chat experience with real-time token rendering, message history management, and graceful error recovery across model response lifecycles.",
      "Designed a custom tool orchestration layer enabling LLM-driven function calling, allowing the chat interface to trigger structured actions and surface dynamic data through modular tool definitions.",
      "Built a modular React/TypeScript component library for conversational AI interfaces, including streaming message components, tool-result renderers, and composable input patterns adaptable across product surfaces.",
      "Owned the full frontend domain as sole UI engineer, driving technical strategy across architecture, API integration, and CI/CD pipeline design with Playwright and Vite.",
      "Delivered a prioritized technical roadmap that resolved critical security vulnerabilities and improved build performance through Vite configuration optimizations.",
    ],
  },
  {
    company: "Syndio Solutions, Inc.",
    role: "Senior Software Engineer, Frontend",
    period: "2022 – 2025",
    location: "Seattle, WA",
    highlights: [
      "Frontend technical lead across a team of 8 engineers, owning the React application for a workplace equity analytics platform handling data ingest, configuration, validation, and storage.",
      "Replaced polling-based data architecture with Server-Sent Events (SSE) to resolve race conditions in real-time data flows, collaborating with backend engineers to design API contracts via OpenAPI.",
      "Increased end-to-end test coverage from 72% to 95% by leading a Cypress-to-Playwright migration, improving deployment confidence and reducing regression bugs.",
      "Reduced production bundle size by over 60% through CSS optimizations and performance profiling, establishing a foundation for fast, responsive data-heavy interfaces.",
      "Mentored junior engineers through code reviews and pairing sessions, fostering a team culture of trust, encouragement, and professional growth.",
    ],
  },
  {
    company: "Oratir, Inc.",
    role: "Software Engineer II",
    period: "2021 – 2022",
    location: "San Francisco, CA",
    highlights: [
      "Led a project team to prototype and build a desktop metaverse game launcher using Electron and React, navigating ambiguous requirements and emerging platform constraints.",
      "Stepped into a Technical Project Manager role to fill an organizational gap, coordinating between Product and Engineering leadership on scope, delivery, and blockchain platform integration.",
    ],
  },
  {
    company: "Idelic, Inc.",
    role: "Software Engineer II",
    period: "2019 – 2021",
    location: "Pittsburgh, PA",
    highlights: [
      "Migrated key React components from JavaScript to TypeScript, significantly reducing customer-facing bugs and improving deployment confidence.",
      "Built a compliance-monitoring dashboard visualizing FMCSA data with React and Victory charts, backed by a Python data pipeline and PostgreSQL for ingestion and storage.",
      "Drove improvements to the team's SDLC processes, resulting in more consistent sprint velocity and improved team retention.",
    ],
  },
  {
    company: "Freelance Web Developer",
    role: "Freelance",
    period: "2016 – 2019",
    location: "Pittsburgh, PA",
    highlights: [
      "Built and optimized websites for local businesses using WordPress, HTML/CSS, and JavaScript, consistently achieving top-3 search engine rankings through SEO best practices.",
    ],
  },
];
