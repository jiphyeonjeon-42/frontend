import { useState } from "react";
import PropTypes from "prop-types";
import useDebounce from "./useDebounce";

const useSearch = () => {
  const [searchParams, setSearchParams] = useState({
    query: "",
    page: 1,
  });
  const [searchResult, setSearchResult] = useState({
    lastPage: 5,
    list: [],
  });

  const debounce = useDebounce();

  const setQuery = newQuery => {
    debounce(() => {
      setSearchParams({
        ...searchParams,
        query: newQuery,
        page: 1,
      });
    }, 400);
  };

  const setQueryNoDelay = newQuery => {
    setSearchParams({
      ...searchParams,
      query: newQuery,
      page: 1,
    });
  };

  const setPage = newPage => {
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

export default useSearch;

useSearch.propTypes = {
  searchFuction: PropTypes.func.isRequired,
};
