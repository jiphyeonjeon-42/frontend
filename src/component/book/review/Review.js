import React from "react";
import PropTypes from "prop-types";
import { reviewTabList } from "../../../data/tablist";
import PostReview from "./PostReview";
import "../../../css/Tabs.css";
import "../../../css/Review.css";
import axiosPromise from "../../../util/axios";
import ShowReviews from "./ShowReviews";
import useTabFocus from "./useTabFocus";

const Review = ({ bookInfoId }) => {
  const { currentTab, changeTab } = useTabFocus(0, reviewTabList);
  const postReview = reviewContent => {
    if (reviewContent !== null) {
      axiosPromise("post", "/reviews", {
        bookInfoId,
        content: reviewContent,
      }).then(() => changeTab(0));
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
          <ShowReviews bookInfoId={bookInfoId} />
        ) : (
          <PostReview onClickPost={postReview} />
        )}
      </div>
    </>
  );
};

export default Review;

Review.propTypes = {
  bookInfoId: PropTypes.number.isRequired,
};
