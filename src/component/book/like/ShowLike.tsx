import Image from "../../utils/Image";
import FilledLike from "../../../asset/img/like_filled.svg";
import EmptyLike from "../../../asset/img/like_empty.svg";
import "../../../asset/css/BookDetail.css";

type Props = {
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
}: Props) => {
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
