import { BookInfo } from "../../../type";
import "~/asset/css/BookLocation.css";
import "~/asset/css/BookDetail.css";
import { memo } from "react";
import { findBookShelfIndex } from "~/util/bookShelfLocation";
import BookLocationMap from "~/component/book/location/BookLocationMap";

type BookLocationProps = {
  bookDetailInfo: BookInfo;
};

const BookLocation = memo(({ bookDetailInfo }: BookLocationProps) => {
  const { books } = bookDetailInfo;

  if (books === undefined) {
    return null;
  }

  const callSignFirstChar = books[0].callSign[0].at(0) ?? "";
  const bookShelfIndex = findBookShelfIndex(callSignFirstChar);
  return (
    <div className="book-detail__photo-location">
      <BookLocationMap highlightIndex={bookShelfIndex} />
    </div>
  );
});

export default BookLocation;
