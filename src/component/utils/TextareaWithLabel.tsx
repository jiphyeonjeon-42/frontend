import { useState, useEffect, useRef } from "react";
import colorPalette from "../../constant/color";
import "../../asset/css/TextareaWithLabel.css";

type Props = {
  wrapperClassName?: string;
  topLabelText?: string;
  topLabelColor?: string;
  textareaPlaceHolder?: string;
  textareaName?: string;
  textareaValue?: string;
  textareaDisabled?: boolean;
  setTextareaValue(...args: unknown[]): unknown;
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
  const textareaRef = useRef(null);

  const color = (string : string) => {
    const colorClassName = colorPalette.find(i => i.string === string)?.class;
    return `color-${colorClassName}` || "color-54";
  };

  useEffect(() => {
    const { current } = textareaRef;
    if (isTextareaFocusedOnMount) {
      current && current.focus();
    }
  }, []);

  const onChangeTextarea = (e : React.ChangeEvent<HTMLTextAreaElement> )=> {
    setTextareaValue(e.currentTarget.value);
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
        onChange={onChangeTextarea}
        ref={textareaRef}
        disabled={textareaDisabled}
      />
      { bottomMessageText?.length && bottomMessageText?.length > 0 && isVisibleBottomMessage && (
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
