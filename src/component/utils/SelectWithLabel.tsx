import {
  useState,
  useEffect,
  HTMLProps,
  forwardRef,
  ChangeEventHandler,
} from "react";
import "../../asset/css/SelectWithLabel.css";

type Props = {
  wrapperClassName?: string;
  labelText?: string;
  selectName?: string;
  optionList: string[];
  initialSelectedIndex?: number;
  defaultText?: string;
  disabled?: boolean;
  align?: "horizontal" | "vertical";
  resetDependency?: boolean;
} & HTMLProps<HTMLSelectElement>;

const SelectWithLabel = forwardRef<HTMLSelectElement, Props>(
  (
    {
      wrapperClassName,
      labelText,
      selectName = "select",
      optionList,
      initialSelectedIndex,
      defaultText,
      align = "horizontal",
      resetDependency,
      ...props
    },
    ref,
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
    useEffect(() => setSelectedIndex(initialSelectedIndex), [resetDependency]);

    const onChangeSelect: ChangeEventHandler<HTMLSelectElement> = e => {
      setSelectedIndex(parseInt(e.currentTarget.value, 10));
    };

    return (
      <div className={`select__wrapper ${align} ${wrapperClassName}`}>
        {labelText && (
          <label htmlFor={selectName} className="select__label">
            {labelText}
          </label>
        )}
        <select
          {...props}
          className="select__select"
          onChange={onChangeSelect}
          name={selectName}
          value={selectedIndex}
          defaultValue={selectedIndex}
          ref={ref}
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
  },
);

export default SelectWithLabel;
