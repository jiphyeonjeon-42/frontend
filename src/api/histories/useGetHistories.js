import { useEffect, useState } from "react";
import { setErrorDialog } from "../../data/error";
import useApi from "../../hook/useApi";
import useSearch from "../../hook/useSearch";

const useGetHistories = ({ setOpenTitleAndMessage }) => {
  const { searchParams, searchResult, setSearchResult, setPage, setQuery } =
    useSearch();
  const [who, setWho] = useState("all");
  const [type, setType] = useState("");

  const { request, Dialog } = useApi("get", "histories", {
    query: searchParams.query,
    page: searchParams.page - 1,
    limit: 5,
    type,
    who,
  });

  const refineResponse = response => {
    // TODO: expectedItems 만들기
    const info = response.data.items;
    const { totalPages } = response.data.meta;
    setSearchResult({
      lastPage: parseInt(totalPages, 10),
      list: info,
    });
  };

  const displayError = error => {
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  useEffect(() => {
    request(refineResponse, displayError);
  }, [searchParams, who, type]);

  return {
    historiesList: searchResult.list,
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    type,
    setPage,
    setQuery,
    setWho,
    setType,
    Dialog,
  };
};

export default useGetHistories;
