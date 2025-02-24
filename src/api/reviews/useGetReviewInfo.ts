import { useEffect, useState } from "react";
import { useApi } from "~/hook/useApi";
import { userIdAtom } from "~/atom/userAtom";
import { useAtomValue } from "jotai";

export const useGetReviewInfo = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const userId = useAtomValue(userIdAtom);
  const { request } = useApi("get", `reviews`, {
    userId,
    page: page - 1,
  });

  const refineResponse = (response: any) => {
    const info = response.data.items;
    const { totalPages } = response.data.meta;
    setReviewList(info);
    setLastPage(totalPages);
  };

  useEffect(() => {
    request(refineResponse);
  }, [page]);

  return {
    page,
    setPage,
    lastPage,
    reviewList,
    setReviewList,
  };
};
