import { useEffect } from "react";
import useApi from "../../hook/useApi";
import useSearch from "../../hook/useSearch";
import { compareExpect } from "../../util/typeCheck";

const useGetBooksSearch = () => {
  const { searchParams, searchResult, setSearchResult, setPage, setQuery } =
    useSearch();

  const { request, Dialog } = useApi("get", "books/search", {
    query: searchParams.query,
    page: searchParams.page - 1,
    limit: 3,
  });

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "author", type: "string", isNullable: false },
    { key: "category", type: "string", isNullable: false },
    { key: "isbn", type: "string", isNullable: true },
    { key: "publisher", type: "string", isNullable: false },
    { key: "callSign", type: "string", isNullable: false },
    { key: "image", type: "string", isNullable: true },
    { key: "isLendable", type: "number", isNullable: false },
  ];

  const refineResponse = response => {
    const book = compareExpect(
      "books/search",
      response.data.items,
      expectedItem,
    );
    const { totalPages } = response.data.meta;
    setSearchResult({
      list: book,
      lastPage: parseInt(totalPages, 10),
    });
  };

  useEffect(() => {
    request(refineResponse);
  }, [searchParams]);

  return {
    bookList: searchResult.list,
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
    setQuery,
    Dialog,
  };
};

export default useGetBooksSearch;
