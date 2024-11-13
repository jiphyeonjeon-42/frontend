import { useGetLike, usePostLike, useDeleteLike } from "~/api/like";
import { usePermission } from "~/hook/usePermission";

import Image from "~/component/utils/Image";
import FilledLike from "~/asset/img/like_filled.svg";
import EmptyLike from "~/asset/img/like_empty.svg";

type Props = {
  bookInfoId: string;
};

const Like = ({ bookInfoId }: Props) => {
  const { is42Authenticated } = usePermission();

  const { like, setLike } = useGetLike({ bookInfoId: +bookInfoId });
  const { setBookInfoId: requestdelete } = useDeleteLike({ setLike });
  const { setBookInfoId: requestPost } = usePostLike({ setLike });

  const deleteLike = () => {
    requestdelete(+bookInfoId);
  };
  const postLike = () => {
    requestPost(+bookInfoId);
  };

  return (
    <div className="like_button_box">
      <button
        className={`like_button ${!is42Authenticated ? "disabled" : ""}`}
        type="button"
        onClick={like.isLiked ? deleteLike : postLike}
        disabled={!is42Authenticated}
      >
        {is42Authenticated ? (
          <Image
            className="like__icon"
            src={like.isLiked ? FilledLike : EmptyLike}
            alt={like.isLiked ? "liked" : "unliked"}
          />
        ) : null}
        {`좋아요 ${like.likeNum}`}
      </button>
    </div>
  );
};

export default Like;
