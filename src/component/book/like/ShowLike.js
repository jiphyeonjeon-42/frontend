import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "../../utils/Image";
import FilledLike from "../../../img/like_filled.svg";
import EmptyLike from "../../../img/like_empty.svg";
import useGetLike from "../../../api/like/useGetLike";
import "../../../css/BookDetail.css";
import "../../../css/reset.css";

const ShowLike = ({
  setOpenTitleAndMessage,
  deleteLike,
  postLike,
  initBookInfoId,
}) => {
  const [currentLike, setCurrentLike] = useState();
  const { likeData } = useGetLike({
    setOpenTitleAndMessage,
    initBookInfoId,
    setCurrentLike,
  });

  const clickLikeHandler = () => {
    if (likeData.isLiked) {
      deleteLike();
      setCurrentLike(false);
    } else {
      postLike();
      setCurrentLike(true);
    }
  };

  useEffect(() => {
    setCurrentLike(likeData.isLiked);
  }, []);

  console.log(currentLike);

  return (
    <div>
      <button
        className="like_button filter-button"
        type="button"
        onClick={clickLikeHandler}
      >
        {likeData.isLiked ? (
          <Image className="like__icon" src={FilledLike} alt="like" />
        ) : (
          <Image className="like__icon" src={EmptyLike} alt="unlike" />
        )}
        {`좋아요 ${likeData.likeNum}`}
      </button>
    </div>
  );
};

export default ShowLike;

ShowLike.propTypes = {
  setOpenTitleAndMessage: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired,
  postLike: PropTypes.func.isRequired,
  initBookInfoId: PropTypes.number.isRequired,
  // currentLike: PropTypes.number.isRequired,
  // likeData: PropTypes.shape({
  //   bookInfoId: PropTypes.number.isRequired,
  //   isLiked: PropTypes.bool,
  //   likeNum: PropTypes.number,
  // }),
};

// ShowLike.defaultProps = {
//   likeData: {
//     isLiked: false,
//     likeNum: 0,
//   },
// };
