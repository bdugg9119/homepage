function ResumeHeader(): React.ReactElement {
  return (
    <header className="border-b border-base-700 pb-6 text-center">
      <h1 className="mb-1 text-3xl font-bold text-text-primary">Brian Duggan</h1>
      <p className="text-sm text-text-muted">
        <a href="mailto:BrianDuggan@pm.me" className="hover:text-accent-400">
          BrianDuggan@pm.me
        </a>
        {" | (412) 757-1715 | Pittsburgh, PA"}
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
      Software Engineer with 10+ years building complex, data-rich web applications. Experienced shipping AI-powered product interfaces with streaming LLM
      integrations, agentic workflows, custom tool orchestration, and conversational UI systems. Technical leader
        skilled in owning architecture, design systems, and component libraries. Focused on
        performance optimization, accessibility, and scalable UI systems that accelerate product
        delivery.
      </p>
    </header>
  );
}

export default ResumeHeader;
