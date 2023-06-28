import colorPalette from "../../constant/color";
import "../../asset/css/TextWithLabel.css";

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
}: Props) => {
  const color = string => {
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
