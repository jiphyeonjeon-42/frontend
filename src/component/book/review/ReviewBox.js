import React from "react";
import PropTypes from "prop-types";

const ReviewBox = ({ color }) => {
  return (
    <div style={{ backgroundColor: color }}>
      <div className="reviewer-name">
        <span>리뷰어 이름</span>
      </div>
      <div className="review-day">
        <span>리뷰 날짜</span>
      </div>
      <div className="review-content">
        <span>리뷰 내용</span>
      </div>
    </div>
  );
};

export default ReviewBox;

ReviewBox.propTypes = {
  color: PropTypes.string.isRequired,
};
