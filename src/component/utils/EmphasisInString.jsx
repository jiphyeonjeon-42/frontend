import PropTypes from "prop-types";
import colorPalette from "../../data/color";

const EmphasisInString = ({ wholeString, emphasis, emphasisColor }) => {
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

EmphasisInString.propTypes = {
  wholeString: PropTypes.string.isRequired,
  emphasis: PropTypes.string,
  emphasisColor: PropTypes.string,
};

EmphasisInString.defaultProps = {
  emphasis: "",
  emphasisColor: "red",
};

export default EmphasisInString;
