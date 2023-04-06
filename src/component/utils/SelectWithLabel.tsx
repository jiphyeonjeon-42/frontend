import { useState, useEffect } from "react";
import "../../css/SelectWithLabel.css";

type SelectWithLabelProps = {
  wrapperClassName?: string;
  labelText?: string;
  selectName?: string;
  optionList: string[];
  initialSelectedIndex?: number;
  defaultText?: string;
  disabled?: boolean;
  align?: string;
  selectRef?: (...args: unknown[]) =>
    | unknown
    | {
        current?: Element;
      };
  resetDependency?: boolean;
};

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
}: SelectWithLabelProps) => {
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
