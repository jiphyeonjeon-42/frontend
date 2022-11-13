import React, { useCallback, useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { number, string } from "prop-types";
// import useApi from "../../../hook/useApi";
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

const Review = () => {
  const { currentTab, changeTab } = useFocus(0, reviewTabList);
  const [postReviews, setPostReviews] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(0);
  const observeReviewList = useRef(null);

  const fetch = useCallback(async () => {
    try {
      const request = axiosPromise(
        "get",
        `reviews?bookInfoId=645&userId=11&page=${page.current}`,
      ).then(res => {
        console.log(res.data);
        setPostReviews(prevPosts => [...prevPosts, ...res.data.items]);
        setHasNextPage(res.data.meta.finalPage === false);
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
          postReviews.map(data => <ReviewBox sort="showReviews" data={data} />)
        ) : (
          <ReviewBox sort="doReview" />
        )}
      </div>
      <div ref={observeReviewList} />
    </>
  );
};

export default Review;
