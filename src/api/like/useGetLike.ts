import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";

type Props = {
  bookInfoId: number;
  setCurrentLike: (isLiked: boolean) => void;
  setCurrentLikeNum?: (likeNum: number) => void;
};

export const useGetLike = ({
  bookInfoId,
  setCurrentLike,
  setCurrentLikeNum,
}: Props) => {
  const { request } = useApi("get", `books/info/${bookInfoId}/like`);
  const [likeData, setLikeData] = useState({});

  const refineResponse = (response: any) => {
    const refinelikeData = response.data;
    setLikeData(refinelikeData);
    setCurrentLike(refinelikeData.isLiked);
    setCurrentLikeNum && setCurrentLikeNum(refinelikeData.likeNum);
  };

  useEffect(() => {
    if (bookInfoId) request(refineResponse);
  }, []);

  return { likeData };
};
