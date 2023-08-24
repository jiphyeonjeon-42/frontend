import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetSearchKeywordsAutocomplete } from "~/api/searchKeywords/useGetSearchKeywordsAutocomplete";
import { type BookInfo } from "~/type";
import BookSearchPreviewList from "~/component/utils/BookSearchPreviewList";
import PaginationCircle from "~/component/utils/PaginationCircle";
import "~/asset/css/BookSearchPreview.css";

export type BookPreviewType = Omit<BookInfo, "category">;

type Props = {
  keyword: string;
};

const PAGE_SIZE = 3;

const BookSearchPreview = ({ keyword }: Props) => {
  const { books } = useGetSearchKeywordsAutocomplete();
  const [page, setPage] = useState(0);

  const slicedBooks = books.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const pageCount = Math.floor(books.length / PAGE_SIZE);

  return (
    <div className="search-preview__wrapper">
      <BookSearchPreviewList keyword={keyword} books={slicedBooks} />
      <PaginationCircle
        className="search-preview__pagination"
        currentPage={page}
        setCurrentPage={setPage}
        length={pageCount}
      />
      <Link
        className="search-preview__more"
        to={`/search?search=${encodeURI(keyword)}`}
      >
        {`검색 결과 더보기`}
      </Link>
    </div>
  );
};

export default BookSearchPreview;
