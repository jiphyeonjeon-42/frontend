import "../../css/SubTitle.css";

type SubTitleProps = {
  subTitle: string;
  description: string;
  alignItems: string;
};

const SubTitle = ({ subTitle, description, alignItems }: SubTitleProps) => {
  return (
    <div className={`subtitle-${alignItems}`}>
      <div className="subtitle__line" />
      <span className="subtitle__title">{subTitle}</span>
      <span className="subtitle__description">{description}</span>
    </div>
  );
};

export default SubTitle;
