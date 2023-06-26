import { useDialog } from "../../hook/useDialog";
import { usePatchReviewsId } from "../../api/reviews/usePatchReviewsId";
import Edit from "../../asset/img/edit.svg";
import Image from "../utils/Image";
import "../../asset/css/ReviewManagementList.css";
import { Review } from "../../type";

type Props = {
  reviewList: Review[];
};

const ReviewManagementList = ({ reviewList }: Props) => {
  const { Dialog, setOpenTitleAndMessage, setConfig, defaultConfig, setOpen } =
    useDialog();
  const { setReviewId } = usePatchReviewsId({
    Dialog,
    setOpenTitleAndMessage,
  });

  const onClick = e => {
    const { id, name: content, value } = e.currentTarget;
    const isHidden = value === "1";
    const job = isHidden ? "공개" : "비공개";
    setConfig({
      ...defaultConfig,
      title: `리뷰를 ${job}하시겠습니까?`,
      message: `리뷰내용 : ${content}`,
      numberOfButtons: 2,
      firstButton: {
        ...defaultConfig.firstButton,
        text: `${job}하기`,
        onClick: () => {
          setReviewId(id);
        },
      },
    });
    setOpen();
  };
  return (
    <>
      <Dialog />
      {reviewList.map(review => (
        <div className="review-management__list__item" key={review.reviewsId}>
          <span className="review-management__list__id">
            {review.reviewsId}
          </span>
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
            id={review.reviewsId}
            name={review.content}
            value={review.disabled}
            type="button"
            onClick={onClick}
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
      ))}
    </>
  );
};

export default ReviewManagementList;
