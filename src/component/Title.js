import React from "react";
import PropTypes from "prop-types";
import "../css/Title.css";

const Title = ({ titleKorean, titleEng }) => {
  return (
    <div className="title">
      <span className="title__korean">{titleKorean}</span>
      <span className="title__eng">{titleEng}</span>
    </div>
  );
};

Title.propTypes = {
  titleKorean: PropTypes.string.isRequired,
  titleEng: PropTypes.string.isRequired,
};

export default Title;
