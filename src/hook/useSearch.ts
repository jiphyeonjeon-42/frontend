import { useState } from "react";
import useDebounce from "./useDebounce";

export const useSearch = () => {
  const [searchParams, setSearchParams] = useState({
    query: "",
    page: 1,
  });
  const [searchResult, setSearchResult] = useState<{
    list: unknown[];
    lastPage: number;
  }>({
    list: [],
    lastPage: 5,
  });

  const debounce = useDebounce();

  const setQuery = (newQuery: string) => {
    debounce(() => {
      setSearchParams({
        ...searchParams,
        query: newQuery,
        page: 1,
      });
    }, 400);
  };

  const setQueryNoDelay = (newQuery: string) => {
    setSearchParams({
      ...searchParams,
      query: newQuery,
      page: 1,
    });
  };

  const setPage = (newPage: number) => {
    if (newPage !== searchParams.page) {
      setSearchParams({
        ...searchParams,
        page: newPage,
      });
    }
  };
  return {
    searchResult,
    setSearchResult,
    searchParams,
    setPage,
    setQuery,
    setQueryNoDelay,
  };
};
