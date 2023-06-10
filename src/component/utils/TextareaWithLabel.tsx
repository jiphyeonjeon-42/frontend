import { useState, useEffect, useRef } from "react";
import colorPalette from "../../data/color";
import "../../css/TextareaWithLabel.css";

type Props = {
  wrapperClassName?: string;
  topLabelText?: string;
  topLabelColor?: string;
  textareaPlaceHolder?: string;
  textareaName?: string;
  textareaValue?: string;
  textareaDisabled?: boolean;
  setTextareaValue?(...args: unknown[]): unknown;
  isVisibleBottomMessage?: boolean;
  bottomMessageText?: string;
  bottomMessageColor?: string;
  isTextareaFocusedOnMount?: boolean;
};

const TextareaWithLabel = ({
  wrapperClassName,
  topLabelText,
  topLabelColor,
  textareaPlaceHolder,
  textareaName,
  textareaDisabled,
  textareaValue,
  setTextareaValue,
  isVisibleBottomMessage,
  bottomMessageText,
  bottomMessageColor,
  isTextareaFocusedOnMount,
}: Props) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  /* props로 넘겨받은 value와 세터가 유효하지 않으면 내부 상태 이용 */
  const [textarea, setTextarea] =
    typeof textareaValue === "string" && typeof setTextareaValue === "function"
      ? [textareaValue, setTextareaValue]
      : [text, setText];

  const color = string => {
    const colorClassName = colorPalette.find(i => i.string === string)?.class;
    return `color-${colorClassName}` || "color-54";
  };

  useEffect(() => {
    const { current } = textareaRef;
    if (isTextareaFocusedOnMount) {
      current?.focus();
    }
  }, []);

  const onChangeTextarea = e => {
    setTextarea(e.currentTarget.value);
  };

  return (
    <div className={`textarea__wrapper ${wrapperClassName}`}>
      <p className={`textarea__label ${color(topLabelColor)}`}>
        {topLabelText}
      </p>
      <textarea
        className="textarea__textarea"
        placeholder={textareaPlaceHolder}
        name={textareaName}
        value={textarea}
        onChange={onChangeTextarea}
        ref={textareaRef}
        disabled={textareaDisabled}
      />
      {bottomMessageText?.length > 0 && isVisibleBottomMessage && (
        <p className={`textarea__label ${color(bottomMessageColor)}`}>
          {bottomMessageText}
        </p>
      )}
    </div>
  );
};
export default TextareaWithLabel;

TextareaWithLabel.defaultProps = {
  wrapperClassName: "",
  topLabelText: "",
  topLabelColor: "red",
  textareaPlaceHolder: "",
  setTextareaValue: undefined,
  textareaName: "",
  textareaValue: undefined,
  textareaDisabled: false,
  isVisibleBottomMessage: true,
  bottomMessageText: "",
  bottomMessageColor: "red",
  isTextareaFocusedOnMount: true,
};
