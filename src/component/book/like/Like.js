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
  const { likeData } = useGetLike({
    setOpenTitleAndMessage,
    initBookInfoId,
    setCurrentLike,
    currentLike,
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
  };
  const postLike = () => {
    setCurrentLike(true);
    setPostLike(initBookInfoId);
  };
  return (
    <>
      <ShowLike
        setOpenTitleAndMessage={setOpenTitleAndMessage}
        deleteLike={deleteLike}
        postLike={postLike}
        initBookInfoId={initBookInfoId}
        currentLike={currentLike}
        likeData={likeData}
      />
    </>
  );
};

export default Like;

Like.propTypes = {
  initBookInfoId: PropTypes.string.isRequired,
};
