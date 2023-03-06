import React from "react";
import PropTypes from "prop-types";
import "../../css/InquireBoxBody.css";

const InquireBoxBody = ({ children, className }) => {
  return <div className={`inquire-body__wrapper ${className}`}>{children}</div>;
};

export default InquireBoxBody;

InquireBoxBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};
