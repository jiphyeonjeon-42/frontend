import { usePostLike } from "../../../api/like/usePostLike";
import { useDeleteLike } from "../../../api/like/useDeleteLike";
import { useGetLike } from "../../../api/like/useGetLike";
import { usePermission } from "../../../hook/usePermission";

import Image from "../../utils/Image";
import FilledLike from "../../../asset/img/like_filled.svg";
import EmptyLike from "../../../asset/img/like_empty.svg";

type Props = {
  bookInfoId: string;
};

const Like = ({ bookInfoId }: Props) => {
  const { is42Authenticated } = usePermission();

  const { like, setLike } = useGetLike({ bookInfoId: +bookInfoId });
  const { setBookInfoId: setDeleteLike } = useDeleteLike();
  const { setBookInfoId: setPostLike } = usePostLike();

  const deleteLike = () => {
    setLike({
      isLiked: false,
      likeNum: like.likeNum - 1,
    });
    setDeleteLike(+bookInfoId);
  };
  const postLike = () => {
    setLike({
      isLiked: true,
      likeNum: like.likeNum + 1,
    });
    setPostLike(+bookInfoId);
  };

  return (
    <div className="like_button_box">
      {is42Authenticated ? (
        <button
          className="like_button"
          type="button"
          onClick={like.isLiked ? deleteLike : postLike}
        >
          <Image
            className="like__icon"
            src={like.isLiked ? FilledLike : EmptyLike}
            alt={like.isLiked ? "liked" : "unliked"}
          />
        </button>
      ) : null}
      {`좋아요 ${like.likeNum}`}
    </div>
  );
};

export default Like;
