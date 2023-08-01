import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";

type Props = {
  bookInfoId: number;
};

export const useGetLike = ({ bookInfoId }: Props) => {
  const { request } = useApi("get", `books/info/${bookInfoId}/like`);
  const [like, setLike] = useState({
    isLiked: false,
    likeNum: 0,
  });

  const refineResponse = (response: any) => {
    setLike(response.data);
  };

  useEffect(() => {
    if (bookInfoId) request(refineResponse);
  }, []);

  return { like, setLike };
};
