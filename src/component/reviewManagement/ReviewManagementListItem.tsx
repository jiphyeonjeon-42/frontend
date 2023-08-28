import { MouseEventHandler } from "react";
import { usePatchReviewsId } from "../../api/reviews/usePatchReviewsId";
import "../../asset/css/ReviewManagementList.css";
import Edit from "../../asset/img/edit.svg";
import { useNewDialog } from "../../hook/useNewDialog";
import Image from "../utils/Image";

import { contract } from "@jiphyeonjeon-42/contracts";
import type { ClientInferResponseBody } from "@ts-rest/core";

type Review = ClientInferResponseBody<
  typeof contract.reviews.get,
  200
>["items"][number];

type Props = {
  review: Review;
};

const ReviewManagementListItem = ({ review }: Props) => {
  const mutation = usePatchReviewsId();
  const { addConfirmDialog } = useNewDialog();

  const requestConfirmToUpdate: MouseEventHandler = () => {
    const job = review.disabled ? "공개" : "비공개";

    addConfirmDialog(
      "리뷰확인",
      `리뷰를 ${job}하시겠습니까?`,
      `[${review.title}]\n\n리뷰내용 : ${review.content}`,
      () => mutation.mutate({ params: { reviewsId: review.id } }),
    );
  };

  return (
    <div className="review-management__list__item" key={review.id}>
      <span className="review-management__list__id">{review.id}</span>
      <span className="review-management__list__created-at">
        {review.createdAt.split("T")[0]}
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
