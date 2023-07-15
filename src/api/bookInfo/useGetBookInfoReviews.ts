import { useRef, useState } from "react";
import { Review } from "../../type";
import { useNewDialog } from "../../hook/useNewDialog";
import axiosPromise from "../../util/axios";

export const useGetBookInfoReviews = (bookInfoId: number) => {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const lastReviewId = useRef<number>();
  const isAllFetched = useRef(false);

  const { addErrorDialog } = useNewDialog();

  const saveList = (response: any) => {
    const newReviews = response.data.items;
    const meta = response.data.meta;
    setReviewList(prev => [...prev, ...newReviews]);
    if (meta.finalReviewsId) {
      lastReviewId.current = meta.finalReviewsId;
    }
    isAllFetched.current = meta.finalPage;
  };

  const fetch = () => {
    axiosPromise("get", `/book-info/${bookInfoId}/reviews`, {
      reviewsId: lastReviewId.current,
      limit: 5,
    })
      .then(saveList)
      .catch(addErrorDialog);
  };

  const deleteReviewById = (id: number) => {
    setReviewList(prev => prev.filter(review => review.reviewsId !== id));
  };
  return { fetch, isAllFetched, reviewList, deleteReviewById };
};
