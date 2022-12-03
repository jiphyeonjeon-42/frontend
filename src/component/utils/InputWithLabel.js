import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../css/InputWithLabel.css";

const InputWithLabel = ({
  wrapperClassName,
  labelText,
  inputInitialValue,
  inputType,
  onChangeCallBack,
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
    onChangeCallBack(value);
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
  onChangeCallBack: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  resetDependency: PropTypes.bool,
};

InputWithLabel.defaultProps = {
  wrapperClassName: "",
  labelText: "",
  inputInitialValue: undefined,
  inputType: "text",
  align: "horizontal",
  disabled: false,
  isAutoComplete: false,
  onChangeCallBack: () => {},
  inputRef: { current: null },
  resetDependency: undefined,
};

export default InputWithLabel;
