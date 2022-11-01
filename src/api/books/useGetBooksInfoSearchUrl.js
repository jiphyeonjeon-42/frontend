import { useEffect, useState } from "react";
import useApi from "../../hook/useApi";
import useParseUrlQueryString from "../../hook/useParseUrlQueryString";
import { compareExpect } from "../../util/typeCheck";
import { searchUrlQueryKeys } from "../../data/key";

const useGetBooksInfoSearchUrl = () => {
  const [searchResult, setSearchResult] = useState({
    bookList: [],
    categoryList: [],
    lastPage: 5,
    categoryIndex: -1,
  });
  const [query, page, sort, category] =
    useParseUrlQueryString(searchUrlQueryKeys);

  const { request, Dialog } = useApi("get", "books/info/search", {
    query,
    page: page ? page - 1 : 0,
    limit: 20,
    sort,
    category,
  });

  const expectedItem = [
    { key: "author", type: "string", isNullable: false },
    { key: "category", type: "string", isNullable: false },
    { key: "createdAt", type: "string", isNullable: false },
    { key: "id", type: "number", isNullable: false },
    { key: "image", type: "string", isNullable: true },
    { key: "isbn", type: "string", isNullable: true },
    { key: "lendingCnt", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "publishedAt", type: "string", isNullable: true },
    { key: "publisher", type: "string", isNullable: false },
    { key: "updatedAt", type: "string", isNullable: false },
  ];

  const expectedCategoryItem = [
    { key: "name", type: "string", isNullable: false },
    { key: "count", type: "number", isNullable: false },
  ];
  const refineResponse = response => {
    const book = compareExpect(
      "books/info/search",
      response.data.items,
      expectedItem,
    );
    const categories = compareExpect(
      "books/info/search",
      response.data.categories,
      expectedCategoryItem,
    );
    const { totalPages } = response.data.meta;
    const categoryIndex = categories.findIndex(i => i.name === category);
    setSearchResult({
      bookList: book,
      categoryList: categories,
      lastPage: totalPages,
      categoryIndex: categoryIndex > 0 ? categoryIndex : 0,
    });
  };

  useEffect(() => {
    request(refineResponse);
  }, [query, page, sort, category]);

  return {
    ...searchResult,
    Dialog,
  };
};

export default useGetBooksInfoSearchUrl;
