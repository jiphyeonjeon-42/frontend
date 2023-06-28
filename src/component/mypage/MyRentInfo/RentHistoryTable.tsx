import { useState } from "react";
import { useGetLike } from "../../../api/like/useGetLike";
import { usePostLike } from "../../../api/like/usePostLike";
import { useDeleteLike } from "../../../api/like/useDeleteLike";
import Image from "../../utils/Image";
import FilledLike from "../../../asset/img/like_filled.svg";
import EmptyLike from "../../../asset/img/like_empty.svg";
import { History } from "../../../type";
import "../../../asset/css/RentHistory.css";

type Props = {
  history: History;
};
const RentHistoryTable = ({ history }: Props) => {
  const [currentLike, setCurrentLike] = useState(false);
  useGetLike({
    initBookInfoId: history.bookInfoId,
    setCurrentLike,
  });
  const { setBookInfoId: setBookInfoIdPost } = usePostLike({});
  const postLike = (bookInfoId: number) => {
    setBookInfoIdPost(bookInfoId);
  };
  const { setBookInfoId: setBookInfoIdDelete } = useDeleteLike({});
  const deleteLike = (bookInfoId: number) => {
    setBookInfoIdDelete(bookInfoId);
  };

  const clickLikeHandler = (bookInfoId: number) => {
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
        {history?.createdAt}
      </span>
      <span className="rent_histories__table_info__title">
        {history?.title}
      </span>
      <span className="rent_histories__table_info__date">
        {history.returnedAt ? history.returnedAt : "대출중"}
      </span>
      <button
        className="rent_histories__table-list__button"
        type="button"
        onClick={() => {
          clickLikeHandler(history.bookInfoId);
        }}
      >
        <Image
          className="mypage__like_icon"
          src={currentLike ? FilledLike : EmptyLike}
          alt={currentLike ? "like" : "unlike"}
        />
      </button>
      <a href={`/info/${history.bookInfoId}`}> 리뷰쓰기 </a>
    </div>
  );
};

export default RentHistoryTable;
