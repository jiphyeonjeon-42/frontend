import axiosPromise from "../../util/axios";

export const useDeleteReviewsReviewsId = () => {
  const requestToDelete = (reviewsId: number) =>
    axiosPromise("delete", `/reviews/${reviewsId}`);

  return { requestToDelete };
};
