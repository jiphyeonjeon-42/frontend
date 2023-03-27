import React from "react";
import "../../css/Title.css";

type Props = {
  titleKorean: string;
  titleEng: string;
};

const Title = ({ titleKorean, titleEng }: Props) => {
  return (
    <div className="title">
      <span className="title__korean">{titleKorean}</span>
      <span className="title__eng">{titleEng}</span>
    </div>
  );
};

export default Title;
