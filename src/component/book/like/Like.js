import React, { useState } from "react";
import PropTypes from "prop-types";
import usePostLike from "../../../api/like/usePostLike";
import useGetLike from "../../../api/like/useGetLike";
import useDeleteLike from "../../../api/like/useDeleteLike";
import Image from "../../utils/Image";
import FilledLike from "../../../img/like_filled.svg";
import EmptyLike from "../../../img/like_empty.svg";
import "../../../css/BookDetail.css";
import "../../../css/reset.css";
import useDialog from "../../../hook/useDialog";

const Like = ({ initBookInfoId }) => {
  const {
    // Dialog,
    // defaultConfig: dialogDefaultConfig,
    // setConfig: setDialogConfig,
    // setOpen: openDialog,
    setOpenTitleAndMessage,
  } = useDialog();
  const { likeData } = useGetLike({ setOpenTitleAndMessage, initBookInfoId });
  const [currentLike, setCurrentLike] = useState(likeData.isLiked);
  const { setBookInfoId: setPostLike } = useDeleteLike({
    setOpenTitleAndMessage,
  });
  const postLike = bookInfoId => {
    setPostLike(bookInfoId);
  };
  const { setBookInfoId: setDeleteLike } = usePostLike({
    setOpenTitleAndMessage,
  });
  const deleteLike = bookInfoId => {
    setDeleteLike(bookInfoId);
  };

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
    <div>
      <button
        className="like_button filter-button"
        type="button"
        onClick={() => clickLikeHandler(initBookInfoId)}
      >
        <div>
          {currentLike ? (
            <Image className="like__icon" src={FilledLike} alt="like" />
          ) : (
            <Image className="like__icon" src={EmptyLike} alt="unlike" />
          )}
          {`좋아요 ${likeData.likeNum}`}
        </div>
      </button>
    </div>
  );
};

export default Like;

Like.propTypes = {
  initBookInfoId: PropTypes.string.isRequired,
};
