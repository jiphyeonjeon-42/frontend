import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetSearchKeywordsAutocomplete } from "~/api/searchKeywords/useGetSearchKeywordsAutocomplete";
import { type BookInfo } from "~/type";
import BookSearchPreviewList from "~/component/utils/BookSearchPreviewList";
import Paginations from "~/component/utils/Paginations";
import EmphasisInString from "./EmphasisInString";
import "~/asset/css/BookSearchPreview.css";

export type BookPreviewType = Omit<BookInfo, "category">;

type Props = {
  keyword: string;
};

const PAGE_SIZE = 3;

const BookSearchPreview = ({ keyword }: Props) => {
  const { books, totalCount } = useGetSearchKeywordsAutocomplete();
  const [page, setPage] = useState(1);

  const slicedBooks = books.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.floor(books.length / PAGE_SIZE);

  return (
    <div className="search-preview__wrapper">
      <BookSearchPreviewList keyword={keyword} books={slicedBooks} />
      <Paginations.Root
        className="search-preview__pagination"
        page={page}
        setPage={setPage}
        lastPage={pageCount}
      >
        <Paginations.Prev />
        <span className="search-preview__page">{page}</span>
        <span className="search-preview__last-page">{pageCount}</span>
        <Paginations.Next />
      </Paginations.Root>
      <Link
        className="search-preview__more"
        to={`/search?search=${encodeURI(keyword)}`}
      >
        <EmphasisInString
          wholeString={`전체 ${totalCount} 건 검색 결과 더보기`}
          emphasis={`${totalCount}`}
        />
      </Link>
    </div>
  );
};

export default BookSearchPreview;
