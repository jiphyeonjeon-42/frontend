import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { useApi } from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";
import { compareExpect } from "../../util/typeCheck";
import { History } from "../../type";

export const useGetHistories = () => {
  const { searchParams, searchResult, setSearchResult, setPage, setQuery } =
    useSearch();

  const { request } = useApi("get", "histories", {
    query: searchParams.query,
    page: searchParams.page - 1,
    limit: 5,
    type: "",
    who: "all",
  });

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "lendingCondition", type: "string", isNullable: true },
    { key: "login", type: "string", isNullable: false },
    { key: "returningCondition", type: "string", isNullable: true },
    { key: "penaltyDays", type: "number", isNullable: true },
    { key: "title", type: "string", isNullable: false },
    { key: "bookInfoId", type: "number", isNullable: false },
    { key: "createdAt", type: "string", isNullable: false },
    { key: "returnedAt", type: "string", isNullable: true },
    { key: "dueDate", type: "string", isNullable: true },
    { key: "lendingLibrarianNickName", type: "string", isNullable: false },
    { key: "returningLibrarianNickname", type: "string", isNullable: true },
    { key: "callSign", type: "string", isNullable: true },
    { key: "image", type: "string", isNullable: true },
  ];

  const refineResponse = (response: AxiosResponse) => {
    const info = compareExpect("histories", response.data.items, expectedItem);
    const { totalPages } = response.data.meta;
    setSearchResult({
      lastPage: parseInt(totalPages, 10),
      list: info,
    });
  };

  useEffect(() => {
    request(refineResponse);
  }, [searchParams]);

  return {
    historiesList: searchResult.list as History[],
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
    setQuery,
  };
};

export default useGetHistories;
