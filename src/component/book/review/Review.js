import React, { useState } from "react";
import ReviewBox from "./ReviewBox";
import "../../../css/Tabs.css";
import "../../../css/Review.css";

// const info = () => ({
//   bookInfoId: 42,
//   commentText: "책이 좋네요.",
// });
const content = [
  { name: "리뷰", sort: "showReviews" },
  { name: "리뷰하기", sort: "doReview" },
];

const useFocus = (init, allTabs) => {
  const [currentIndex, setCurretIndex] = useState(init);
  return {
    currentItem: allTabs[currentIndex].sort,
    changeItem: setCurretIndex,
  };
};

const Review = () => {
  const { currentItem, changeItem } = useFocus(0, content);
  console.log(currentItem);
  return (
    <>
      <div className="tabs">
        {content.map((section, index) => (
          <div
            className={`tab tab-${
              section.sort === currentItem ? "on" : "not"
            }-focus`}
            role="button"
            tabIndex={index}
            onKeyDown=""
            onClick={() => changeItem(index)}
          >
            {section?.name}
          </div>
        ))}
      </div>
      <div className="tabs-line" />
      <ReviewBox sort={currentItem} />
    </>
  );
};

export default Review;
