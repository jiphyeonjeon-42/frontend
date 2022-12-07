import React, { useState } from "react";
import PropTypes from "prop-types";
import usePostLike from "../../../api/like/usePostLike";
import useDeleteLike from "../../../api/like/useDeleteLike";
import useGetLike from "../../../api/like/useGetLike";
import "../../../css/BookDetail.css";
import "../../../css/reset.css";
import useDialog from "../../../hook/useDialog";
import ShowLike from "./ShowLike";

const Like = ({ initBookInfoId }) => {
  const { setOpenTitleAndMessage } = useDialog();
  const [currentLike, setCurrentLike] = useState();
  const [currentLikeNum, setCurrentLikeNum] = useState(0);
  useGetLike({
    setOpenTitleAndMessage,
    initBookInfoId,
    setCurrentLike,
    setCurrentLikeNum,
  });
  const { setBookInfoId: setDeleteLike } = useDeleteLike({
    setOpenTitleAndMessage,
  });
  const { setBookInfoId: setPostLike } = usePostLike({
    setOpenTitleAndMessage,
  });
  const deleteLike = () => {
    setCurrentLike(false);
    setDeleteLike(initBookInfoId);
    setCurrentLikeNum(currentLikeNum - 1);
  };
  const postLike = () => {
    setCurrentLike(true);
    setPostLike(initBookInfoId);
    setCurrentLikeNum(currentLikeNum + 1);
  };
  return (
    <>
      <ShowLike
        setOpenTitleAndMessage={setOpenTitleAndMessage}
        deleteLike={deleteLike}
        postLike={postLike}
        initBookInfoId={initBookInfoId}
        currentLike={currentLike}
        currentLikeNum={currentLikeNum}
      />
    </>
  );
};

export default Like;

Like.propTypes = {
  initBookInfoId: PropTypes.string.isRequired,
};
