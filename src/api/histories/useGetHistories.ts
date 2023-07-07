import { useEffect, useState } from "react";
import { setErrorDialog } from "../../constant/error";
import { useApi } from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";
import { compareExpect } from "../../util/typeCheck";
import { History } from "../../type";

type Props = {
  setOpenTitleAndMessage: (title: string, message: string) => void;
  initWho?: string;
};

export const useGetHistories = ({ setOpenTitleAndMessage, initWho }: Props) => {
  const { searchParams, searchResult, setSearchResult, setPage, setQuery } =
    useSearch();
  const [who, setWho] = useState(initWho ?? "all");
  const [type, setType] = useState("");

  const { request, Dialog } = useApi("get", "histories", {
    query: searchParams.query,
    page: searchParams.page - 1,
    limit: 5,
    type,
    who,
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

  const refineResponse = (response: any) => {
    const info = compareExpect("histories", response.data.items, expectedItem);
    const { totalPages } = response.data.meta;
    setSearchResult({
      lastPage: parseInt(totalPages, 10),
      list: info,
    });
  };

  const displayError = (error: any) => {
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  useEffect(() => {
    request(refineResponse, displayError);
  }, [searchParams, who, type]);

  return {
    historiesList: searchResult.list as History[],
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
