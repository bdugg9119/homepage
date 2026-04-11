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
        Senior Frontend Engineer with 8+ years building complex, data-rich web applications in React
        and TypeScript. Sole frontend technical lead experienced in owning architecture, design
        systems, and component libraries for B2B SaaS platforms. Focused on performance
        optimization, accessibility, and scalable UI systems.
      </p>
    </header>
  );
}

export default ResumeHeader;
