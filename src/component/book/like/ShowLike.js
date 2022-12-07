import React from "react";
import PropTypes from "prop-types";
import Image from "../../utils/Image";
import FilledLike from "../../../img/like_filled.svg";
import EmptyLike from "../../../img/like_empty.svg";
// import useGetLike from "../../../api/like/useGetLike";
import "../../../css/BookDetail.css";
import "../../../css/reset.css";

const ShowLike = ({ deleteLike, postLike, currentLike, currentLikeNum }) => {
  const clickLikeHandler = () => {
    if (currentLike) {
      deleteLike();
    } else {
      postLike();
    }
  };

  return (
    <div>
      <button
        className="like_button filter-button"
        type="button"
        onClick={clickLikeHandler}
      >
        {currentLike ? (
          <Image className="like__icon" src={FilledLike} alt="like" />
        ) : (
          <Image className="like__icon" src={EmptyLike} alt="unlike" />
        )}
        {`좋아요 ${currentLikeNum}`}
      </button>
    </div>
  );
};

export default ShowLike;

ShowLike.propTypes = {
  deleteLike: PropTypes.func.isRequired,
  postLike: PropTypes.func.isRequired,
  currentLike: PropTypes.bool.isRequired,
  currentLikeNum: PropTypes.number.isRequired,
};
