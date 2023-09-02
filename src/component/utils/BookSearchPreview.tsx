import { useState } from "react";
import { Link } from "react-router-dom";
import { type BookPreviewType } from "~/type";
import BookSearchPreviewList from "~/component/utils/BookSearchPreviewList";
import Paginations from "~/component/utils/Paginations";
import EmphasisInString from "./EmphasisInString";
import "~/asset/css/BookSearchPreview.css";
import Loader from "./Loader";

type Props = {
  keyword: string;
  books: BookPreviewType[];
  totalCount: number;
  isLoading: boolean;
};

const PAGE_SIZE = 3;

const BookSearchPreview = ({
  keyword,
  books,
  totalCount,
  isLoading,
}: Props) => {
  const [page, setPage] = useState(1);

  const slicedBooks = books.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.floor(books.length / PAGE_SIZE);

  return (
    <div className="search-preview__wrapper">
      {isLoading && <Loader className="search-preview__loader" hasBackdrop />}
      <BookSearchPreviewList keyword={keyword} books={slicedBooks} />
      <Paginations.Root
        className="search-preview__pagination"
        page={page}
        setPage={setPage}
        lastPage={pageCount}
      >
        <Paginations.Prev />
        <span className="search-preview__page">{isLoading ? 0 : page}</span>
        <span className="search-preview__last-page">{pageCount}</span>
        <Paginations.Next />
      </Paginations.Root>
      <Link
        className="search-preview__more"
        to={`/search?search=${encodeURI(keyword)}`}
      >
        {!isLoading && (
          <EmphasisInString
            wholeString={`전체 ${totalCount} 건 검색 결과 더보기`}
            emphasis={`${totalCount}`}
          />
        )}
      </Link>
    </div>
  );
};

export default BookSearchPreview;
