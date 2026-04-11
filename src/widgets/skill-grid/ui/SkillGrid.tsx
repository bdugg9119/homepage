import { SkillCard, type SkillCategory } from "@/entities/skill";
import { SectionHeading } from "@/shared/ui";

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend & Testing",
    skills: [
      "React",
      "TypeScript",
      "Tailwind",
      "Redux / RTK Query",
      "Vite",
      "Storybook",
      "Playwright",
      "Jest",
    ],
  },
  {
    title: "Backend & Infrastructure",
    skills: [
      "Node.js",
      "PostgreSQL",
      "REST / GraphQL",
      "AWS",
      "Docker",
      "CI/CD",
      "DataDog",
      "GenAI / LLM",
    ],
  },
];

function SkillGrid(): React.ReactElement {
  return (
    <section className="mt-20 w-full">
      <SectionHeading title="Technical Skills" />
      <div className="grid gap-6 sm:grid-cols-2">
        {SKILL_CATEGORIES.map((category) => (
          <SkillCard key={category.title} title={category.title} skills={category.skills} />
        ))}
      </div>
    </section>
  );
}

export default SkillGrid;
