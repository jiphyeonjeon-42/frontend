import React from "react";
import PropTypes from "prop-types";
import colorPalette from "../../data/color";
import "../../css/TextWithLabel.css";

const TextWithLabel = ({
  wrapperClassName,
  topLabelText,
  mainText,
  bottomLabelText,
  topLabelColor,
  mainTextColor,
  bottomLabelColor,
  size,
  isMainTextEllipsis,
}) => {
  const color = string => {
    const colorClassName = colorPalette.find(i => i.string === string)?.class;
    return `color-${colorClassName}` || "color-54";
  };

  console.log("this", bottomLabelText, bottomLabelText?.length);
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

TextWithLabel.propTypes = {
  wrapperClassName: PropTypes.string,
  topLabelText: PropTypes.string,
  mainText: PropTypes.string.isRequired,
  bottomLabelText: PropTypes.string,
  topLabelColor: PropTypes.string,
  mainTextColor: PropTypes.string,
  bottomLabelColor: PropTypes.string,
  size: PropTypes.string,
  isMainTextEllipsis: PropTypes.bool,
};

TextWithLabel.defaultProps = {
  wrapperClassName: null,
  topLabelText: null,
  bottomLabelText: null,
  topLabelColor: "red",
  mainTextColor: "darkgrey2",
  bottomLabelColor: "darkgrey2",
  size: "normal",
  isMainTextEllipsis: false,
};
