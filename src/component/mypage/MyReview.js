import React from "react";
import PropTypes from "prop-types";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import Reserve from "../../img/list-check-solid.svg";
import HandleReview from "../book/review/HandleReview";
import axiosPromise from "../../util/axios";
import Pagination from "../utils/Pagination";
import useGetMyReviewInfo from "../../api/review/useGetMyReviewInfo";

const MyReview = ({ type }) => {
  const { page, setPage, lastPage, reviewList, setReviewList } =
    useGetMyReviewInfo();

  const deleteReview = reviewId => {
    const temp = reviewList.filter(review => review.reviewsId !== reviewId);
    setReviewList(temp);
    axiosPromise("delete", `/reviews/${reviewId}`);
  };

  return (
    <>
      <div className="mypage-inquire-box-long-wrapper">
        <InquireBoxTitle
          Icon={Reserve}
          titleKO="내가 쓴 후기"
          titleEN="review data"
          KOsize="font-20-bold"
          ENsize="font-14"
        />
        <div className="mypage-inquire-box-long">
          {reviewList.map(data =>
            data.disabled === 0 ? (
              <HandleReview
                key={data.reviewsId}
                data={data}
                nickname={data.nickname}
                createdAt={data.createdAt}
                type={type}
                onClickDel={deleteReview}
              />
            ) : null,
          )}
          <div className="return-book-table__pagination">
            <Pagination page={page} setPage={setPage} lastPage={lastPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReview;

MyReview.propTypes = {
  type: PropTypes.string.isRequired,
};
