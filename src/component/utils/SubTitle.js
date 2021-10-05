import React from "react";
import PropTypes from "prop-types";
import "../../css/SubTitle.css";

const SubTitle = ({ subTitle, description, alignItems }) => {
  return (
    <div className={`subtitle-${alignItems}`}>
      <div className="subtitle__line" />
      <span className="subtitle__title">{subTitle}</span>
      <span className="subtitle__description">{description}</span>
    </div>
  );
};

SubTitle.propTypes = {
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  alignItems: PropTypes.string.isRequired,
};

export default SubTitle;
