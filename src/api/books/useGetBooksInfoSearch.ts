import { useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";
import { Book } from "../../type";

export const useGetBooksInfoSearch = ({ limit }: { limit: number }) => {
  const { searchParams, searchResult, setSearchResult, setPage, setQuery } =
    useSearch();

  const { request, Dialog } = useApi("get", "books/info/search", {
    query: searchParams.query,
    page: searchParams.page - 1,
    limit,
  });

  const refineResponse = (response: any) => {
    const book = response.data.items;
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
    bookList: searchResult.list as Book[],
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
    setQuery,
    Dialog,
  };
};
