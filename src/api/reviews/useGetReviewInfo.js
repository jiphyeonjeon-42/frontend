import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";

export const useGetReviewInfo = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const userId = JSON.parse(window.localStorage.getItem("user")).id;
  const { request, Dialog } = useApi("get", `reviews`, {
    userId,
    page: page - 1,
  });

  const refineResponse = response => {
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
    Dialog,
  };
};
