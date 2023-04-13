import "../../css/Title.css";

type TitleProps = {
  titleKorean: string;
  titleEng: string;
};

const Title = ({ titleKorean, titleEng }: TitleProps) => {
  return (
    <div className="title">
      <span className="title__korean">{titleKorean}</span>
      <span className="title__eng">{titleEng}</span>
    </div>
  );
};

export default Title;
