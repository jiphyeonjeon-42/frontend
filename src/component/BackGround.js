import React from "react";
import PropTypes from "prop-types";
import "../css/BackGround.css";

const BackGround = ({ page }) => {
  return <div className={`${page}-bg bg`} />;
};

BackGround.propTypes = {
  page: PropTypes.string.isRequired,
};

export default BackGround;
