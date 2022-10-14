import React from "react";
import PropTypes from "prop-types";
import colorPalette from "../../data/color";
import "../../css/Button.css";

const Button = ({ value, className, onClick, disabled, color }) => {
  const colorInPalette = string => {
    const colorString = colorPalette.find(i => i.string === string)?.class;
    return `bg-color-${colorString}` || color("darkgrey2");
  };
  return (
    <button
      className={`button-default ${className} ${colorInPalette(color)}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;

Button.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: "",
  color: "grey2",
  onClick: () => {},
  disabled: false,
};
