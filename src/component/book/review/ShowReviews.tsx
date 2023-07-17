import { useRef, useEffect } from "react";
import HandleReview from "../../utils/HandleReview";
import axiosPromise from "../../../util/axios";
import { useGetBookInfoReviews } from "../../../api/bookInfo/useGetBookInfoReviews";
import "../../../asset/css/Tabs.css";
import "../../../asset/css/Review.css";

type Props = {
  bookInfoId: number;
  type: string;
};

const ShowReviews = ({ bookInfoId, type }: Props) => {
  const triggerElementForInfiniteScroll = useRef<HTMLDivElement>(null);

  const checkLogin = JSON.parse(window.localStorage.getItem("user") || "{}");

  const { reviewList, fetch, isAllFetched, deleteReviewById } =
    useGetBookInfoReviews(bookInfoId);

  const deleteReview = (reviewsId: number) => {
    deleteReviewById(reviewsId);
    axiosPromise("delete", `/reviews/${reviewsId}`);
  };

  useEffect(() => {
    // 무한 스크롤을 위한 옵저버 설정
    const io = new IntersectionObserver(entries => {
      // 아직 불러올 정보가 있고 트리거가 보이면 fetch 함수 호출
      if (!isAllFetched.current && entries[0].isIntersecting) fetch();
    });

    if (triggerElementForInfiniteScroll.current)
      io.observe(triggerElementForInfiniteScroll.current); // 트리거 엘리먼트 관찰 시작

    return () => {
      // 트리거 엘리먼트 관찰 종료
      io.disconnect();
    };
  }, []);

  return (
    <>
      {reviewList.map(review => (
        <HandleReview
          key={review.reviewsId}
          data={review}
          nickname={review.nickname}
          createdAt={review.createdAt}
          checkLogin={checkLogin}
          type={type}
          onClickDel={deleteReview}
        />
      ))}
      {reviewList.length === 0 ? (
        <div className="no-review color-54">
          <span className="font-18">첫 번째 리뷰를 남겨주세요!</span>
        </div>
      ) : null}
      <div ref={triggerElementForInfiniteScroll} />
    </>
  );
};

export default ShowReviews;
