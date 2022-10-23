import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../css/InputWithLabel.css";

const InputWithLabel = ({
  wrapperClassName,
  labelText,
  inputInitialValue,
  inputType,
  isAutoComplete,
  disabled,
  align,
  inputRef,
  resetDependency,
}) => {
  const [inputValue, setInput] = useState(inputInitialValue);

  const alignType = () => {
    const candidate = ["horizontal", "vertical"];
    if (candidate.includes(align)) return align;
    return "horizontal";
  };

  const onChange = event => {
    const { value } = event.currentTarget;
    setInput(value);
  };

  const replaceTextWhenInvalidType = () => {
    const condidate = ["text", "date"];
    if (
      !condidate.includes(inputType) ||
      (inputType === "date" && disabled && inputValue === "-")
    )
      return "text";
    return inputType;
  };

  useEffect(() => {
    setInput(inputInitialValue || "");
  }, [resetDependency]);

  return (
    <div className={`input__wrapper ${alignType()} ${wrapperClassName} `}>
      {labelText?.length > 0 && (
        <span className="input__label">{labelText}</span>
      )}
      <input
        className="input__input"
        type={replaceTextWhenInvalidType()}
        autoComplete={isAutoComplete ? "on" : "off"}
        value={inputValue}
        onChange={onChange}
        ref={inputRef}
        disabled={disabled}
      />
    </div>
  );
};

InputWithLabel.propTypes = {
  wrapperClassName: PropTypes.string,
  labelText: PropTypes.string,
  inputInitialValue: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  inputType: PropTypes.string,
  align: PropTypes.string,
  disabled: PropTypes.bool,
  isAutoComplete: PropTypes.bool,
  inputRef: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.instanceOf(PropTypes.element),
  ]),
  resetDependency: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

InputWithLabel.defaultProps = {
  wrapperClassName: "",
  labelText: "",
  inputInitialValue: undefined,
  inputType: "text",
  align: "horizontal",
  disabled: false,
  isAutoComplete: false,
  inputRef: { current: null },
  resetDependency: undefined,
};

export default InputWithLabel;
