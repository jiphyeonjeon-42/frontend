import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { reviewTabList } from "../../../data/tablist";
import HandleReview from "./HandleReview";
import PostReview from "./PostReview";
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

const Review = ({ bookInfoId }) => {
  console.log(bookInfoId);
  const { currentTab, changeTab } = useFocus(0, reviewTabList);
  const [postReviews, setPostReviews] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const observeReviewList = useRef(null);
  const page = useRef(0);

  const deleteReview = reviewId => {
    const temp = postReviews.filter(review => review.reviewsId !== reviewId);
    setPostReviews(temp);
    axiosPromise("delete", `/reviews/${reviewId}`);
  };

  // 무한 스크롤
  const fetch = useCallback(async () => {
    try {
      axiosPromise(
        "get",
        `reviews?bookInfoId=${bookInfoId}&userId=&page=${page.current}`,
        // 유저 아이디와 내림, 오름차순 옵션 넣기
      ).then(res => {
        if (res.data.items.length !== 0) {
          setPostReviews(prevPosts => [...prevPosts, ...res.data.items]);
          setHasNextPage(res.data.meta.finalPage === false);
        }

        // axiosPromise(
        //   "get",
        //   "reviews",
        //   {
        //     bookInfoId,
        //     userId : "",
        //     page : page.current,
        //   },
        // )
        // axiosPromise(
        //   "get",
        //   `reviews?bookInfoId=${bookInfoId}&userId=&page=${page.current}`,
        //   // 유저 아이디와 내림, 오름차순 옵션 넣기
        // )
      });
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

  // 맨 위로 안올라감...
  const postReview = reviewContent => {
    if (reviewContent !== null) {
      axiosPromise("post", "/reviews", {
        bookInfoId,
        content: reviewContent,
      })
        .then((page.current = 0))
        .then(changeTab(0));
      // 변수를 변경
      // 에러코드 어떻게 추가함? catch
    }
  };

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
        {/* 추출하기 */}
        {currentTab === "showReviews" ? (
          postReviews.map(data => (
            <HandleReview
              // key={}
              data={data}
              onClickDel={deleteReview}
            />
          ))
        ) : (
          <PostReview onClickPost={postReview} />
        )}
      </div>
      {/* 떨어뜨려놓기 */}
      <div ref={observeReviewList} />
    </>
  );
};

export default Review;

Review.propTypes = {
  bookInfoId: PropTypes.number.isRequired,
};
