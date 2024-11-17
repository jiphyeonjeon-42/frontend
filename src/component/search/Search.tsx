import { useRef, useCallback, useEffect, memo } from "react";
import { useSearchParams } from "react-router-dom";
import WishBook from "./WishBook";
import SearchBanner from "./SearchBanner";
import { useParseUrlQueryString } from "../../hook/useParseUrlQueryString";
import { useDebounce } from "../../hook/useDebounce";
import { useGetBooksInfoSearchUrl } from "../../api/books/useGetBooksInfoSearchUrl";
import { searchUrlQueryKeys } from "../../constant/key";
import "../../asset/css/Books.css";
import "../../asset/css/Search.css";
import SearchSection from "./SearchSection";

const Search = () => {
  const myRef = useRef<HTMLDivElement>(null);
  const { bookList, categoryList, lastPage, categoryIndex } =
    useGetBooksInfoSearchUrl();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [query, page, sort] = useParseUrlQueryString(searchUrlQueryKeys);

  const debounce = useDebounce();
  const setQuery = useCallback(
    (newQuery: string) => {
      debounce(() => {
        urlSearchParams.set("search", newQuery);
        urlSearchParams.set("page", "1");
        urlSearchParams.delete("category");
        urlSearchParams.delete("sort");
        setUrlSearchParams(urlSearchParams);
      }, 500);
    },
    [urlSearchParams],
  );

  const setPage = useCallback(
    (newPage: number) => {
      urlSearchParams.set("page", `${newPage}`);
      setUrlSearchParams(urlSearchParams);
    },
    [urlSearchParams],
  );

  const setSort = useCallback(
    (newSort: string) => {
      urlSearchParams.set("sort", newSort);
      urlSearchParams.set("page", "1");
      setUrlSearchParams(urlSearchParams);
    },
    [urlSearchParams],
  );

  return (
    <main>
      <SearchBanner setQuery={setQuery} />
      <SearchSection
        query={query}
        categoryIndex={categoryIndex}
        categoryList={categoryList}
        sort={sort || "title"}
        setSort={setSort}
        bookList={bookList}
        lastPage={lastPage}
        page={page}
        setPage={setPage}
        myRef={myRef}
      />
      <section className="wish-book-wraper">
        <WishBook />
      </section>
    </main>
  );
};

export default memo(Search);
