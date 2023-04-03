import { useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Sort from "./Sort";
import BookInfo from "./BookInfo";
import WishBook from "./WishBook";
import SearchBanner from "./SearchBanner";
import CategoryFilter from "./CategoryFilter";
import SubTitle from "../utils/SubTitle";
import Pagination from "../utils/Pagination";
import useParseUrlQueryString from "../../hook/useParseUrlQueryString";
import useDebounce from "../../hook/useDebounce";
import useGetBooksInfoSearchUrl from "../../api/books/useGetBooksInfoSearchUrl";
import { searchUrlQueryKeys } from "../../data/key";
import "../../css/Books.css";
import "../../css/Search.css";

const Search = () => {
  const myRef = useRef(null);
  const { Dialog, bookList, categoryList, lastPage, categoryIndex } =
    useGetBooksInfoSearchUrl();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [query, page, sort] = useParseUrlQueryString(searchUrlQueryKeys);

  const debounce = useDebounce();
  const setQuery = useCallback(
    newQuery => {
      debounce(() => {
        urlSearchParams.set("search", newQuery);
        urlSearchParams.set("page", 1);
        urlSearchParams.delete("category");
        urlSearchParams.delete("sort");
        setUrlSearchParams(urlSearchParams);
      }, 500);
    },
    [urlSearchParams],
  );

  const setPage = useCallback(
    newPage => {
      urlSearchParams.set("page", newPage);
      setUrlSearchParams(urlSearchParams);
    },
    [urlSearchParams],
  );

  const setSort = useCallback(
    newSort => {
      urlSearchParams.set("sort", newSort);
      urlSearchParams.set("page", 1);
      setUrlSearchParams(urlSearchParams);
    },
    [urlSearchParams],
  );

  return (
    <main>
      <SearchBanner setQuery={setQuery} />
      <section className="search-section">
        <div className="search-subtitle" ref={myRef}>
          <SubTitle
            subTitle={
              query === null || query === ""
                ? "전체 도서 목록"
                : `'${query}' 도서 검색 결과`
            }
            alignItems="start"
            description=""
          />
        </div>
        <CategoryFilter
          userWord={query || ""}
          userSort={sort || "title"}
          userCate={parseInt(categoryIndex, 10) || 0}
          entireCate={categoryList}
        />
        <div className="search-sort">
          <Sort sort={sort || "title"} setSort={setSort} />
        </div>
        <section className="books">
          {bookList.map(items => (
            <BookInfo
              className="bookinfo"
              key={items.id}
              id={items.id}
              isbn={items.isbn}
              title={items.title}
              author={items.author}
              publisher={items.publisher}
              image={items.image}
              publishedAt={items.publishedAt}
              category={items.category}
              bread="검색"
            />
          ))}
        </section>
        <Pagination
          lastPage={lastPage}
          page={parseInt(page, 10) || 1}
          setPage={setPage}
          isReplaceUrl
          scrollRef={myRef}
        />
      </section>
      <section className="wish-book-wraper">
        <WishBook />
      </section>
      <Dialog />
    </main>
  );
};

export default Search;
