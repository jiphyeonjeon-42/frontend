import React, { useState } from "react";
import "../../../css/Review.css";

const ReviewBox = () => {
  const [fixReview, setFixReview] = useState(false);
  const [text, setText] = useState("입력해주십쇼");
  const [temp, setTemp] = useState("");

  const saveTemp = () => {
    if (fixReview) {
      setText(temp);
    } else {
      setTemp(text);
    }
    return setFixReview(!fixReview);
  };

  const handleFixBtn = () => {
    return setFixReview(!fixReview);
  };

  const fixReviewBtn = e => {
    setText(e.target.value);
  };

  return (
    <div className="review-box">
      <div className="review-info">
        <span className="reviewer-name">리뷰어 이름</span>
        <span className="review-day">리뷰 날짜</span>
      </div>
      <div className="review-content">
        {fixReview ? (
          <div>
            <textarea
              className="review-content-fix-area"
              value={text}
              type="text-area"
              onChange={fixReviewBtn}
            />
          </div>
        ) : (
          <div>
            {/* 텍스트 DB 에서 불러와야 함. */}
            <span className="reviews-content-area">{text}</span>
          </div>
        )}
      </div>
      <div className="review-manage">
        {fixReview ? (
          <div>
            <button type="button" onClick={handleFixBtn}>
              수정 완료
            </button>
            <button type="button" onClick={saveTemp}>
              취소
            </button>
          </div>
        ) : (
          <div>
            <button type="button" onClick={saveTemp}>
              수정
            </button>
            <button type="button">삭제</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewBox;
