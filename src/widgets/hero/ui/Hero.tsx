function Hero(): React.ReactElement {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 inline-flex items-center rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-sm font-medium text-accent-400">
        Software Engineer
      </div>

      <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-text-primary sm:text-6xl">
        Brian Duggan
      </h1>

      <p className="mb-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
        Software Engineer with 10+ years building complex, data-rich web applications in React and
        TypeScript. Experienced shipping AI-powered product interfaces with streaming LLM
        integrations, custom tool orchestration, and conversational UI systems.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-text-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="text-accent-500">
            &#9679;
          </span>
          Pittsburgh, PA
        </span>
        <span className="text-base-700">|</span>
        <a href="mailto:BrianDuggan@pm.me" className="transition-colors hover:text-accent-400">
          BrianDuggan@pm.me
        </a>
      </div>
    </div>
  );
}

export default Hero;
