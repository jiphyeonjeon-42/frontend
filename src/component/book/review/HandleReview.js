import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosPromise from "../../../util/axios";
import "../../../css/Review.css";

const HandleReview = ({ data, onClickDel }) => {
  console.log(data);
  const [fixReview, setFixReview] = useState(false);
  const [content, setContent] = useState(data.content);
  const doFixBtn = () => {
    return setFixReview(!fixReview);
  };

  const cancelFixBtn = () => {
    setContent(data.content);
    return setFixReview(!fixReview);
  };

  const deleteBtn = () => {
    console.log(data.reviewsId);
    onClickDel(data.reviewsId);
  };

  const patchReview = () => {
    console.log(content);
    const text = {
      content,
    };
    axiosPromise("patch", `/reviews/${data.reviewsId}`, text);
  };

  const patchBtn = () => {
    patchReview(data.reviewsId, content);
    return setFixReview(!fixReview);
  };

  const reviewFixArea = e => {
    setContent(e.target.value);
  };

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
              onChange={reviewFixArea}
            />
          </div>
        ) : (
          <div>
            <textarea
              className="review-content-area"
              value={content}
              disabled
            />
          </div>
        )}
      </div>
      <div className="review-manage">
        {fixReview ? (
          <div>
            <button type="button" onClick={patchBtn}>
              수정 완료
            </button>
            <button type="button" onClick={cancelFixBtn}>
              취소
            </button>
          </div>
        ) : (
          <div>
            <button type="button" onClick={doFixBtn}>
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
};

export default HandleReview;

HandleReview.propTypes = {
  data: PropTypes.shape({
    bookInfoId: PropTypes.number,
    content: PropTypes.string,
    reviewsId: PropTypes.number,
  }),
  onClickDel: PropTypes.func.isRequired,
};

HandleReview.defaultProps = {
  data: {
    bookInfoId: null,
    content: null,
    reviewsId: null,
  },
};
