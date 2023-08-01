import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";

type Props = {
  setLike: React.Dispatch<
    React.SetStateAction<{ isLiked: boolean; likeNum: number }>
  >;
};

export const useDeleteLike = ({ setLike }: Props) => {
  const [bookInfoId, setBookInfoId] = useState<number>();
  const { request } = useApi("delete", `books/info/${bookInfoId}/like`);

  const onSuccess = () => {
    setLike(prev => ({ isLiked: false, likeNum: prev.likeNum - 1 }));
  };

  useEffect(() => {
    if (bookInfoId) request(onSuccess);
    setBookInfoId(undefined);
  }, [bookInfoId]);

  return { setBookInfoId };
};
