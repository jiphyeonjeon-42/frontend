import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../../../css/Review.css";

const ReviewBox = ({ sort, data, bookId }) => {
  const [fixReview, setFixReview] = useState(false);
  const [text, setText] = useState(null);
  const [temp, setTemp] = useState("");
  const saveTemp = () => {
    // 리뷰하기부터 진행하고 만들기
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

  const reviewTextArea = e => {
    setText(e.target.value);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    const content = e.target.textContent;
    await axios
      .post(
        `${process.env.REACT_APP_API}/reviews`,
        {
          bookInfoId: `${bookId}`,
          content: `${content}`,
        },
        {
          withCredentials: true,
        },
      )
      .then(function print(res) {
        console.log(res);
      })
      .catch(function fail(error) {
        console.log(error);
      });
  };
  // sort === "doReview"
  if (sort === "doReview") {
    return (
      <div className="doReview__review-box">
        <form onSubmit={onSubmitHandler}>
          <textarea
            className="review-area"
            value={text}
            type="text-area"
            onChange={reviewTextArea}
          />
          {/* 괜찮은 방식인가? */}
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
  // sort === "showReview"
  if (sort === "showReviews") {
    return (
      <div className="showReview__review-box">
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
                onChange={reviewTextArea}
              />
            </div>
          ) : (
            <div>
              {/* 텍스트 DB 에서 불러와야 함. */}
              <span className="reviews-content-area">{data.content}</span>
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
  }
  return null;
};

export default ReviewBox;

ReviewBox.propTypes = {
  data: PropTypes.shape({
    bookInfoId: PropTypes.number,
    content: PropTypes.string,
  }),
  sort: PropTypes.string.isRequired,
  bookId: PropTypes.number.isRequired,
};

ReviewBox.defaultProps = {
  data: null,
};
