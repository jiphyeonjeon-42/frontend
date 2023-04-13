import PropTypes from "prop-types";
import "../../css/SpanWithLabel.css";

const SpanWithLabel = ({ wrapperClassName, labelText, value, align }) => {
  const alignType = () => {
    const candidate = ["horizontal", "vertical"];
    if (candidate.includes(align)) return align;
    return "horizontal";
  };
  return (
    <div className={`span__wrapper ${alignType()} ${wrapperClassName} `}>
      {labelText?.length > 0 && (
        <label className="span__label" htmlFor="text">
          {labelText}
        </label>
      )}
      <span id="text" className="span__text">
        {value}
      </span>
    </div>
  );
};

export default SpanWithLabel;

SpanWithLabel.propTypes = {
  wrapperClassName: PropTypes.string,
  labelText: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  align: PropTypes.string,
};

SpanWithLabel.defaultProps = {
  wrapperClassName: "",
  labelText: "",
  align: "",
  value: "",
};
