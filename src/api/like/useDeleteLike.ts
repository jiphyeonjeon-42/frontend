import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";

export const useDeleteLike = (initBookInfoId?: number) => {
  const [bookInfoId, setBookInfoId] = useState(initBookInfoId);
  const { request } = useApi("delete", `books/info/${bookInfoId}/like`);

  useEffect(() => {
    if (bookInfoId) request(() => {});
    setBookInfoId(undefined);
  }, [bookInfoId]);

  return { setBookInfoId };
};
