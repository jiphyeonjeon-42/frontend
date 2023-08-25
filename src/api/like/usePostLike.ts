import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useApi } from "~/hook/useApi";

type Props = {
  setLike: Dispatch<SetStateAction<{ isLiked: boolean; likeNum: number }>>;
};

export const usePostLike = ({ setLike }: Props) => {
  const [bookInfoId, setBookInfoId] = useState<number>();
  const { request } = useApi("post", `books/info/${bookInfoId}/like`);

  const onSuccess = () => {
    setLike(prev => ({ isLiked: true, likeNum: prev.likeNum + 1 }));
  };

  useEffect(() => {
    if (bookInfoId) request(onSuccess);
    setBookInfoId(undefined);
  }, [bookInfoId]);

  return { setBookInfoId };
};
