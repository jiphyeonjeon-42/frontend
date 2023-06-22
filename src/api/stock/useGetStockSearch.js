import { useEffect } from "react";
import { setErrorDialog } from "../../constant/error";
import { useApi } from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";
import { compareExpect } from "../../util/typeCheck";

const useGetStockSearch = ({ setOpenTitleAndMessage }) => {
  const { searchParams, setSearchResult, searchResult, setPage } = useSearch();
  const { request } = useApi("get", "stock/search", {
    page: searchParams.page - 1,
    limit: searchParams.limit,
  });

  const expectedItem = [
    { key: "bookId", type: "number", isNullable: false },
    { key: "callSign", type: "string", isNullable: false },
    { key: "category", type: "string", isNullable: false },
    { key: "title", type: "string", isNullable: false },
  ];

  const refineResponse = response => {
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

  const displayError = error => {
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  useEffect(() => {
    request(refineResponse, displayError);
  }, [searchParams]);

  return { ...searchResult, page: searchParams.page, setPage };
};

export default useGetStockSearch;
