import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { Review } from "../../type";

export const useGetMyReviewInfo = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const { request, Dialog } = useApi("get", `reviews/my-reviews`, {
    limit: 5,
    page: page - 1,
    isMyReview: true,
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
    Dialog,
  };
};
