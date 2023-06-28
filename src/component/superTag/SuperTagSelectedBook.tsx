import React from "react";
import BookDetailView from "../utils/BookDetailView";
import SpanWithLabel from "../utils/SpanWithLabel";
import "../../asset/css/SuperTagSelectedBook.css";
import Button from "../utils/Button";
import { Book } from "../../type";
import { dateFormat } from "../../util/date";

type SuperTagSelectedBookProps = {
  book: Book | null;
  resetBook: () => void;
};

const SuperTagSelectedBook = ({
  book,
  resetBook,
}: SuperTagSelectedBookProps) => {
  if (book === null)
    return (
      <div className="super-tag__selected-book__wrapper">
        <BookDetailView
          book={{ title: "", image: "" }}
          bookInfoDetailUI={
            <div>태그를 관리할 도서가 선택되지 않았습니다. </div>
          }
          bottomUI={<Button value="도서 선택하기" onClick={resetBook} />}
        />
      </div>
    );

  return (
    <>
      <div className="super-tag__selected-book__wrapper">
        <BookDetailView
          book={book}
          bookInfoDetailUI={
            <>
              <SpanWithLabel labelText="ID" value={book.id} />
              <SpanWithLabel labelText="제목" value={book.title} />
              <SpanWithLabel labelText="저자" value={book.author} />
              <SpanWithLabel labelText="출판사" value={book.publisher} />
              {book.publishedAt ? (
                <SpanWithLabel
                  labelText="출판일자"
                  value={dateFormat(book.publishedAt)}
                />
              ) : null}
              <SpanWithLabel labelText="카테고리" value={book.category} />
            </>
          }
          bottomUI={
            <Button
              className="super-tag__selected-book__reset-button"
              value="다른 도서 선택하기"
              onClick={resetBook}
            />
          }
        />
      </div>
    </>
  );
};

export default SuperTagSelectedBook;
