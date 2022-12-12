import { useEffect, useState } from "react";
import useApi from "../../hook/useApi";

const useGetMyReviewInfo = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const { request, Dialog } = useApi("get", `reviews/my-reviews`, {
    limit: 5,
    page: page - 1,
    isMyReview: true,
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

export default useGetMyReviewInfo;
