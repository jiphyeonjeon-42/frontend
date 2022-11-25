import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosPromise from "../../../util/axios";
import Button from "../../utils/Button";
import { splitDate } from "../../../util/date";
import Image from "../../utils/Image";
import UserEdit from "../../../img/edit.svg";
import "../../../css/Review.css";
import "../../../css/reset.css";

const HandleReview = ({ data, nickname, createdAt, onClickDel }) => {
  const [fixReview, setFixReview] = useState(false);
  const [content, setContent] = useState(data.content);
  const uploadDate = splitDate(createdAt)[0];
  // 작성자와 사용자 비교는 어떻게 하는지 알겠음. 근데 사서인지 아닌지 어떤걸로 구분하지?
  const user = JSON.parse(window.localStorage.getItem("user")).userName;
  const roleAdmin = JSON.parse(window.localStorage.getItem("user")).isAdmin;
  const checkReviewer = user === nickname;
  const permisson = roleAdmin === checkReviewer;

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
        <span className="reviewer-name font-12-bold">{nickname}</span>
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
      {permisson ? (
        <div className="review-manage">
          {fixReview ? (
            <div className="review-manage__fix-buttons">
              <Button value="수정하기" color="red" onClick={patchBtn} />
              <Button value="취소하기" onClick={cancelFixBtn} />
            </div>
          ) : (
            <div className="review-manage__start-fix-buttons font-12">
              <button type="button" onClick={doFixBtn}>
                수정
                <Image
                  className="review-manage__button-img"
                  src={UserEdit}
                  alt=""
                />
              </button>
              <button type="button" onClick={deleteBtn}>
                삭제
                <Image
                  className="review-manage__button-img"
                  src={UserEdit}
                  alt=""
                />
              </button>
            </div>
          )}
        </div>
      ) : null}
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
  nickname: PropTypes.string.isRequired,
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
