import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "../utils/Image";
import Plus from "../../img/plus_icon_off.svg";
import Minus from "../../img/plus_icon_on.svg";
import "../../css/Question.css";

const QnA = ({ isOpen, question, answer, linkText, link }) => {
  const [onOff, setOnOff] = useState(isOpen);

  useEffect(() => {
    setOnOff(isOpen);
  }, [isOpen]);

  const clickQNA = () => {
    setOnOff(!onOff);
  };

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
      <button className="qna__question" type="button" onClick={clickQNA}>
        <Image
          src={onOff ? Minus : Plus}
          className="question__icon"
          alt="question"
        />
        <span className="question__text font-20-bold color-54">{question}</span>
      </button>
      {onOff && (
        <span className="qna__answer font-16 color-54">
          {beforeLinkText()}
          {link && (
            <a href={link} className="url_text">
              {linkText}
            </a>
          )}
          {afterLinkText()}
        </span>
      )}
    </div>
  );
};

QnA.defaultProps = {
  linkText: "링크",
  link: false,
};

QnA.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  link: PropTypes.bool,
};

export default QnA;
