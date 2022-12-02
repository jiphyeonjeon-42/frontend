import React from "react";
import PropTypes from "prop-types";
import Image from "../../utils/Image";
import FilledLike from "../../../img/like_filled.svg";
import EmptyLike from "../../../img/like_empty.svg";
import "../../../css/BookDetail.css";
import "../../../css/reset.css";

const ShowLike = ({ likeData, currentLike }) => {
  return (
    <div>
      {currentLike ? (
        <Image className="like__icon" src={FilledLike} alt="like" />
      ) : (
        <Image className="like__icon" src={EmptyLike} alt="unlike" />
      )}
      {`좋아요 ${likeData.likeNum}`}
    </div>
  );
};

export default ShowLike;

ShowLike.propTypes = {
  likeData: PropTypes.shape({
    bookInfoId: PropTypes.number.isRequired,
    isLiked: PropTypes.bool,
    likeNum: PropTypes.number,
  }),
  currentLike: PropTypes.bool.isRequired,
};

ShowLike.defaultProps = {
  likeData: {
    isLiked: false,
    likeNum: 0,
  },
};
