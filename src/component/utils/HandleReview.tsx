import { useState } from "react";
import { dateFormat } from "../../util/date";
import Image from "./Image";
import UserEdit from "../../asset/img/edit.svg";
import DeleteButton from "../../asset/img/x_button.svg";
import "../../asset/css/Review.css";
import { Review } from "../../type";
import { useNewDialog } from "../../hook/useNewDialog";
import userState from "../../atom/userState";
import { useRecoilValue } from "recoil";
import { usePutReviewsReviewsId } from "../../api/reviews/usePutReviewsReviewsId";
import { Link } from "react-router-dom";

type Props = {
  type: "my" | "book";
  review: Review;
  deleteReview: (id: number) => void;
};

const HandleReview = ({ type, review, deleteReview }: Props) => {
  const [isEditMode, setEditMode] = useState(false);
  const user = useRecoilValue(userState);
  const hasPermissionToEdit = user && user.userName === review.nickname;

  const startEditMode = () => setEditMode(true);
  const finishEditMode = () => setEditMode(false);
  const initialContent = review.content;

  const { content, setContent, request } = usePutReviewsReviewsId({
    reviewsId: review.reviewsId,
    initialContent,
    finishEditMode,
  });

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
    if (content === initialContent) return;
    if (content.length >= 10 && content.length < 420) {
      request();
    } else {
      addDialogWithTitleAndMessage(
        "error",
        "10자 이상 420자 이하로 입력해주세요.",
        "",
      );
    }
  };

  return (
    <div className={`showReview__${type}-review-box`}>
      <div className="review-info">
        <span className={`reviewer-name ${type}`}>
          {review.nickname ?? "미인증 유저"}
        </span>
        <span className="review-day">{dateFormat(review.createdAt)}</span>
      </div>
      <div className="review-content">
        <Link
          to={`/info/${review.bookInfoId}`}
          className={`review-content-book-title ${type}`}
        >
          {review.title}
        </Link>
        <textarea
          className={`review-content-area ${isEditMode ? "edit" : ""}`}
          value={content}
          onChange={e => setContent(e.target.value)}
          disabled={!isEditMode}
        />
      </div>
      <div className={`review-manage ${hasPermissionToEdit ? "" : "hidden"}`}>
        {isEditMode ? (
          <div className="review-manage__fix-buttons">
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
          <div className="review-manage__start-fix-buttons">
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
    </div>
  );
};

export default HandleReview;
