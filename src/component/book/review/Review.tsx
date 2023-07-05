import { reviewTabList } from "../../../constant/tablist";
import { useTabFocus } from "../../../hook/useTabFocus";
import { usePostReview } from "../../../api/reviews/usePostReview";
import PostReview from "./PostReview";
import ShowReviews from "./ShowReviews";
import "../../../asset/css/Tabs.css";
import "../../../asset/css/Review.css";

type Props = {
  bookInfoId: string;
};

const Review = ({ bookInfoId }: Props) => {
  const { currentTab, changeTab } = useTabFocus(0, reviewTabList);
  const { setContent } = usePostReview({
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
          />
        )}
      </div>
    </>
  );
};

export default Review;
