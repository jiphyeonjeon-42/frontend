import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Plus from "../../img/plus_icon_off.svg";
import Minus from "../../img/plus_icon_on.svg";
import "../../css/Question.css";

const QnA = ({ isOpen, question, answer, link }) => {
  const [onOff, setOnOff] = useState(isOpen);

  const clickQNA = () => {
    setOnOff(!onOff);
  };

  useEffect(() => {
    setOnOff(isOpen);
  }, [isOpen]);

  return (
    <div className="qna">
      <button className="qna__question" type="button" onClick={clickQNA}>
        <img
          src={onOff ? Minus : Plus}
          className="question__icon"
          alt="question"
        />
        <span className="question__text font-20-bold color-54">{question}</span>
      </button>
      {onOff ? (
        <span className="qna__answer font-16 color-54">
          <a href={link} className={`${link ? "url_text" : "display-none"}`}>
            링크
          </a>
          {answer}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

QnA.defaultProps = {
  link: false,
};

QnA.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  link: PropTypes.bool,
};

export default QnA;
