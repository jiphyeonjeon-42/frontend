import PropTypes from "prop-types";
import { reviewTabList } from "../../../data/tablist";
import PostReview from "./PostReview";
import ShowReviews from "./ShowReviews";
import useTabFocus from "../../../hook/useTabFocus";
import usePostReview from "../../../api/reviews/usePostReview";
import useDialog from "../../../hook/useDialog";
import "../../../css/Tabs.css";
import "../../../css/Review.css";

const Review = ({ bookInfoId }) => {
  const { currentTab, changeTab } = useTabFocus(0, reviewTabList);
  const {
    Dialog,
    config,
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
          <ShowReviews bookInfoId={bookInfoId} type="bookReviews" />
        ) : (
          <PostReview
            changeTab={changeTab}
            onClickPost={setContent}
            Dialog={Dialog}
            config={config}
            openDialog={openDialog}
            closeDialog={closeDialog}
            setDialogConfig={setDialogConfig}
            setOpenTitleAndMessage={setOpenTitleAndMessage}
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
