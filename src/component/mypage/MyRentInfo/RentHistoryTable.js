/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from "react";
import useDialog from "../../../hook/useDialog";
import useGetLike from "../../../api/like/useGetLike";
import usePostLike from "../../../api/like/usePostLike";
import useDeleteLike from "../../../api/like/useDeleteLike";

// 추후 백에서 bookInfoId를 보내준 걸로 수정 필요
const RentHistoryTable = ({ factor }) => {
  const { setOpenTitleAndMessage } = useDialog();
  const { likeData } = useGetLike({
    setOpenTitleAndMessage,
    initBookInfoId: 42,
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
  const clickLikeHandler = bookInfoId => {
    if (likeData.isLiked) {
      deleteLike(bookInfoId);
    } else {
      postLike(bookInfoId);
    }
  };
  return (
    <div className="histories__table-list">
      <span> {factor?.createdAt} </span>
      <span> {factor?.title} </span>
      <span> {factor.returnedAt ? factor.returnedAt : "대출중"} </span>
      <span
        onClick={() => {
          clickLikeHandler(42);
        }}
      >
        {likeData.isLiked ? "💗" : "🤍"}
      </span>
      <a href={`/info/${factor.bookInfoId}`}> 리뷰쓰기 </a>
    </div>
  );
};

export default RentHistoryTable;
