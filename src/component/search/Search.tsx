import { useRef, useCallback, useEffect, memo } from "react";
import { useSearchParams } from "react-router-dom";
import Sort from "./Sort";
import BookInfo from "./BookInfo";
import WishBook from "./WishBook";
import SearchBanner from "./SearchBanner";
import CategoryFilter from "./CategoryFilter";
import SubTitle from "../utils/SubTitle";
import Pagination from "../utils/Pagination";
import { useParseUrlQueryString } from "../../hook/useParseUrlQueryString";
import { useDebounce } from "../../hook/useDebounce";
import { useGetBooksInfoSearchUrl } from "../../api/books/useGetBooksInfoSearchUrl";
import { searchUrlQueryKeys } from "../../constant/key";
import "../../asset/css/Books.css";
import "../../asset/css/Search.css";
import { Profiler } from 'react';

const onRender = (
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  console.table([
    { 항목: '컴포넌트', 값: id },
    { 항목: '실제 렌더링 시간', 값: `${actualDuration}ms` },
    { 항목: '기본 렌더링 시간', 값: `${baseDuration}ms` }
  ]);
};

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
    <Profiler id="Search" onRender={onRender}>
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
            selectedCategory={categoryIndex}
            categoryList={categoryList}
          />
          <div className="search-sort">
            <Sort sort={sort || "title"} setSort={setSort} />
          </div>
          <section className="books">
            {bookList.map(items => (
              <BookInfo
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
      </main>
    </Profiler>
  );
};

export default memo(Search);
