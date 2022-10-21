import React from "react";
// import PropTypes from "prop-types";
import "../../../css/Review.css";

const ReviewBox = () => {
  return (
    <div className="review-box">
      <div className="review-info">
        <span className="reviewer-name">리뷰어 이름</span>
        <span className="review-day">리뷰 날짜</span>
      </div>
      <div className="review-content">
        <span>리뷰 내용</span>
      </div>
    </div>
  );
};

export default ReviewBox;

// ReviewBox.propTypes = {
//   color: PropTypes.string.isRequired,
// };
