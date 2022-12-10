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

const HandleReview = ({
  data,
  nickname,
  createdAt,
  checkLogin,
  type,
  onClickDel,
}) => {
  const {
    Dialog,
    config,
    setOpenTitleAndMessage,
    setConfig: setDialogConfig,
    setOpen: openDialog,
    setClose: closeDialog,
  } = useDialog();
  const [fixReview, setFixReview] = useState(false);
  const [content, setContent] = useState(data.content);
  const uploadDate = splitDate(createdAt)[0];
  // 이메일로 체크하는 것 필요한가??
  const getPermission = () => {
    if (checkLogin === null) {
      return false;
    }
    const user = checkLogin.userName;
    const roleAdmin = checkLogin.isAdmin;
    const checkReviewerNickname = user === nickname;
    const permission = roleAdmin || checkReviewerNickname;
    return permission;
  };
  const permission = getPermission();
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
    axiosPromise("put", `/reviews/${data.reviewsId}`, text)
      .then(() => {
        setFixReview(!fixReview);
      })
      .catch(() => {
        setOpenTitleAndMessage("10자 이상 420자 이하로 입력해주세요.", "");
      });
  };

  const putBtn = () => {
    patchReview(data.reviewsId, content);
  };

  const reviewFixArea = e => {
    setContent(e.target.value);
  };

  return (
    <div
      className={`showReview__${
        type === "bookReviews" ? "book" : "my"
      }-review-box`}
    >
      <div className="review-info">
        {type === "bookReviews" ? (
          <span className="reviewer-name font-12-bold">
            {nickname ?? "미인증 유저"}
          </span>
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
      {permission ? (
        <div className="review-manage">
          {fixReview ? (
            <div className="review-manage__fix-buttons font-12">
              <button type="button" onClick={putBtn}>
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
  nickname: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  checkLogin: PropTypes.shape({
    email: PropTypes.string,
    expire: PropTypes.string,
    id: PropTypes.number,
    isAdmin: PropTypes.bool,
    isLogin: PropTypes.bool,
    userName: PropTypes.string,
  }),
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
  nickname: null,
  checkLogin: null,
};
