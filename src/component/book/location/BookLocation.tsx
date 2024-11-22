import { BookInfo } from "../../../type";
import "~/asset/css/BookLocation.css";
import { BookProvider } from "~/component/book/location/BookContext";
import BookLocationContent from "~/component/book/location/BookLocationContent";
import { memo } from "react";

type BookLocationProps = {
  bookDetailInfo: BookInfo;
};

const BookLocation = memo(({ bookDetailInfo }: BookLocationProps) => {
  const { books } = bookDetailInfo;

  if (books === undefined) {
    return null;
  }

  const callSignFirstChar = books[0].callSign[0].at(0) ?? "";
  return (
    <BookProvider callSignFirstChar={callSignFirstChar}>
      <div className="book-location__container">
        <BookLocationContent />
      </div>
    </BookProvider>
  );
});

export default BookLocation;
