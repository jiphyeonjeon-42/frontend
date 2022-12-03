import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";

const useGetReviews = () => {
  const [params, setParams] = useState({
    bookInfoid: "",
    userId: "",
    title: "",
    intraId: "",
    page: 1,
    sort: "DESC",
  });

  const [result, setResult] = useState({
    reviewList: [],
    lastPage: 5,
  });
  const setPage = page => {
    setParams({ ...params, page });
  };

  const refineResponse = response => {
    const { items } = response.data;
    const { totalPages } = response.data.meta;

    setResult({ reviewList: items, lastPage: totalPages });
  };

  const { request, Dialog } = useApi("get", "reviews", {
    ...params,
    page: params.page - 1,
  });

  useEffect(() => {
    request(refineResponse);
  }, [params]);

  return {
    page: params.page,
    setPage,
    reviewList: result.reviewList,
    lastPage: result.lastPage,
    Dialog,
  };
};

export default useGetReviews;
