/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import colorPalette from "../../data/color";
import "../../css/TextWithLabel.css";

type Props = {
  wrapperClassName?: string;
  topLabelText?: string;
  mainText: string;
  bottomLabelText?: string;
  topLabelColor?: string;
  mainTextColor?: string;
  bottomLabelColor?: string;
  size?: string;
  isMainTextEllipsis?: boolean;
};

const defaultProps = {
  wrapperClassName: null,
  topLabelText: null,
  bottomLabelText: null,
  topLabelColor: "red",
  mainTextColor: "darkgrey2",
  bottomLabelColor: "darkgrey2",
  size: "normal",
  isMainTextEllipsis: false,
};

const TextWithLabel = (props: Props) => {
  const {
    wrapperClassName,
    topLabelText,
    mainText,
    bottomLabelText,
    topLabelColor,
    mainTextColor,
    bottomLabelColor,
    size,
    isMainTextEllipsis,
  } = { ...defaultProps, ...props };

  const color = (string: string) => {
    const colorClassName = colorPalette.find(i => i.string === string)?.class;
    return `color-${colorClassName}` || "color-54";
  };

  const textSizeCandidate = ["normal"];
  const textSize = textSizeCandidate.includes(size) ? size : "normal";
  const ellipsis = isMainTextEllipsis ? "ellipsis" : "";

  return (
    <div className={`text__wrapper ${wrapperClassName}`}>
      {topLabelText?.length && (
        <p className={`text__label ${color(topLabelColor)}`}>{topLabelText}</p>
      )}
      <p
        className={`text__main-text
          ${color(mainTextColor)} ${textSize} ${ellipsis}`}
      >
        {mainText}
      </p>
      {bottomLabelText?.length && (
        <p className={`text__label ${color(bottomLabelColor)}`}>
          {bottomLabelText}
        </p>
      )}
    </div>
  );
};

export default TextWithLabel;
