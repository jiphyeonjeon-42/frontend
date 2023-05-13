import Image from "./Image";
import "../../css/BookDetailView.css";
import { ReactNode } from "react";
import { Book } from "../../types";

type Props = {
  book: Book;
  bookInfoDetailUI: ReactNode;
  bookDetailUI?: ReactNode;
  bottomUI: ReactNode;
};

const BookDetailView = ({
  book,
  bookInfoDetailUI,
  bookDetailUI,
  bottomUI,
}: Props) => {
  return (
    <div className="book__detail__wrarpper">
      <p className="book__detail__title">도서정보</p>
      <div className="book__detail__book-info">
        <Image
          className="book__detail__book-cover"
          src={book.image}
          alt={book.title}
        />
        <div className="book__detail__details">{bookInfoDetailUI}</div>
      </div>
      {bookDetailUI ? (
        <div className="book__detail__book">
          <p>도서관리정보</p>
          <div className="book__detail__details">{bookDetailUI}</div>
        </div>
      ) : null}
      {bottomUI}
    </div>
  );
};

export default BookDetailView;
