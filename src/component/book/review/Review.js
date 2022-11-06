import React, { useState } from "react";
import ReviewBox from "./ReviewBox";
import { reviewTabList } from "../../../data/tablist";
import "../../../css/Tabs.css";
import "../../../css/Review.css";

const useFocus = (initialTab, tabList) => {
  const [currentIndex, setCurretIndex] = useState(initialTab);
  return {
    currentTab: tabList[currentIndex].sort,
    changeTab: setCurretIndex,
  };
};

const Review = () => {
  const { currentTab, changeTab } = useFocus(0, reviewTabList);
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
      {currentTab === "showReviews" ? (
        <ReviewBox sort="showReviews" />
      ) : (
        <ReviewBox sort="doReview" />
      )}
    </>
  );
};

export default Review;
