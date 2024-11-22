import BookShelf from "~/component/book/location/BookShelf";
import BookLocationMap from "~/component/book/location/BookLocationMap";
import { useBookContext } from "~/component/book/location/BookContext";
import { findBookShelfIndex } from "~/util/bookShelfLocation";

const BookLocationContent = () => {
  const { callSignFirstChar } = useBookContext();
  const bookShelfIndex = findBookShelfIndex(callSignFirstChar);

  return (
    <>
      {/* <div className="book-location__shelves">
        {Array.from({ length: 5 }, (_, i) => (
          <BookShelf key={i} index={i} highlight={i === bookLocationInfo} />
        ))}
      </div> */}
      <div className="book-location__shelves">
        <BookShelf shelfIndex={bookShelfIndex} />
      </div>
      <BookLocationMap highlightIndex={bookShelfIndex} />
    </>
  );
};

export default BookLocationContent;
