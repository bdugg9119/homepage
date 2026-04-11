import type { Job } from "../model/types";

type JobCardProps = Job;

function JobCard({
  company,
  role,
  period,
  location,
  highlights,
}: JobCardProps): React.ReactElement {
  return (
    <div className="rounded-xl border border-base-800 bg-surface-raised p-6">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-text-primary">{company}</h3>
          <p className="text-sm font-medium text-accent-400">{role}</p>
        </div>
        <div className="text-right text-sm text-text-muted">
          <p>{period}</p>
          <p>{location}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {highlights.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobCard;
