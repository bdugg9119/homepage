type SectionHeadingProps = {
  title: string;
};

function SectionHeading({ title }: SectionHeadingProps): React.ReactElement {
  return (
    <h2 className="mb-6 text-center text-2xl font-bold text-text-primary">{title}</h2>
  );
}

export default SectionHeading;
