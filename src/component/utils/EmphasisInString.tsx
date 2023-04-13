import colorPalette from "../../data/color";

type EmphasisInStringProps = {
  wholeString: string;
  emphasis?: string;
  emphasisColor?: string;
};

const EmphasisInString = ({
  wholeString,
  emphasis,
  emphasisColor,
}: EmphasisInStringProps) => {
  const colorCode = colorPalette.find(i => i.string === emphasisColor)?.code;
  const emphasisPosition = wholeString.indexOf(emphasis);
  const isAvailableEmphasis = emphasis.length && emphasisPosition > 0;

  if (!isAvailableEmphasis) {
    return <>{wholeString}</>;
  }
  return (
    <>
      {wholeString.substring(0, emphasisPosition)}
      <span style={{ color: colorCode }}>{emphasis}</span>
      {wholeString.substring(emphasisPosition + emphasis.length)}
    </>
  );
};

EmphasisInString.defaultProps = {
  emphasis: "",
  emphasisColor: "red",
};

export default EmphasisInString;
