import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosPromise from "../../../util/axios";
import "../../../css/Review.css";
import Button from "../../utils/Button";
import { splitDate } from "../../../util/date";

const HandleReview = ({ data, createdAt, onClickDel }) => {
  const [fixReview, setFixReview] = useState(false);
  const [content, setContent] = useState(data.content);
  const user = JSON.parse(window.localStorage.getItem("user"));
  const uploadDate = splitDate(createdAt)[0];

  const doFixBtn = () => {
    return setFixReview(!fixReview);
  };

  const cancelFixBtn = () => {
    setContent(data.content);
    return setFixReview(!fixReview);
  };

  const deleteBtn = () => {
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
        <span className="reviewer-name font-12-bold">{user.userName}</span>
        <span className="review-day font-12">{uploadDate}</span>
      </div>
      <div className="review-content">
        {fixReview ? (
          <div>
            <textarea
              className="review-content-fix-area font-12"
              value={content}
              type="text-area"
              onChange={reviewFixArea}
            />
          </div>
        ) : (
          <div>
            <textarea
              className="review-content-area font-12"
              value={content}
              disabled
            />
          </div>
        )}
      </div>
      <div className="review-manage">
        {fixReview ? (
          <div className="review-manage__fix-buttons">
            <Button value="수정하기" color="red" onClick={patchBtn} />
            <Button value="취소하기" onClick={cancelFixBtn} />
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
  createdAt: PropTypes.string.isRequired,
  onClickDel: PropTypes.func.isRequired,
};

HandleReview.defaultProps = {
  data: {
    bookInfoId: null,
    content: null,
    reviewsId: null,
  },
};
