import React from "react";
import PropTypes from "prop-types";
import "../../css/ModalFooter.css";

const ModalFooter = ({
  align,
  numberOfButtons,
  firstButtonOnClick,
  firstButtonText,
  firstButtonColor,
  secondButtonOnClick,
  secondButtonText,
  secondButtonColor,
}) => {
  const buttonAlign = () => {
    if (align === "center") return align;
    return "right";
  };
  const buttonColor = color => {
    const candidate = ["red", "grey"];
    if (candidate.includes(color)) return color;
    return "grey";
  };
  const buttonConfig = [
    {
      color: firstButtonColor,
      text: firstButtonText,
      onClick: firstButtonOnClick,
    },
    {
      color: secondButtonColor,
      text: secondButtonText,
      onClick: secondButtonOnClick,
    },
  ];

  return (
    <div className={`modal__footer ${buttonAlign()}`}>
      {buttonConfig.map((button, index) => {
        if (index > numberOfButtons - 1) return null;
        return (
          <button
            type="button"
            className={buttonColor(button.color)}
            onClick={button.onClick}
          >
            {button.text}
          </button>
        );
      })}
    </div>
  );
};

ModalFooter.propTypes = {
  align: PropTypes.string,
  numberOfButtons: PropTypes.number,
  firstButtonColor: PropTypes.string,
  firstButtonOnClick: PropTypes.func,
  firstButtonText: PropTypes.string,
  secondButtonColor: PropTypes.string,
  secondButtonOnClick: PropTypes.func,
  secondButtonText: PropTypes.string,
};

ModalFooter.defaultProps = {
  align: "right",
  numberOfButtons: 0,
  firstButtonColor: "red",
  firstButtonOnClick: undefined,
  firstButtonText: "확인하기",
  secondButtonColor: "grey",
  secondButtonOnClick: undefined,
  secondButtonText: "취소하기",
};

export default ModalFooter;
