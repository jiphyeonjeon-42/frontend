import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useSearch } from "../../hook/useSearch";
import { useApi } from "../../hook/useApi";
import { Tag } from "../../type/Tag";

export const useGetTags = () => {
  const { searchParams, searchResult, setPage, setQuery, setSearchResult } =
    useSearch();
  const [filter, setFilter] = useState<"public" | "private" | null>(null);
  const changeFilter = (newFilter: "public" | "private") => {
    setFilter(filter === newFilter ? null : newFilter);
  };

  const { request } = useApi("get", "tags", {
    ...searchParams,
    title: searchParams.query,
    page: searchParams.page - 1,
    visibility: filter,
  });

  const refineResponse = (response: AxiosResponse) => {
    const tags = response.data.items as Tag[];
    const lastPage: number = response.data.meta.totalPages || 10;
    setSearchResult({ list: tags, lastPage });
  };
  useEffect(() => {
    request(refineResponse);
  }, [searchParams, filter]);

  return {
    list: searchResult.list as Tag[],
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
    query: searchParams.query,
    setQuery,
    filter,
    setFilter: changeFilter,
  };
};
