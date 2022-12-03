import React, { useState } from "react";
import PropTypes from "prop-types";
import usePostLike from "../../../api/like/usePostLike";
import useGetLike from "../../../api/like/useGetLike";
import useDeleteLike from "../../../api/like/useDeleteLike";
import "../../../css/BookDetail.css";
import "../../../css/reset.css";
import useDialog from "../../../hook/useDialog";
import ShowLike from "./ShowLike";
// bookInfoId
// isLiked
// likeNum
const Like = ({ initBookInfoId }) => {
  const [currentLike, setCurrentLike] = useState();
  const { setOpenTitleAndMessage } = useDialog();
  const { likeData } = useGetLike({
    setOpenTitleAndMessage,
    initBookInfoId,
    setCurrentLike,
  });
  const { setBookInfoId: setDeleteLike } = useDeleteLike({
    setOpenTitleAndMessage,
  });
  const deleteLike = () => {
    setDeleteLike(initBookInfoId);
  };
  const { setBookInfoId: setPostLike } = usePostLike({
    setOpenTitleAndMessage,
  });
  const postLike = () => {
    setPostLike(initBookInfoId);
  };
  const clickLikeHandler = () => {
    if (currentLike) {
      deleteLike(initBookInfoId);
      setCurrentLike(false);
    } else {
      postLike(initBookInfoId);
      setCurrentLike(true);
    }
  };

  return (
    <div>
      <button
        className="like_button filter-button"
        type="button"
        onClick={clickLikeHandler}
      >
        <ShowLike likeData={likeData} currentLike={currentLike} />
      </button>
    </div>
  );
};

export default Like;

Like.propTypes = {
  initBookInfoId: PropTypes.string.isRequired,
};
