import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import HandleReview from "./HandleReview";
import axiosPromise from "../../../util/axios";
import "../../../css/Tabs.css";
import "../../../css/Review.css";

const ShowReviews = ({ bookInfoId, type }) => {
  const [postReviews, setPostReviews] = useState([]);
  const observeReviewList = useRef(null);
  const totalLeftPages = useRef();
  const lastReviewId = useRef();
  const checkLogin = JSON.parse(window.localStorage.getItem("user"));

  const deleteReview = reviewsId => {
    const temp = postReviews.filter(review => review.reviewsId !== reviewsId);
    setPostReviews(temp);
    axiosPromise("delete", `/reviews/${reviewsId}`);
  };

  const fetch = useCallback(async () => {
    try {
      axiosPromise(
        "get",
        `/book-info/${bookInfoId}/reviews?reviewsId=${lastReviewId.current}&limit=5`,
      ).then(res => {
        if (res.data.items.length !== 0) {
          setPostReviews(prevPosts => [...prevPosts, ...res.data.items]);
          lastReviewId.current = res.data.meta.finalReviewsId;
          totalLeftPages.current = res.data.meta.totalLeftPages;
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (totalLeftPages === 0) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetch();
      }
    });
    io.observe(observeReviewList.current);
  }, []);

  return (
    <>
      {postReviews.length ? (
        postReviews.map(review => (
          <HandleReview
            key={review.reviewsId}
            data={review}
            nickname={review.nickname}
            createdAt={review.createdAt}
            checkLogin={checkLogin}
            type={type}
            onClickDel={deleteReview}
          />
        ))
      ) : (
        <div className="no-review color-54">
          <span className="font-18">첫 번째 리뷰를 남겨주세요!</span>
        </div>
      )}
      <div ref={observeReviewList} />
    </>
  );
};

export default ShowReviews;

ShowReviews.propTypes = {
  bookInfoId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
