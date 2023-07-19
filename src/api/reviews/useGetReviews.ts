import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { Review } from "../../type";

export const useGetReviews = () => {
  const [params, setParams] = useState({
    titleOrNickname: "",
    page: 1,
    disabled: "-1",
  });

  const [result, setResult] = useState({
    reviewList: [],
    lastPage: 5,
  });

  const setPage = (page: number) => {
    setParams({ ...params, page });
  };
  const setQuery = (query: string) => {
    setParams({ ...params, titleOrNickname: query });
  };
  const setSelectedType = (type: string | undefined) => {
    if (type) setParams({ ...params, disabled: type });
  };

  const { request } = useApi("get", "reviews", {
    ...params,
    page: params.page - 1,
  });

  const refineResponse = (response: any) => {
    const { items } = response.data;
    const { totalPages } = response.data.meta;

    setResult({ reviewList: items, lastPage: totalPages });
  };

  useEffect(() => {
    request(refineResponse);
  }, [params]);

  return {
    page: params.page,
    setPage,
    setQuery,
    selectedType: params.disabled,
    setSelectedType,
    reviewList: result.reviewList as Review[],
    lastPage: result.lastPage,
  };
};
