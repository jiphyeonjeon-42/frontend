import PropTypes from "prop-types";
import Image from "../../utils/Image";
import FilledLike from "../../../img/like_filled.svg";
import EmptyLike from "../../../img/like_empty.svg";
import "../../../css/BookDetail.css";

const ShowLike = ({ deleteLike, postLike, currentLike, currentLikeNum }) => {
  const permission = JSON.parse(window.localStorage.getItem("user"));
  const clickLikeHandler = () => {
    if (currentLike) {
      deleteLike();
    } else {
      postLike();
    }
  };

  return (
    <>
      <div className="like_button_box">
        {permission !== null ? (
          <button
            className="like_button"
            type="button"
            onClick={clickLikeHandler}
          >
            {currentLike ? (
              <Image className="like__icon" src={FilledLike} alt="like" />
            ) : (
              <Image className="like__icon" src={EmptyLike} alt="unlike" />
            )}
          </button>
        ) : null}
        {`좋아요 ${currentLikeNum}`}
      </div>
    </>
  );
};

export default ShowLike;

ShowLike.propTypes = {
  deleteLike: PropTypes.func.isRequired,
  postLike: PropTypes.func.isRequired,
  currentLike: PropTypes.bool.isRequired,
  currentLikeNum: PropTypes.number.isRequired,
};
