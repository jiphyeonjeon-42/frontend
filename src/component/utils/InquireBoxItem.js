import PropTypes from "prop-types";
import React from "react";
import "../../css/InquireBoxItem.css";

const InquireBoxItem = ({ keyString, value }) => {
  return (
    <span key={keyString} className={`inquire-item__${keyString}`}>
      {value}
    </span>
  );
};

export default InquireBoxItem;

InquireBoxItem.propTypes = {
  keyString: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
