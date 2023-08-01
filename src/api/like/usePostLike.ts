import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";

export const usePostLike = (initBookInfoId?: number) => {
  const [bookInfoId, setBookInfoId] = useState(initBookInfoId);
  const { request } = useApi("post", `books/info/${bookInfoId}/like`);
  
  useEffect(() => {
    if (bookInfoId) request(() => {});
    setBookInfoId(undefined);
  }, [bookInfoId]);

  return { setBookInfoId };
};
