import { MouseEvent, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookPreviewType } from "~/component/utils/BookSearchPreview";
import Image from "~/component/utils/Image";
import PaginationCircle from "~/component/utils/PaginationCircle";
import "~/asset/css/BookSearchPreview.css";

type Props = {
  keyword: string;
  books: BookPreviewType[];
  bookUI: (props: { book: BookPreviewType }) => JSX.Element;
};

const PAGE_SIZE = 3;
const BookSearchPreviewList = ({ keyword, books, bookUI }: Props) => {
  const [page, setPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slicedBooks = books.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const pageCount = Math.floor(books.length / PAGE_SIZE);
  const navigate = useNavigate();

  return (
    <>
      <div className="search-preview__left">
        <div className="search-preview__list">
          {slicedBooks.map((book, index) => {
            const isSelected = index === selectedIndex;

            return (
              <button
                type="button"
                key={book.id}
                value={book.id}
                className={`search-preview__book ${
                  isSelected ? "selected" : ""
                }`}
                onClick={e => {
                  e.preventDefault();
                  navigate(`/info/${book.id}`);
                }}
                onMouseOver={() => setSelectedIndex(index)}
              >
                {bookUI({ book })}
              </button>
            );
          })}
        </div>
        <Image
        className="search-preview__image"
          width={120}
          height={180}
          src={slicedBooks[selectedIndex]?.image}
          alt={slicedBooks[selectedIndex]?.title}
        />
      </div>
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
        {`
           
          검색 결과 더보기`}
      </Link>
    </>
  );
};

export default BookSearchPreviewList;
