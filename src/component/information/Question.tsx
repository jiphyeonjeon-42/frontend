import "../../asset/css/Question.css";
import Accordion from "../utils/Accordion";

type Props = {
  isOpen: boolean;
  question: string;
  answer: string;
  linkText?: string;
  link?: string;
};

const QnA = ({ isOpen, question, answer, linkText = "링크", link }: Props) => {
  const beforeLinkText = () => {
    if (answer.indexOf(linkText) === -1) return "";
    return answer.substring(0, answer.indexOf(linkText));
  };

  const afterLinkText = () => {
    if (answer.indexOf(linkText) === -1) return answer;
    return answer.substring(answer.indexOf(linkText) + linkText.length);
  };

  return (
    <div className="qna">
      <Accordion
        dependencyOpened={isOpen}
        summaryButtonClassName="qna__question"
        summaryIconType="plus"
        summaryIconClassName="question__icon"
        summaryUI={
          <span className="question__text font-20-bold color-54">
            {question}
          </span>
        }
        detailUI={
          <span className="qna__answer font-16 color-54">
            {beforeLinkText()}
            {link && (
              <a href={link} className="url_text">
                {linkText}
              </a>
            )}
            {afterLinkText()}
          </span>
        }
      />
    </div>
  );
};

export default QnA;
