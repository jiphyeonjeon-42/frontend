/* eslint-disable react/prop-types */
import React, { useState } from "react";
import useDialog from "../../../hook/useDialog";
import useGetLike from "../../../api/like/useGetLike";
import usePostLike from "../../../api/like/usePostLike";
import useDeleteLike from "../../../api/like/useDeleteLike";
import "../../../css/RentHistory.css";

const RentHistoryTable = ({ factor }) => {
  const { setOpenTitleAndMessage } = useDialog();
  const { likeData } = useGetLike({
    setOpenTitleAndMessage,
    initBookInfoId: factor.bookInfoId,
  });
  const { setBookInfoId: setBookInfoIdPost } = usePostLike({
    setOpenTitleAndMessage,
  });
  const postLike = bookInfoId => {
    setBookInfoIdPost(bookInfoId);
  };
  const { setBookInfoId: setBookInfoIdDelete } = useDeleteLike({
    setOpenTitleAndMessage,
  });
  const deleteLike = bookInfoId => {
    setBookInfoIdDelete(bookInfoId);
  };
  const [currentLike, setCurrentLike] = useState(likeData.isLiked);

  const clickLikeHandler = bookInfoId => {
    if (currentLike) {
      deleteLike(bookInfoId);
      setCurrentLike(false);
    } else {
      postLike(bookInfoId);
      setCurrentLike(true);
    }
  };

  return (
    <div className="rent_histories__table-list">
      <span> {factor?.createdAt} </span>
      <span className="rent_histories__table_info__title">{factor?.title}</span>
      <span> {factor.returnedAt ? factor.returnedAt : "대출중"} </span>
      <button
        className="rent_histories__table-list__button"
        type="button"
        onClick={() => {
          clickLikeHandler(factor.bookInfoId);
        }}
      >
        {currentLike ? "💗" : "🤍"}
      </button>
      <a href={`/info/${factor.bookInfoId}`}> 리뷰쓰기 </a>
    </div>
  );
};

export default RentHistoryTable;
