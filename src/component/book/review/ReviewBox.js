import React from "react";
import "../../../css/Review.css";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

const ReviewBox = () => {
  return (
    <div className="review-box">
      <div className="review-info">
        <span className="reviewer-name">리뷰어 이름</span>
        <span className="review-day">리뷰 날짜</span>
      </div>
      <div className="review-content">
        <span>{text}</span>
      </div>
      <div className="review-manage">
        <p>수정</p>
        <p>삭제</p>
      </div>
    </div>
  );
};

export default ReviewBox;
