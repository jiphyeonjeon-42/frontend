import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../css/Review.css";
import axiosPromise from "../../../util/axios";
// import useApi from "../../../hook/useApi";

const ReviewBox = ({ sort, data, info, onClickDel, onClickPatch }) => {
  // console.log("console", data);
  const [fixReview, setFixReview] = useState(false);
  const [content, setContent] = useState(data.content);
  const [temp, setTemp] = useState("");
  const saveTemp = () => {
    if (fixReview) {
      setContent(temp);
    } else {
      setTemp(content);
    }
    return setFixReview(!fixReview);
  };

  const patchBtn = () => {
    onClickPatch(data.reviewsId, content);
    return setFixReview(!fixReview);
  };

  const deleteBtn = () => {
    onClickDel(data.reviewsId);
  };

  const reviewTextArea = e => {
    setContent(e.target.value);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    axiosPromise("post", "/reviews", {
      bookInfoId: info,
      content: e.target.textContent,
    });
  };

  // sort === "doReview"
  if (sort === "doReview") {
    return (
      <div className="doReview__review-box">
        <form onSubmit={onSubmitHandler}>
          <textarea
            className="review-area"
            value={content}
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
                value={content}
                type="text-area"
                onChange={reviewTextArea}
              />
            </div>
          ) : (
            <div>
              <span className="reviews-content-area">{data.content}</span>
            </div>
          )}
        </div>
        <div className="review-manage">
          {fixReview ? (
            <div>
              <button type="button" onClick={patchBtn}>
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
              <button type="button" onClick={deleteBtn}>
                삭제
              </button>
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
    reviewsId: PropTypes.number,
  }),
  sort: PropTypes.string.isRequired,
  info: PropTypes.number,
  onClickDel: PropTypes.func,
  onClickPatch: PropTypes.func,
};

ReviewBox.defaultProps = {
  data: null,
  info: null,
  onClickDel: null,
  onClickPatch: null,
};
