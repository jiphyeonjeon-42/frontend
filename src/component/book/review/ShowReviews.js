import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import HandleReview from "./HandleReview";
import "../../../css/Tabs.css";
import "../../../css/Review.css";
import axiosPromise from "../../../util/axios";

const ShowReviews = ({ bookInfoId, type }) => {
  const [hasNextPage, setHasNextPage] = useState(true);
  const [postReviews, setPostReviews] = useState([]);
  const observeReviewList = useRef(null);
  const page = useRef(0);

  const deleteReview = reviewsId => {
    const temp = postReviews.filter(review => review.reviewsId !== reviewsId);
    setPostReviews(temp);
    axiosPromise("delete", `/reviews/${reviewsId}`);
  };
  // const last = postReviews[postReviews.length - 1];
  // console.log("last", last);
  // console.log(postReviews);
  const fetch = useCallback(async () => {
    try {
      axiosPromise(
        "get",
        `/book-info/${bookInfoId}/reviews?reviewsId=${page.current}`,
      ).then(res => {
        if (res.data.items.length !== 0) {
          setPostReviews(prevPosts => [...prevPosts, ...res.data.items]);
          // const lastElement = postReviews[postReviews.length - 1];
          setHasNextPage(res.data.meta.finalPage === false);
        }
      });
      if (hasNextPage) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!observeReviewList.current || !hasNextPage) return;

    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetch();
      }
    });
    io.observe(observeReviewList.current);
  }, [fetch, hasNextPage]);

  return (
    <>
      {postReviews.map(data => (
        <HandleReview
          key={data.reviewsId}
          data={data}
          nickname={data.nickname}
          createdAt={data.createdAt}
          type={type}
          onClickDel={deleteReview}
        />
      ))}
      <div ref={observeReviewList} />
    </>
  );
};

export default ShowReviews;

ShowReviews.propTypes = {
  bookInfoId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
