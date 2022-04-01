import React, { useState } from "react";
import PropTypes from "prop-types";
import Plus from "../../img/plus_icon_off.svg";
import Minus from "../../img/plus_icon_on.svg";
import "../../css/Question.css";

const QnA = ({ isOpen, question, answer, link }) => {
  const [onOff, setOnOff] = useState(isOpen);
  const clickQNA = () => {
    setOnOff(!onOff);
  };
  return (
    <div className="qna">
      <button className="qna__question" type="button" onClick={clickQNA}>
        <img
          src={onOff ? Minus : Plus}
          className="question__icon"
          alt="question"
        />
        <span className="question__text font-28-bold color-54">{question}</span>
      </button>
      {onOff ? (
        <span className="qna__answer font-18 color-54">
          <a href="/" className={`${!link && "display-none"}`}>
            클릭
          </a>
          {answer}
        </span>
      ) : (
        ""
      )}
      <div className="qna__line" />
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
