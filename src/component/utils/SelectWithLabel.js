import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../css/SelectWithLabel.css";

const SelectWithLabel = ({
  wrapperClassName,
  labelText,
  selectName,
  optionList,
  initialSelectedIndex,
  defaultText,
  disabled,
  align,
  selectRef,
  resetDependency,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

  const alignType = () => {
    const candidate = ["horizontal", "vertical"];
    if (candidate.includes(align)) return align;
    return "horizontal";
  };

  const onChangeSelect = e => {
    setSelectedIndex(e.currentTarget.value);
  };
  useEffect(() => {
    setSelectedIndex(initialSelectedIndex);
  }, [resetDependency]);

  return (
    <div className={`select__wrapper ${alignType()} ${wrapperClassName}`}>
      {labelText && (
        <label htmlFor={selectName} className="select__label">
          {labelText}
        </label>
      )}
      <select
        className="select__select"
        onChange={onChangeSelect}
        name={selectName}
        disabled={disabled}
        ref={selectRef}
      >
        {defaultText && <option>{defaultText}</option>}
        {optionList.map((optionString, index) => {
          const isSelected = index === selectedIndex;
          return (
            <option value={index} selected={isSelected}>
              {optionString}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectWithLabel;

SelectWithLabel.propTypes = {
  wrapperClassName: PropTypes.string,
  labelText: PropTypes.string,
  selectName: PropTypes.string,
  optionList: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSelectedIndex: PropTypes.number,
  defaultText: PropTypes.string,
  disabled: PropTypes.bool,
  align: PropTypes.string,
  selectRef: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.instanceOf(PropTypes.element),
  ]),
  resetDependency: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

SelectWithLabel.defaultProps = {
  wrapperClassName: "",
  selectName: "select",
  labelText: "",
  initialSelectedIndex: undefined,
  defaultText: undefined,
  disabled: false,
  align: "horizontal",
  selectRef: { current: null },
  resetDependency: undefined,
};
