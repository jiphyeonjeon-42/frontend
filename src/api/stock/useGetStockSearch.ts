import { useEffect } from "react";
import { setErrorDialog } from "../../constant/error";
import useApi from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";
import { compareExpect } from "../../util/typeCheck";
import { AxiosResponse } from "axios";
import { Book } from "../../type";

type Props = {
  setOpenTitleAndMessage: (title: string, message: string) => void;
};

const useGetStockSearch = ({ setOpenTitleAndMessage }: Props) => {
  const { searchParams, setSearchResult, searchResult, setPage } = useSearch();
  const { request } = useApi("get", "stock/search", {
    page: searchParams.page - 1,
  });

  const expectedItem = [
    { key: "bookId", type: "number", isNullable: false },
    { key: "callSign", type: "string", isNullable: false },
    { key: "category", type: "string", isNullable: false },
    { key: "title", type: "string", isNullable: false },
  ];

  const refineResponse = (response: AxiosResponse) => {
    const items = compareExpect(
      "stock/search",
      response.data.items,
      expectedItem,
    );
    const { totalPages } = response.data.meta;

    setSearchResult({
      lastPage: parseInt(totalPages, 10),
      list: items,
    });
  };

  const displayError = (error: any) => {
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  useEffect(() => {
    request(refineResponse, displayError);
  }, [searchParams]);

  return {
    list: searchResult.list as Book[],
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
  };
};

export default useGetStockSearch;
