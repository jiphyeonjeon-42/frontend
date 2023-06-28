import { useState, useEffect, HTMLProps, HTMLInputTypeAttribute } from "react";
import "../../asset/css/InputWithLabel.css";

type Props = {
  wrapperClassName?: string;
  labelText?: string;
  inputInitialValue?: string | number;
  inputType?: Extract<HTMLInputTypeAttribute, "text" | "date">;
  align?: "horizontal" | "vertical";
  onChangeCallBack?: (value: string) => void;
  resetDependency?: boolean;
} & HTMLProps<HTMLInputElement>;

const InputWithLabel = ({
  wrapperClassName,
  labelText,
  inputInitialValue,
  inputType = "text",
  onChangeCallBack = () => {},
  disabled = false,
  align = "horizontal",
  resetDependency = false,
  ...props
}: Props) => {
  const [inputValue, setInput] = useState(inputInitialValue);

  useEffect(() => {
    setInput(inputInitialValue ?? "");
  }, [resetDependency]);

  const replaceTextWhenInvalidType = () => {
    if (inputType === "date" && disabled && inputValue === "-") return "text";
    return inputType;
  };

  return (
    <div className={`input__wrapper ${align} ${wrapperClassName} `}>
      {labelText && labelText.length > 0 && (
        <span className="input__label">{labelText}</span>
      )}
      <input
        {...props}
        className="input__input"
        type={replaceTextWhenInvalidType()}
        value={inputValue}
        onChange={({ currentTarget: { value } }) => {
          setInput(value);
          onChangeCallBack(value);
        }}
        disabled={disabled}
      />
    </div>
  );
};

export default InputWithLabel;
