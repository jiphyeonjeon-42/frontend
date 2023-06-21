import "../../css/Title.css";

export type Props = {
  titleKorean: string;
  titleEng: string;
};

export const Title = ({ titleKorean, titleEng }: Props) => {
  return (
    <div className="title">
      <span className="title__korean">{titleKorean}</span>
      <span className="title__eng">{titleEng}</span>
    </div>
  );
};

export default Title;
