import { JobEntry, JOBS } from "@/entities/job";

function ResumeSectionHeading({ title }: { title: string }): React.ReactElement {
  return (
    <h2 className="mb-4 border-b border-base-700 pb-1 text-lg font-bold uppercase tracking-wider text-accent-400">
      {title}
    </h2>
  );
}

function ResumeExperience(): React.ReactElement {
  return (
    <section>
      <ResumeSectionHeading title="Work Experience" />
      <div className="space-y-6">
        {JOBS.map((job) => (
          <JobEntry key={`${job.company}-${job.period}`} {...job} />
        ))}
      </div>
    </section>
  );
}

export default ResumeExperience;
