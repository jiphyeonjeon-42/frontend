import { ChangeEventHandler, useState } from "react";
import axiosPromise from "../../util/axios";
import { splitDate } from "../../util/date";
import Image from "./Image";
import UserEdit from "../../asset/img/edit.svg";
import DeleteButton from "../../asset/img/x_button.svg";
import "../../asset/css/Review.css";
import { Review } from "../../type";
import { useNewDialog } from "../../hook/useNewDialog";
import userState from "../../atom/userState";
import { useRecoilValue } from "recoil";

type Props = {
  type: "my" | "book";
  review: Review;
  deleteReview: (id: number) => void;
};

const HandleReview = ({ type, review, deleteReview }: Props) => {
  const [fixReview, setFixReview] = useState(false);
  const [content, setContent] = useState(review.content);
  const uploadDate = splitDate(review.createdAt)[0];
  const checkLogin = useRecoilValue(userState);
  const getPermission = () => {
    if (checkLogin === null) {
      return false;
    }
    const user = checkLogin.userName;
    const checkReviewerNickname = user === review.nickname;
    return checkReviewerNickname;
  };
  const permission = getPermission();
  const doFixBtn = () => {
    return setFixReview(!fixReview);
  };

  const cancelFixBtn = () => {
    setContent(review.content);
    return setFixReview(!fixReview);
  };

  const { addConfirmDialog, addDialogWithTitleAndMessage } = useNewDialog();
  const deleteBtn = () => {
    addConfirmDialog(
      "삭제확인",
      "리뷰를 삭제하시겠습니까?",
      review.content,
      () => deleteReview(review.reviewsId),
    );
  };

  const patchReview = () => {
    const text = {
      content,
    };
    axiosPromise("put", `/reviews/${review.reviewsId}`, text)
      .then(() => {
        setFixReview(!fixReview);
      })
      .catch(() => {
        addDialogWithTitleAndMessage(
          "error",
          "10자 이상 420자 이하로 입력해주세요.",
          "",
        );
      });
  };

  const putBtn = () => {
    patchReview();
  };

  const reviewFixArea: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setContent(e.target.value);
  };

  return (
    <div className={`showReview__${type}-review-box`}>
      <div className="review-info">
        {type === "book" ? (
          <span className="reviewer-name font-12-bold">
            {review.nickname ?? "미인증 유저"}
          </span>
        ) : null}
        <span className="review-day font-12">{uploadDate}</span>
      </div>
      <div className="review-content">
        {type === "book" ? null : (
          <div className="review-content-book-title font-14-bold">
            {review.title}
          </div>
        )}
        {fixReview ? (
          <div>
            <textarea
              className="review-content-fix-area font-12"
              value={content}
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
    </div>
  );
};

export default HandleReview;
