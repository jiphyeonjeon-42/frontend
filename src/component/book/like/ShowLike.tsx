import Image from "../../utils/Image";
import FilledLike from "../../../img/like_filled.svg";
import EmptyLike from "../../../img/like_empty.svg";
import "../../../css/BookDetail.css";

type ShowLikeProps = {
  deleteLike(...args: unknown[]): unknown;
  postLike(...args: unknown[]): unknown;
  currentLike: boolean;
  currentLikeNum: number;
};

const ShowLike = ({
  deleteLike,
  postLike,
  currentLike,
  currentLikeNum,
}: ShowLikeProps) => {
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
