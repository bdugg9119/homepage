import { ResumeDocument } from "@/widgets/resume-document";
import { DownloadButton } from "@/shared/ui";

const RESUME_PATH = "/Brian_Duggan_Resume.pdf";

function ResumePage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Resume</h1>
        <DownloadButton
          href={RESUME_PATH}
          filename="Brian_Duggan_Resume.pdf"
          label="Download PDF"
        />
      </div>
      <ResumeDocument />
    </div>
  );
}

export default ResumePage;
