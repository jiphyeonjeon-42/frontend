import { useState } from "react";
import useDialog from "../../../hook/useDialog";
import useGetLike from "../../../api/like/useGetLike";
import usePostLike from "../../../api/like/usePostLike";
import useDeleteLike from "../../../api/like/useDeleteLike";
import Image from "../../utils/Image";
import FilledLike from "../../../img/like_filled.svg";
import EmptyLike from "../../../img/like_empty.svg";
import "../../../css/RentHistory.css";

const RentHistoryTable = ({ factor }) => {
  const [currentLike, setCurrentLike] = useState();
  const { setOpenTitleAndMessage } = useDialog();
  useGetLike({
    setOpenTitleAndMessage,
    initBookInfoId: factor.bookInfoId,
    setCurrentLike,
  });
  const { setBookInfoId: setBookInfoIdPost } = usePostLike({
    setOpenTitleAndMessage,
  });
  const postLike = bookInfoId => {
    setBookInfoIdPost(bookInfoId);
  };
  const { setBookInfoId: setBookInfoIdDelete } = useDeleteLike({
    setOpenTitleAndMessage,
  });
  const deleteLike = bookInfoId => {
    setBookInfoIdDelete(bookInfoId);
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
    <div className="rent_histories__table-list">
      <span className="rent_histories__table_info__date">
        {factor?.createdAt}
      </span>
      <span className="rent_histories__table_info__title">{factor?.title}</span>
      <span className="rent_histories__table_info__date">
        {factor.returnedAt ? factor.returnedAt : "대출중"}
      </span>
      <button
        className="rent_histories__table-list__button"
        type="button"
        onClick={() => {
          clickLikeHandler(factor.bookInfoId);
        }}
      >
        {currentLike ? (
          <Image className="mypage__like_icon" src={FilledLike} alt="like" />
        ) : (
          <Image className="mypage__like_icon" src={EmptyLike} alt="unlike" />
        )}
      </button>
      <a href={`/info/${factor.bookInfoId}`}> 리뷰쓰기 </a>
    </div>
  );
};

export default RentHistoryTable;
