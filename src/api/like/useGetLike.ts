import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";

type Props = {
  initBookInfoId: number;
  setCurrentLike: (isLiked: boolean) => void;
  setCurrentLikeNum?: (likeNum: number) => void;
};

export const useGetLike = ({
  initBookInfoId,
  setCurrentLike,
  setCurrentLikeNum,
}: Props) => {
  const { request } = useApi("get", `books/info/${initBookInfoId}/like`);
  const [likeData, setLikeData] = useState({});

  const refineResponse = (response: any) => {
    const refinelikeData = response.data;
    setLikeData(refinelikeData);
    setCurrentLike(refinelikeData.isLiked);
    setCurrentLikeNum && setCurrentLikeNum(refinelikeData.likeNum);
  };

  useEffect(() => {
    if (initBookInfoId) request(refineResponse);
  }, []);

  return { likeData };
};
