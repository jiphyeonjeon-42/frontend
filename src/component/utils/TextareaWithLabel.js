import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import colorPalette from "../../data/color";
import "../../css/TextareaWithLabel.css";

const TextareaWithLabel = ({
  wrapperClassName,
  topLabelText,
  topLabelColor,
  textareaPlaceHolder,
  textareaValue,
  textareaDisabled,
  onChangeTextarea,
  bottomMessageText,
  bottomMessageColor,
  isTextareaFocusedOnMount,
}) => {
  const textareaRef = useRef(null);

  const color = string => {
    const colorClassName = colorPalette.find(i => i.string === string)?.class;
    return `color-${colorClassName}` || "color-54";
  };

  useEffect(() => {
    if (isTextareaFocusedOnMount) {
      textareaRef?.current.focus();
    }
  });

  return (
    <div className={`textarea__wrapper ${wrapperClassName}`}>
      <p className={`textarea__label ${color(topLabelColor)}`}>
        {topLabelText}
      </p>
      <textarea
        className="textarea__textarea"
        placeholder={textareaPlaceHolder}
        value={textareaValue}
        onChange={onChangeTextarea}
        ref={textareaRef}
        disabled={textareaDisabled}
      />
      <p className={`textarea__label ${color(bottomMessageColor)}`}>
        {bottomMessageText}
      </p>
    </div>
  );
};

export default TextareaWithLabel;

TextareaWithLabel.propTypes = {
  wrapperClassName: PropTypes.string,
  topLabelText: PropTypes.string,
  topLabelColor: PropTypes.string,
  textareaPlaceHolder: PropTypes.string,
  textareaValue: PropTypes.string.isRequired,
  textareaDisabled: PropTypes.bool,
  onChangeTextarea: PropTypes.func,
  bottomMessageText: PropTypes.string,
  bottomMessageColor: PropTypes.string,
  isTextareaFocusedOnMount: PropTypes.bool,
};

TextareaWithLabel.defaultProps = {
  wrapperClassName: "",
  topLabelText: "",
  topLabelColor: "red",
  textareaPlaceHolder: "",
  onChangeTextarea: () => {},
  textareaDisabled: false,
  bottomMessageText: "",
  bottomMessageColor: "red",
  isTextareaFocusedOnMount: true,
};
