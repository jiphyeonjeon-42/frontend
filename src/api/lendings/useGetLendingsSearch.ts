import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";
import { compareExpect } from "../../util/typeCheck";
import { Lending } from "../../type";

export const useGetLendingsSearch = () => {
  const { searchParams, searchResult, setSearchResult, setPage, setQuery } =
    useSearch();
  const [isSortNew, setIsSearchSort] = useState(false);

  const setIsSortNew = (newIsSortNew: boolean) => {
    setIsSearchSort(newIsSortNew);
    setPage(1);
  };

  const { request } = useApi("get", "lendings/search", {
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

  const refineResponse = (response: any) => {
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

  useEffect(() => {
    request(refineResponse);
  }, [searchParams, isSortNew]);

  return {
    returnBookList: searchResult.list as Lending[],
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
    setQuery,
    isSortNew,
    setIsSortNew,
  };
};
