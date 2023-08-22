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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === "ArrowUp") {
        setSelectedIndex(prev => (prev - 1 + PAGE_SIZE) % PAGE_SIZE);
      } else if (e.key === "ArrowDown") {
        setSelectedIndex(prev => (prev + 1) % PAGE_SIZE);
      } else if (e.key === "ArrowLeft") {
        setPage(prev => Math.max(prev - 1, 0));
      } else if (e.key === "ArrowRight") {
        setPage(prev => Math.min(prev + 1, pageCount - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, pageCount]);

  return (
    <>
      <div className="search-preview__left">
        <div className="search-preview__list">
          {slicedBooks.map((book, index) => {
            const isSelected = index === selectedIndex;
            const setSelectedOrNavigate = (
              e: MouseEvent<HTMLButtonElement>,
            ) => {
              e.stopPropagation();
              if (isSelected) navigate(`/info/${book.id}`);
              else setSelectedIndex(index);
            };

            return (
              <button
                type="button"
                key={book.id}
                value={book.id}
                className={`search-preview__book ${
                  isSelected ? "selected" : ""
                }`}
                onClick={setSelectedOrNavigate}
              >
                {bookUI({ book })}
              </button>
            );
          })}
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
      </div>
      <Image
        width={180}
        height={270}
        src={slicedBooks[selectedIndex]?.image}
        alt={slicedBooks[selectedIndex]?.title}
      />
    </>
  );
};

export default BookSearchPreviewList;
