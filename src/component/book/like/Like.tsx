import { useState } from "react";
import usePostLike from "../../../api/like/usePostLike";
import useDeleteLike from "../../../api/like/useDeleteLike";
import useGetLike from "../../../api/like/useGetLike";
import useDialog from "../../../hook/useDialog";
import ShowLike from "./ShowLike";
import "../../../asset/css/BookDetail.css";

type Props = {
  initBookInfoId: string;
};

const Like = ({ initBookInfoId }: Props) => {
  const { setOpenTitleAndMessage } = useDialog();
  const [currentLike, setCurrentLike] = useState();
  const [currentLikeNum, setCurrentLikeNum] = useState(0);
  useGetLike({
    setOpenTitleAndMessage,
    initBookInfoId,
    setCurrentLike,
    setCurrentLikeNum,
  });
  const { setBookInfoId: setDeleteLike } = useDeleteLike({
    setOpenTitleAndMessage,
  });
  const { setBookInfoId: setPostLike } = usePostLike({
    setOpenTitleAndMessage,
  });
  const deleteLike = () => {
    setCurrentLike(false);
    setDeleteLike(initBookInfoId);
    setCurrentLikeNum(currentLikeNum - 1);
  };
  const postLike = () => {
    setCurrentLike(true);
    setPostLike(initBookInfoId);
    setCurrentLikeNum(currentLikeNum + 1);
  };
  return (
    <>
      <ShowLike
        setOpenTitleAndMessage={setOpenTitleAndMessage}
        deleteLike={deleteLike}
        postLike={postLike}
        initBookInfoId={initBookInfoId}
        currentLike={currentLike}
        currentLikeNum={currentLikeNum}
      />
    </>
  );
};

export default Like;
