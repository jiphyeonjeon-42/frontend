import { useCallback, useState, useRef, useEffect } from "react";
import HandleReview from "./HandleReview";
import axiosPromise from "../../../util/axios";
import "../../../asset/css/Tabs.css";
import "../../../asset/css/Review.css";
import { Review } from "../../../type";

type Props = {
  bookInfoId: number;
  type: string;
};

const ShowReviews = ({ bookInfoId, type }: Props) => {
  const [postReviews, setPostReviews] = useState<Review[]>([]);
  const observeReviewList = useRef<HTMLDivElement>(null);
  const totalLeftPages = useRef(0);
  const lastReviewId = useRef(0);
  const checkLogin = JSON.parse(window.localStorage.getItem("user") || "");

  const deleteReview = (reviewsId: number) => {
    const temp = postReviews.filter(review => review.reviewsId !== reviewsId);
    setPostReviews(temp);
    axiosPromise("delete", `/reviews/${reviewsId}`);
  };

  const fetch = useCallback(async () => {
    try {
      axiosPromise(
        "get",
        `/book-info/${bookInfoId}/reviews?reviewsId=${lastReviewId.current}&limit=5`,
      ).then(res => {
        if (res.data.items.length !== 0) {
          setPostReviews(prevPosts => [...prevPosts, ...res.data.items]);
          lastReviewId.current = res.data.meta.finalReviewsId;
          totalLeftPages.current = res.data.meta.totalLeftPages;
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (totalLeftPages.current === 0) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetch();
      }
    });
    observeReviewList.current && io.observe(observeReviewList.current);
  }, []);

  return (
    <>
      {postReviews.length ? (
        postReviews.map(review => (
          <HandleReview
            key={review.reviewsId}
            data={review}
            nickname={review.nickname}
            createdAt={review.createdAt}
            checkLogin={checkLogin}
            type={type}
            onClickDel={deleteReview}
          />
        ))
      ) : (
        <div className="no-review color-54">
          <span className="font-18">첫 번째 리뷰를 남겨주세요!</span>
        </div>
      )}
      <div ref={observeReviewList} />
    </>
  );
};

export default ShowReviews;
