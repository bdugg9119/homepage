import ResumeHeader from "./ResumeHeader";
import ResumeSkills from "./ResumeSkills";
import ResumeExperience from "./ResumeExperience";

function ResumeDocument(): React.ReactElement {
  return (
    <div className="rounded-xl border border-base-800 bg-surface-raised p-8 shadow-lg sm:p-10">
      <div className="space-y-8">
        <ResumeHeader />
        <ResumeSkills />
        <ResumeExperience />
      </div>
    </div>
  );
}

export default ResumeDocument;
