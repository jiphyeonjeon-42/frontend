import { MouseEventHandler } from "react";
import { usePatchReviewsId } from "../../api/reviews/usePatchReviewsId";
import { Review } from "../../type";
import Edit from "../../asset/img/edit.svg";
import Image from "../utils/Image";
import "../../asset/css/ReviewManagementList.css";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  review: Review;
};

const ReviewManagementListItem = ({ review }: Props) => {
  const { setReviewId } = usePatchReviewsId();
  const { addConfirmDialog } = useNewDialog();

  const requestConfirmToUpdate: MouseEventHandler = e => {
    const job = review.disabled ? "공개" : "비공개";

    addConfirmDialog(
      "리뷰확인",
      `리뷰를 ${job}하시겠습니까?`,
      `[${review.title}]\n\n리뷰내용 : ${review.content}`,
      () => {
        setReviewId(review.reviewsId);
      },
    );
  };

  return (
    <div className="review-management__list__item" key={review.reviewsId}>
      <span className="review-management__list__id">{review.reviewsId}</span>
      <span className="review-management__list__created-at">
        <span className="review-management__list__year">
          {review.createdAt.slice(0, 5)}
        </span>
        <span className="review-management__list__date">
          {review.createdAt.slice(5, 10)}
        </span>
      </span>
      <span className="review-management__list__nickname">
        {review.nickname}
      </span>
      <div className="review-management__list__contents">
        <a
          className="review-management__list__title"
          href={`/info/${review.bookInfoId}`}
        >
          {review.title}
        </a>
        <p className="review-management__list__content">{review.content}</p>
      </div>
      <button
        className="review-management__list__scope"
        type="button"
        onClick={requestConfirmToUpdate}
      >
        <p
          className={`review-management__list__scope-text ${
            review.disabled ? "color-red" : "color-54"
          }`}
        >
          {review.disabled ? "비공개" : "-"}
        </p>
        <Image src={Edit} alt="리뷰 공개여부 수정" />
      </button>
    </div>
  );
};

export default ReviewManagementListItem;
