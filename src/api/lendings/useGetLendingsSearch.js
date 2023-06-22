import { useEffect, useState } from "react";
import { setErrorDialog } from "../../constant/error";
import { useApi } from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";
import { compareExpect } from "../../util/typeCheck";

const useGetLendingsSearch = ({ setOpenTitleAndMessage }) => {
  const { searchParams, searchResult, setSearchResult, setPage, setQuery } =
    useSearch();
  const [isSortNew, setIsSearchSort] = useState(false);

  const setIsSortNew = newSort => {
    setIsSearchSort(newSort);
    setPage(1);
  };

  const { request, Dialog } = useApi("get", "lendings/search", {
    query: searchParams.query,
    page: searchParams.page - 1,
    limit: 5,
    sort: isSortNew ? "new" : "old",
  });

  const expectedItem = [
    { key: "callSign", type: "string", isNullable: true },
    { key: "createdAt", type: "string", isNullable: false },
    { key: "dueDate", type: "string", isNullable: true },
    { key: "id", type: "number", isNullable: true },
    { key: "lendingCondition", type: "string", isNullable: false },
    { key: "login", type: "string", isNullable: true },
    { key: "penaltyDays", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
  ];

  const refineResponse = response => {
    const info = compareExpect(
      "lendings/search",
      response.data.items,
      expectedItem,
    );
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
  }, [searchParams, isSortNew]);
  return {
    returnBookList: searchResult.list,
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
    setQuery,
    isSortNew,
    setIsSortNew,
    Dialog,
  };
};

export default useGetLendingsSearch;
