import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../css/SelectWithLabel.css";

type Props = {
  wrapperClassName?: string;
  labelText?: string;
  selectName?: string;
  optionList: string[];
  initialSelectedIndex?: number;
  defaultText?: string;
  disabled?: boolean;
  align?: string;
  selectRef?: React.RefObject<HTMLSelectElement>;
  resetDependency?: boolean;
};

const defaultProps = {
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

const SelectWithLabel = (props: Props) => {
  const {
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
  } = { ...defaultProps, ...props };

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
        defaultValue={selectedIndex}
        disabled={disabled}
        ref={selectRef}
      >
        {defaultText && <option>{defaultText}</option>}
        {optionList.map((optionString, index) => {
          return (
            <option key={optionString} value={index}>
              {optionString}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectWithLabel;
