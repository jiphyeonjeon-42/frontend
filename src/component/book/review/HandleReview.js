import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosPromise from "../../../util/axios";
import { splitDate } from "../../../util/date";
import Image from "../../utils/Image";
import UserEdit from "../../../img/edit.svg";
import DeleteButton from "../../../img/x_button.svg";
import useDialog from "../../../hook/useDialog";
import "../../../css/Review.css";
import "../../../css/reset.css";

const HandleReview = ({ data, nickname, createdAt, type, onClickDel }) => {
  const {
    Dialog,
    config,
    setConfig: setDialogConfig,
    setOpen: openDialog,
    setClose: closeDialog,
  } = useDialog();
  const [fixReview, setFixReview] = useState(false);
  const [content, setContent] = useState(data.content);
  const uploadDate = splitDate(createdAt)[0];
  const user = JSON.parse(window.localStorage.getItem("user")).userName;
  const roleAdmin = JSON.parse(window.localStorage.getItem("user")).isAdmin;
  const checkReviewer = user === nickname;
  const permisson = roleAdmin || checkReviewer;

  const doFixBtn = () => {
    return setFixReview(!fixReview);
  };

  const cancelFixBtn = () => {
    setContent(data.content);
    return setFixReview(!fixReview);
  };

  const deleteReview = () => {
    onClickDel(data.reviewsId);
  };

  const deleteBtn = () => {
    setDialogConfig({
      ...config,
      title: "리뷰를 삭제하시겠습니까?",
      buttonAlign: "basic",
      numberOfButtons: 2,
      firstButton: {
        text: "확인하기",
        color: "red",
        onClick: deleteReview,
      },
      secondButton: {
        text: "취소하기",
        color: "grey",
        onClick: closeDialog,
      },
    });
    openDialog();
  };

  const patchReview = () => {
    const text = {
      content,
    };
    axiosPromise("put", `/reviews/${data.reviewsId}`, text);
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
        {type === "bookReviews" ? (
          <span className="reviewer-name font-12-bold">{nickname}</span>
        ) : null}
        <span className="review-day font-12">{uploadDate}</span>
      </div>
      <div className="review-content">
        {type === "bookReviews" ? null : (
          <div className="review-content-book-title font-14-bold">
            {data.title}
          </div>
        )}
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
            <div className="review-manage__fix-buttons font-12">
              <button type="button" onClick={patchBtn}>
                <span className="fix-text">수정하기</span>
              </button>
              <button
                className="review-manage__fix-cancle"
                type="button"
                onClick={cancelFixBtn}
              >
                취소하기
              </button>
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
                  src={DeleteButton}
                  alt=""
                />
              </button>
            </div>
          )}
        </div>
      ) : null}
      <Dialog />
    </div>
  );
};

export default HandleReview;

HandleReview.propTypes = {
  data: PropTypes.shape({
    bookInfoId: PropTypes.number,
    content: PropTypes.string,
    reviewsId: PropTypes.number,
    title: PropTypes.string,
  }),
  nickname: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClickDel: PropTypes.func.isRequired,
};

HandleReview.defaultProps = {
  data: {
    bookInfoId: null,
    content: null,
    reviewsId: null,
    title: null,
  },
};
