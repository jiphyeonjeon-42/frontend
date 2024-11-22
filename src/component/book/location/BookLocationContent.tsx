import BookShelf from "~/component/book/location/BookShelf";
import BookLocationMap from "~/component/book/location/BookLocationMap";
import { useBookContext } from "~/component/book/location/BookContext";
import { findBookShelfLocation } from "~/util/bookShelfLocation";

const BookLocationContent = () => {
  const { callSignFirstChar } = useBookContext();
  const bookLocationInfo = findBookShelfLocation(callSignFirstChar ?? "");

  return (
    <>
      {/* <div className="book-location__shelves">
        {Array.from({ length: 5 }, (_, i) => (
          <BookShelf key={i} index={i} highlight={i === bookLocationInfo} />
        ))}
      </div> */}
      <div className="book-location__shelves">
        <BookShelf
          shelfIndex={bookLocationInfo}
          callSignChar={callSignFirstChar ?? ""}
        />
      </div>
      <BookLocationMap highlightIndex={bookLocationInfo} />
    </>
  );
};

export default BookLocationContent;
