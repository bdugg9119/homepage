function ResumeSectionHeading({ title }: { title: string }): React.ReactElement {
  return (
    <h2 className="mb-4 border-b border-base-700 pb-1 text-lg font-bold uppercase tracking-wider text-accent-400">
      {title}
    </h2>
  );
}

function ResumeSkills(): React.ReactElement {
  return (
    <section>
      <ResumeSectionHeading title="Technical Skills" />
      <div className="space-y-2 text-sm text-text-secondary">
        <p>
          <span className="font-semibold text-text-primary">AI & LLM Integration: </span>
          Streaming LLM Responses, Custom Tool Orchestration, Conversational UI, REST-Based LLM
          Pipelines, Prompt Engineering, GenAI Product Development
        </p>
        <p>
          <span className="font-semibold text-text-primary">Frontend & Testing: </span>
          React, TypeScript, JavaScript, HTML, CSS, Tailwind, Redux, RTK Query, Vite, Webpack,
          Storybook, Responsive Design, Accessibility (WCAG), Playwright, Cypress, Jest, React
          Testing Library
        </p>
        <p>
          <span className="font-semibold text-text-primary">Backend, Infra & Tools: </span>
          Node.js, PostgreSQL, REST APIs, OpenAPI, GraphQL, AWS, Docker, SSE, Git, CI/CD (GitHub
          Actions), Agile/Scrum, Design Systems, Performance Optimization, DataDog, MixPanel
        </p>
      </div>
    </section>
  );
}

export default ResumeSkills;
