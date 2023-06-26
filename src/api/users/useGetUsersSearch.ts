import { useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";
import { compareExpect } from "../../util/typeCheck";
import { User } from "../../type";
import { AxiosResponse } from "axios";

export const useGetUsersSearch = ({ limit }: { limit: number }) => {
  const {
    searchResult,
    setSearchResult,
    searchParams,
    setPage,
    setQuery,
    setQueryNoDelay,
  } = useSearch();

  const { request } = useApi("get", "users/search", {
    nicknameOrEmail: searchParams.query,
    page: searchParams.page - 1,
    limit,
  });

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "email", type: "string", isNullable: false },
    { key: "intraId", type: "number", isNullable: true },
    { key: "nickname", type: "string", isNullable: true },
    { key: "role", type: "number", isNullable: false },
    { key: "slack", type: "string", isNullable: true },
    { key: "overDueDay", type: "number", isNullable: false },
    { key: "penaltyEndDate", type: "string", isNullable: false },
    {
      key: "lendings",
      type: [
        { key: "author", type: "string", isNullable: false },
        { key: "bookInfoId", type: "number", isNullable: false },
        { key: "duedate", type: "string", isNullable: false },
        { key: "image", type: "string", isNullable: true },
        { key: "lendDate", type: "string", isNullable: false },
        { key: "lendingCondition", type: "string", isNullable: false },
        { key: "overDueDay", type: "number", isNullable: false },
        { key: "reservedNum", type: "number", isNullable: false },
        { key: "title", type: "string", isNullable: false },
        { key: "userId", type: "number", isNullable: false },
      ],
      isNullable: false,
    },
    { key: "reservations", type: "*", isNullable: false },
  ];

  const refineResponse = (response: AxiosResponse) => {
    const user = compareExpect(
      "users/search",
      response.data.items,
      expectedItem,
    );
    const { totalPages } = response.data.meta;
    setSearchResult({
      lastPage: parseInt(totalPages, 10),
      list: user,
    });
  };

  useEffect(() => {
    request(refineResponse);
  }, [searchParams]);

  return {
    userList: searchResult.list as User[],
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
    setQuery,
    setQueryNoDelay,
  };
};