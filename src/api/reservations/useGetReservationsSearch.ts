import { useEffect, useState } from "react";
import useApi from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";
import { compareExpect } from "../../util/typeCheck";
import { Reservation } from "../../type";

const useGetReservationsSearch = () => {
  const { searchParams, searchResult, setSearchResult, setPage, setQuery } =
    useSearch();
  const [filter, setSearchFilter] = useState({
    isPending: false,
    isWaiting: false,
    isExpired: false,
  });

  const setFilter = (newFilter: {
    isPending: boolean;
    isWaiting: boolean;
    isExpired: boolean;
  }) => {
    setSearchFilter(newFilter);
    setPage(1);
  };

  const filterState = () => {
    if (filter.isPending) return "pending";
    if (filter.isWaiting) return "waiting";
    if (filter.isExpired) return "expired";
    return "all";
  };

  const { request, Dialog } = useApi("get", "reservations/search", {
    query: searchParams.query,
    page: searchParams.page - 1,
    limit: 5,
    filter: filterState(),
  });

  const expectedItem = [
    { key: "bookId", type: "number", isNullable: true },
    { key: "callSign", type: "string", isNullable: true },
    { key: "createdAt", type: "string", isNullable: false },
    { key: "endAt", type: "string", isNullable: true },
    { key: "image", type: "string", isNullable: true },
    { key: "login", type: "string", isNullable: true },
    { key: "penaltyDays", type: "number", isNullable: false },
    { key: "reservationsId", type: "number", isNullable: false },
    { key: "status", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "userId", type: "number", isNullable: false },
  ];

  const refineResponse = (response: any) => {
    const info = compareExpect(
      "reservations/search",
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
  }, [searchParams, filter]);
  return {
    reservedLoanList: searchResult.list as Reservation[],
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
    setQuery,
    filter,
    setFilter,
    Dialog,
  };
};

export default useGetReservationsSearch;
