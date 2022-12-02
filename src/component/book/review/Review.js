import React from "react";
import PropTypes from "prop-types";
import { reviewTabList } from "../../../data/tablist";
import PostReview from "./PostReview";
import "../../../css/Tabs.css";
import "../../../css/Review.css";
import ShowReviews from "./ShowReviews";
import useTabFocus from "./useTabFocus";
import usePostReview from "./usePostReview";
import useDialog from "../../../hook/useDialog";

const Review = ({ bookInfoId }) => {
  const { setOpenTitleAndMessage } = useDialog();
  const { currentTab, changeTab } = useTabFocus(0, reviewTabList);
  const { setContent } = usePostReview({
    setOpenTitleAndMessage,
    bookInfoId,
    changeTab,
  });

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
          <PostReview onClickPost={setContent} />
        )}
      </div>
    </>
  );
};

export default Review;

Review.propTypes = {
  bookInfoId: PropTypes.string.isRequired,
};
