import { useEffect, useState } from "react";
import { useSearch } from "../../hook/useSearch";
import useApi from "../../hook/useApi";
import { AxiosResponse } from "axios";
import { Tag } from "../../types/Tag";

export const useGetTags = () => {
  const { searchParams, searchResult, setPage, setQuery, setSearchResult } =
    useSearch();
  const [filter, setFilter] = useState<"public" | "private" | null>(null);
  const changeFilter = (newFilter: "public" | "private") => {
    setFilter(filter === newFilter ? null : newFilter);
  };

  const { request, Dialog } = useApi("get", "tags", {
    ...searchParams,
    title: searchParams.query,
    page: searchParams.page - 1,
  });

  const refineResponse = (response: AxiosResponse) => {
    const tags = response.data.items as Tag[];
    const lastPage: number = response.data.meta.totalPage || 10;
    setSearchResult({ list: tags, lastPage });
  };
  useEffect(() => {
    request(refineResponse);
  }, [searchParams]);

  return {
    list: searchResult.list as Tag[],
    lastPage: searchResult.lastPage,
    page: searchParams.page,
    setPage,
    query: searchParams.query,
    setQuery,
    filter,
    setFilter: changeFilter,
    Dialog,
  };
};
