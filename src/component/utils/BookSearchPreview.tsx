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
  const pageCount = Math.ceil(books.length / PAGE_SIZE);
  const disabled = !books.length;

  return (
    <div className="search-preview__wrapper">
      {isLoading && <Loader className="search-preview__loader" hasBackdrop />}
      <BookSearchPreviewList
        keyword={keyword}
        books={slicedBooks}
        isLoading={isLoading}
      />
      <Paginations.Root
        className="search-preview__pagination"
        page={page}
        setPage={setPage}
        lastPage={pageCount}
      >
        <Paginations.Prev disabled={disabled} />
        <span className="search-preview__page">{disabled ? 0 : page}</span>
        <span className="search-preview__last-page">
          {disabled ? 0 : pageCount}
        </span>
        <Paginations.Next disabled={disabled} />
      </Paginations.Root>
      <Link
        className="search-preview__more"
        to={`/search?search=${encodeURIComponent(keyword)}`}
      >
        {!isLoading && totalCount ? (
          <EmphasisInString
            wholeString={`전체 ${totalCount} 건 검색 결과 더보기`}
            emphasis={`${totalCount}`}
          />
        ) : null}
      </Link>
    </div>
  );
};

export default BookSearchPreview;
