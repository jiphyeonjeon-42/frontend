// import React, { useCallback, useState, useRef, useEffect } from "react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { reviewTabList } from "../../../data/tablist";
import PostReview from "./PostReview";
import "../../../css/Tabs.css";
import "../../../css/Review.css";
import axiosPromise from "../../../util/axios";
import ShowReviews from "./ShowReviews";

const useFocus = (initialTab, tabList) => {
  const [currentIndex, setCurretIndex] = useState(initialTab);
  return {
    currentTab: tabList[currentIndex].type,
    changeTab: setCurretIndex,
  };
};
const Review = ({ bookInfoId }) => {
  const { currentTab, changeTab } = useFocus(0, reviewTabList);
  // const [postReviews, setPostReviews] = useState([]);

  // 맨 위로 안올라감...
  const postReview = reviewContent => {
    if (reviewContent !== null) {
      axiosPromise("post", "/reviews", {
        bookInfoId,
        content: reviewContent,
      }).then(() => changeTab(0));
      // 어싱크 어웨잇 특강 (목요일. 썬글)
    }
  };

  return (
    <>
      <div className="tabs">
        {reviewTabList.map((tab, index) => (
          <div
            className={`tab tab-${
              tab.type === currentTab ? "on" : "not"
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
          <ShowReviews
            // postReviews={postReviews}
            // setPostReviews={setPostReviews}
            bookInfoId={bookInfoId}
          />
        ) : (
          <PostReview
            onClickPost={postReview}
            // setPostReviews={setPostReviews}
          />
        )}
      </div>
      {/* 떨어뜨려놓기 */}
    </>
  );
};

export default Review;

Review.propTypes = {
  bookInfoId: PropTypes.number.isRequired,
};
