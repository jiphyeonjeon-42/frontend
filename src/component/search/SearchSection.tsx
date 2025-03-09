import { memo } from "react";
import Sort from "./Sort";
import BookInfo from "./BookInfo";
import CategoryFilter from "./CategoryFilter";
import SubTitle from "../utils/SubTitle";
import Pagination from "../utils/Pagination";

interface SearchSectionProps {
  query: string | null;
  categoryIndex: number;
  categoryList: { name: string; count: number }[];
  sort: string;
  setSort: (newSort: string) => void;
  bookList: any[];
  lastPage: number;
  page: string;
  setPage: (newPage: number) => void;
  myRef: React.RefObject<HTMLDivElement>;
}

const SearchSection = ({
  query,
  categoryIndex,
  categoryList,
  sort,
  setSort,
  bookList,
  lastPage,
  page,
  setPage,
  myRef,
}: SearchSectionProps) => {
  return (
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
  );
};

export default memo(SearchSection);
