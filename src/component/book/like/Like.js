import React from "react";
import PropTypes from "prop-types";
import usePostLike from "../../../api/like/usePostLike";
import useDeleteLike from "../../../api/like/useDeleteLike";
import "../../../css/BookDetail.css";
import "../../../css/reset.css";
import useDialog from "../../../hook/useDialog";
import ShowLike from "./ShowLike";

const Like = ({ initBookInfoId }) => {
  const { setOpenTitleAndMessage } = useDialog();
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

  return (
    <>
      <ShowLike
        setOpenTitleAndMessage={setOpenTitleAndMessage}
        deleteLike={deleteLike}
        postLike={postLike}
        initBookInfoId={initBookInfoId}
      />
    </>
  );
};

export default Like;

Like.propTypes = {
  initBookInfoId: PropTypes.string.isRequired,
};
