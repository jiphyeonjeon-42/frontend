import React from "react";
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
  console.log(likeData);

  const postLike = () => {
    const { setBookInfoId } = usePostLike(initBookInfoId);
    setBookInfoId(initBookInfoId);
  };

  const deleteLike = () => {
    const { setBookInfoId } = useDeleteLike(initBookInfoId);
    setBookInfoId(initBookInfoId);
  };

  return (
    <div>
      <button
        className="like_button filter-button"
        type="button"
        onClick={likeData.isLiked ? deleteLike : postLike}
      >
        <div>
          <Image
            className="like__icon"
            src={`${likeData.isLiked ? FilledLike : EmptyLike}`}
            alt=""
          />
          {`좋아요 ${likeData.likeNum}`}
        </div>
      </button>
    </div>
  );
};

export default Like;

Like.propTypes = {
  initBookInfoId: PropTypes.number.isRequired,
};
