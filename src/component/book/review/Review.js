import React, { useCallback, useState, useRef, useEffect } from "react";
import { reviewTabList } from "../../../data/tablist";
import ReviewBox from "./ReviewBox";
import "../../../css/Tabs.css";
import "../../../css/Review.css";
import axiosPromise from "../../../util/axios";

const useFocus = (initialTab, tabList) => {
  const [currentIndex, setCurretIndex] = useState(initialTab);
  return {
    currentTab: tabList[currentIndex].sort,
    changeTab: setCurretIndex,
  };
};

const Review = bookInfoId => {
  const [delReview, setDelReview] = useState(null);
  const { currentTab, changeTab } = useFocus(0, reviewTabList);
  const [postReviews, setPostReviews] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(0);
  const observeReviewList = useRef(null);

  const deleteReview = reviewId => {
    console.log(reviewId);
    console.log("before postReviews", postReviews);
    if (reviewId !== null || delReview !== null) {
      setDelReview(reviewId);
      const temp = postReviews.filter(review => review.reviewsId !== reviewId);
      setPostReviews(temp);
      axiosPromise("delete", `/reviews/${reviewId}`);
    }
  };

  // 무한 스크롤
  const fetch = useCallback(async () => {
    try {
      const request = axiosPromise(
        "get",
        `reviews?bookInfoId=645&userId=&page=${page.current}`,
        // 유저 아이디와 내림, 오름차순 옵션 넣기
      ).then(res => {
        if (res.data.items.length !== 0) {
          console.log(res.data);
          setPostReviews(prevPosts => [...prevPosts, ...res.data.items]);
          setHasNextPage(res.data.meta.finalPage === false);
        }
      });
      console.log(request);
      if (hasNextPage) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!observeReviewList.current || !hasNextPage) return;

    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetch();
      }
    });
    io.observe(observeReviewList.current);
  }, [fetch, hasNextPage]);

  return (
    <>
      <div className="tabs">
        {reviewTabList.map((tab, index) => (
          <div
            className={`tab tab-${
              tab.sort === currentTab ? "on" : "not"
            }-focus`}
            role="button"
            tabIndex={index}
            onKeyDown=""
            onClick={() => changeTab(index)}
          >
            {tab?.name}
          </div>
        ))}
      </div>
      <div className="tabs-line" />
      <div className="review-list">
        {currentTab === "showReviews" ? (
          postReviews.map(data => (
            <ReviewBox sort="showReviews" data={data} onClick={deleteReview} />
          ))
        ) : (
          <ReviewBox sort="doReview" info={bookInfoId} />
        )}
      </div>
      <div ref={observeReviewList} />
    </>
  );
};

export default Review;
