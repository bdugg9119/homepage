import type { Job } from "../model/types";

type JobEntryProps = Job;

function JobEntry({
  company,
  role,
  period,
  location,
  highlights,
}: JobEntryProps): React.ReactElement {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-bold text-text-primary">{company}</h3>
        <span className="text-sm text-text-muted">
          {location} &mdash; {period}
        </span>
      </div>
      <p className="mb-2 text-sm italic text-accent-400">{role}</p>
      <ul className="space-y-1.5">
        {highlights.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobEntry;
