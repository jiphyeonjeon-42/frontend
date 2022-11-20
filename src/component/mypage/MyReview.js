import React, { useEffect, useState } from "react";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import Reserve from "../../img/list-check-solid.svg";
import useApi from "../../hook/useApi";
import HandleReview from "../book/review/HandleReview";
// import axiosPromise from "../../util/axios";
import Pagination from "../utils/Pagination";

const useGetReviewInfo = page => {
  console.log(page);
  const [lastPage, setLastPage] = useState(null);
  const [reviewInfo, setReviewInfo] = useState(null);
  const userId = JSON.parse(window.localStorage.getItem("user")).id;
  const { request, Dialog } = useApi(
    "get",
    `reviews?userId=${userId}&page=${page - 1}`,
  );
  const refineResponse = response => {
    setLastPage(response.data.meta.totalPages);
    setReviewInfo(response.data.items);
  };

  useEffect(() => {
    request(refineResponse);
  }, [page]);

  // console.log("reviewInfo");
  return {
    lastPage, // totalPage
    reviewInfo,
    Dialog,
  };
};

const MyReview = () => {
  const [page, setPage] = useState(1);
  const { lastPage, reviewInfo, Dialog } = useGetReviewInfo(page);
  // const [postReviews, setPostReviews] = useState([]);

  // const deleteReview = reviewId => {
  //   const temp = postReviews.filter(review => review.reviewsId !== reviewId);
  //   setPostReviews(temp);
  //   axiosPromise("delete", `/reviews/${reviewId}`);
  // };
  // console.log(page);
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
          {reviewInfo &&
            reviewInfo.map(data => (
              <HandleReview
                // key={}
                data={data}
                // onClickDel={deleteReview}
                setPostReviews={reviewInfo}
              />
            ))}
          <div className="return-book-table__pagination">
            <Pagination page={page} setPage={setPage} lastPage={lastPage} />
          </div>
        </div>
      </div>
      <Dialog />
    </>
  );
};

export default MyReview;
