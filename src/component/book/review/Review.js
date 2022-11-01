import React, { useEffect } from "react";
import ReviewBox from "./ReviewBox";

// const info = () => ({
//   bookInfoId: 42,
//   commentText: "책이 좋네요.",
// });

const Review = () => {
  const [reviewList, setReviewList] = React.useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/reviews`)
      .then(response => response.json())
      .then(json => {
        setReviewList(json.data.reviewList);
        console.log(json.data.reviewList);
      });
  }, [reviewList]);

  return (
    <div>
      <div>
        <h1>토글</h1>
      </div>
      {/* useState 값을 프롭으로 넣으면 될듯 */}
      {reviewList?.map(review => {
        return <ReviewBox key={review.bookInfoId} />;
      })}
    </div>
  );
};

export default Review;
