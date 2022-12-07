import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";

const useGetReviews = () => {
  const [params, setParams] = useState({
    titleOrNickname: "",
    page: 1,
    diabled: undefined,
  });

  const [result, setResult] = useState({
    reviewList: [],
    lastPage: 5,
  });

  const setPage = page => {
    setParams({ ...params, page });
  };
  const setQuery = query => {
    setParams({ ...params, titleOrNickname: query });
  };
  const setDisabled = diabled => {
    setParams({ ...params, diabled });
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
    setQuery,
    disabled: params.diabled,
    setDisabled,
    reviewList: result.reviewList,
    lastPage: result.lastPage,
    Dialog,
  };
};

export default useGetReviews;
