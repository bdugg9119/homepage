import type { SkillCategory } from "../model/types";

type SkillCardProps = SkillCategory;

function SkillCard({ title, skills }: SkillCardProps): React.ReactElement {
  return (
    <div className="rounded-xl border border-base-800 bg-surface-raised p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-400">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-base-700 bg-base-800 px-3 py-1 text-sm text-text-secondary"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillCard;
