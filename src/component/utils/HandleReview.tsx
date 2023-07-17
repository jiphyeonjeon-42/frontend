import { useState } from "react";
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
  const [isEditMode, setEditMode] = useState(false);
  const [content, setContent] = useState(review.content);
  const uploadDate = splitDate(review.createdAt)[0];

  const user = useRecoilValue(userState);
  const hasPermissionToEdit = user && user.userName === review.nickname;

  const startEditMode = () => setEditMode(true);

  const resetEdited = () => {
    setContent(review.content);
    setEditMode(false);
  };

  const { addConfirmDialog, addDialogWithTitleAndMessage } = useNewDialog();
  
  const requestConfirmToDelete = () => {
    addConfirmDialog(
      "삭제확인",
      "리뷰를 삭제하시겠습니까?",
      review.content,
      () => deleteReview(review.reviewsId),
    );
  };

  const updateChange = () => {
    const text = {
      content,
    };
    axiosPromise("put", `/reviews/${review.reviewsId}`, text)
      .then(() => {
        setEditMode(false);
      })
      .catch(() => {
        addDialogWithTitleAndMessage(
          "error",
          "10자 이상 420자 이하로 입력해주세요.",
          "",
        );
      });
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
        {isEditMode ? (
          <div>
            <textarea
              className="review-content-fix-area font-12"
              value={content}
              onChange={e => setContent(e.target.value)}
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
      {hasPermissionToEdit ? (
        <div className="review-manage">
          {isEditMode ? (
            <div className="review-manage__fix-buttons font-12">
              <button type="button" onClick={updateChange}>
                <span className="fix-text">수정하기</span>
              </button>
              <button
                className="review-manage__fix-cancle"
                type="button"
                onClick={resetEdited}
              >
                취소하기
              </button>
            </div>
          ) : (
            <div className="review-manage__start-fix-buttons font-12">
              <button type="button" onClick={startEditMode}>
                수정
                <Image
                  className="review-manage__button-img"
                  src={UserEdit}
                  alt=""
                />
              </button>
              <button type="button" onClick={requestConfirmToDelete}>
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
