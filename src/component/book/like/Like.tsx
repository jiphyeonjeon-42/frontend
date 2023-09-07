import { useState } from "react";
import { usePostLike } from "../../../api/like/usePostLike";
import { useDeleteLike } from "../../../api/like/useDeleteLike";
import { useGetLike } from "../../../api/like/useGetLike";
import ShowLike from "./ShowLike";
import "../../../asset/css/BookDetail.css";

type Props = {
  initBookInfoId: string;
};

const Like = ({ initBookInfoId }: Props) => {
  const [currentLike, setCurrentLike] = useState(false);
  const [currentLikeNum, setCurrentLikeNum] = useState(0);

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
    <>
      <ShowLike
        deleteLike={deleteLike}
        postLike={postLike}
        currentLike={currentLike}
        currentLikeNum={currentLikeNum}
      />
    </>
  );
};

export default Like;
