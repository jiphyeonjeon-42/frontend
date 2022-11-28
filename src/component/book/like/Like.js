import React from "react";
import PropTypes from "prop-types";
import usePostLike from "../../../api/like/usePostLike";
import useGetLike from "../../../api/like/useGetLike";
import useDeleteLike from "../../../api/like/useDeleteLike";
import Image from "../../utils/Image";
import UserEdit from "../../../img/edit.svg";
import DeleteButton from "../../../img/x_button.svg";
import "../../../css/BookDetail.css";
import "../../../css/reset.css";
import useDialog from "../../../hook/useDialog";

const Like = ({ initBookInfoId }) => {
  console.log(initBookInfoId);
  const {
    // Dialog,
    // defaultConfig: dialogDefaultConfig,
    // setConfig: setDialogConfig,
    // setOpen: openDialog,
    setOpenTitleAndMessage,
  } = useDialog();
  const { likeData } = useGetLike({ setOpenTitleAndMessage, initBookInfoId });

  const postLike = data => {
    if (!likeData.isLiked) {
      const { setBookInfoId } = usePostLike(data);
      setBookInfoId(data);
    }
  };

  const deleteLike = data => {
    if (likeData.isLiked) {
      const { setBookInfoId } = useDeleteLike(data);
      setBookInfoId(data);
    }
  };

  return (
    <div>
      <button
        className="like_button filter-button"
        type="button"
        onClick={() => {
          postLike(initBookInfoId);
          deleteLike(initBookInfoId);
        }}
      >
        <div>
          <Image
            className="like__icon"
            src={`${likeData.isLiked ? UserEdit : DeleteButton}`}
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
