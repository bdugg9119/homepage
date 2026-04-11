import { Hero } from "@/widgets/hero";
import { SkillGrid } from "@/widgets/skill-grid";
import { ExperienceList } from "@/widgets/experience-list";

function HomePage(): React.ReactElement {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20">
      <Hero />
      <SkillGrid />
      <ExperienceList />
    </div>
  );
}

export default HomePage;
