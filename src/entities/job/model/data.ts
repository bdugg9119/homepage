import type { Job } from "./types";

export const JOBS: Job[] = [
  {
    company: "Rockfish Data",
    role: "Staff Frontend Engineer",
    period: "2025 - Present",
    location: "Pittsburgh, PA",
    highlights: [
      "Architected and delivered an AI-driven chat interface as the primary frontend for a B2B SaaS platform, building a modular React/TypeScript component library with REST-integrated LLM features powering core product functionality.",
      "Owned the full frontend domain as sole UI engineer, driving technical strategy across React application architecture, API design, and component library development.",
      "Established end-to-end testing infrastructure with Playwright and designed CI/CD pipelines with standardized build tooling using Vite.",
      "Delivered a prioritized technical roadmap that resolved critical security vulnerabilities and improved build performance through Vite configuration optimizations.",
    ],
  },
  {
    company: "Syndio Solutions, Inc.",
    role: "Senior Software Engineer, Frontend",
    period: "2022 - 2025",
    location: "Seattle, WA",
    highlights: [
      "Served as frontend technical lead across a team of 8 engineers, owning the React application for a workplace equity analytics platform handling data ingest, configuration, validation, and storage.",
      "Replaced a polling-based data architecture with Server-Sent Events (SSE) to resolve race conditions in real-time data flows, collaborating with backend engineers to design API contracts via OpenAPI.",
      "Increased end-to-end test coverage from 72% to 95% by leading a migration from Cypress to Playwright, improving deployment confidence and reducing regression bugs.",
      "Reduced production bundle size by over 60% through CSS optimizations and performance profiling.",
      "Mentored junior engineers through code reviews and pairing sessions, fostering a team culture of trust, encouragement, and professional growth.",
    ],
  },
  {
    company: "Oratir, Inc.",
    role: "Software Engineer II, Frontend",
    period: "2021 - 2022",
    location: "San Francisco, CA",
    highlights: [
      "Led a project team to prototype and build a desktop metaverse game launcher using Electron and React.",
      "Stepped into a Technical Project Manager role to fill an organizational gap, coordinating between Product and Engineering leadership on scope, delivery, and blockchain platform integration.",
    ],
  },
  {
    company: "Idelic, Inc.",
    role: "Software Engineer II, Frontend",
    period: "2019 - 2021",
    location: "Pittsburgh, PA",
    highlights: [
      "Migrated key React components from JavaScript to TypeScript, significantly reducing customer-facing bugs and improving deployment confidence.",
      "Built a compliance-monitoring dashboard visualizing FMCSA data using React and Victory charts, with a Python-based data pipeline and PostgreSQL for ingestion and storage.",
      "Drove improvements to the team's SDLC processes, resulting in more consistent sprint velocity and improved team retention.",
    ],
  },
  {
    company: "Freelance Web Developer",
    role: "Freelance",
    period: "2016 - 2019",
    location: "Pittsburgh, PA",
    highlights: [
      "Built and optimized websites for local businesses using WordPress, HTML/CSS, and JavaScript, consistently achieving top-3 search engine rankings through SEO best practices.",
    ],
  },
];
