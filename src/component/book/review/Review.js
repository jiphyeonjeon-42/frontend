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

const Review = infoId => {
  const { currentTab, changeTab } = useFocus(0, reviewTabList);
  console.log(infoId);
  const reviewData = [
    {
      bookInfoId: infoId,
      content: "책이 좋네요.",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.2",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.3",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.4",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.5",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.6",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.7",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.8",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.9",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.10",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.11",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.12",
    },
    {
      bookInfoId: infoId,
      content: "책이 좋네요.13",
    },
  ];
  // 데이터 가져오기
  const getReviewBox = () => {
    return <ReviewBox sort="showReviews" data={reviewData} infoId={infoId} />;
  };
  const getReviewData = () => {
    for (let index = 0; index < 10; ) {
      getReviewBox();
      index += 1;
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
      {/* 스크롤 관련 이벤트 실행 시 실행하게 코드 작성? 플래그로 useEffect 사용하자 */}
      <div className="review-list">
        {/* for (let index = 0; index < 10; index++) {
        } */}
        {currentTab === "showReviews" ? (
          getReviewData()
        ) : (
          <ReviewBox sort="doReview" />
        )}
      </div>
    </>
  );
};

export default Review;

// for (let index = 0; index < categoryButtonWidth.length; index++) {
//   sumOfCategory += categoryButtonWidth[index];
//   if (sumOfCategory - EPSILON > categoriesScrollX) {
//     break;
//   }
// }

// for (let index = 0; index < categoryButtonWidth.length; index++) {
// }
