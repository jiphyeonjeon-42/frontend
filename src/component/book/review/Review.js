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
  const { currentTab, changeTab } = useTabFocus(0, reviewTabList);
  const {
    Dialog,
    setConfig: setDialogConfig,
    setOpen: openDialog,
    setClose: closeDialog,
    setOpenTitleAndMessage,
  } = useDialog();
  const { setContent } = usePostReview({
    setOpenTitleAndMessage,
    setClose: closeDialog,
    bookInfoId,
    changeTab,
  });

  return (
    <>
      <div className="tabs">
        {reviewTabList.map((tab, index) => (
          <div
            key={tab.type}
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
          <PostReview
            onClickPost={setContent}
            setDialogConfig={setDialogConfig}
            Dialog={Dialog}
            openDialog={openDialog}
            closeDialog={closeDialog}
            changeTab={changeTab}
          />
        )}
      </div>
    </>
  );
};

export default Review;

Review.propTypes = {
  bookInfoId: PropTypes.string.isRequired,
};
