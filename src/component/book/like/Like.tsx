import { useState } from "react";
import { usePostLike } from "../../../api/like/usePostLike";
import { useDeleteLike } from "../../../api/like/useDeleteLike";
import { useGetLike } from "../../../api/like/useGetLike";
import { usePermission } from "../../../hook/usePermission";

import Image from "../../utils/Image";
import FilledLike from "../../../asset/img/like_filled.svg";
import EmptyLike from "../../../asset/img/like_empty.svg";

type Props = {
  initBookInfoId: string;
};

const Like = ({ initBookInfoId }: Props) => {
  const [currentLike, setCurrentLike] = useState(false);
  const [currentLikeNum, setCurrentLikeNum] = useState(0);

  const { is42Authenticated } = usePermission();

  useGetLike({
    initBookInfoId: +initBookInfoId,
    setCurrentLike,
    setCurrentLikeNum,
  });
  const { setBookInfoId: setDeleteLike } = useDeleteLike();
  const { setBookInfoId: setPostLike } = usePostLike();
  const deleteLike = () => {
    setCurrentLike(false);
    setDeleteLike(+initBookInfoId);
    setCurrentLikeNum(currentLikeNum - 1);
  };
  const postLike = () => {
    setCurrentLike(true);
    setPostLike(+initBookInfoId);
    setCurrentLikeNum(currentLikeNum + 1);
  };

  return (
    <div className="like_button_box">
      {is42Authenticated ? (
        <button
          className="like_button"
          type="button"
          onClick={currentLike ? deleteLike : postLike}
        >
          <Image
            className="like__icon"
            src={currentLike ? FilledLike : EmptyLike}
            alt={currentLike ? "liked" : "unliked"}
          />
        </button>
      ) : null}
      {`좋아요 ${currentLikeNum}`}
    </div>
  );
};

export default Like;
