import { JobCard, JOBS } from "@/entities/job";
import { SectionHeading } from "@/shared/ui";

function ExperienceList(): React.ReactElement {
  return (
    <section className="mt-20 w-full">
      <SectionHeading title="Experience" />
      <div className="flex flex-col gap-6">
        {JOBS.map((job) => (
          <JobCard key={`${job.company}-${job.period}`} {...job} />
        ))}
      </div>
    </section>
  );
}

export default ExperienceList;
