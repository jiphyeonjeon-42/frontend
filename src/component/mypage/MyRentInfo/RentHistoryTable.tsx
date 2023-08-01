import { useGetLike, usePostLike, useDeleteLike } from "~/api/like";
import Image from "~/component/utils/Image";
import FilledLike from "~/asset/img/like_filled.svg";
import EmptyLike from "~/asset/img/like_empty.svg";
import type { History } from "~/type";
import "~/asset/css/RentHistory.css";

type Props = {
  factor: History;
};

const RentHistoryTable = ({ factor }: Props) => {
  const { like, setLike } = useGetLike({
    bookInfoId: factor.bookInfoId,
  });
  const { setBookInfoId: setBookInfoIdPost } = usePostLike();
  const postLike = (bookInfoId: number) => {
    setBookInfoIdPost(bookInfoId);
  };
  const { setBookInfoId: setBookInfoIdDelete } = useDeleteLike();
  const deleteLike = (bookInfoId: number) => {
    setBookInfoIdDelete(bookInfoId);
  };

  const clickLikeHandler = (bookInfoId: number) => {
    if (like.isLiked) {
      deleteLike(bookInfoId);
      setLike({ ...like, isLiked: false });
    } else {
      postLike(bookInfoId);
      setLike({ ...like, isLiked: true });
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
        {like.isLiked ? (
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
