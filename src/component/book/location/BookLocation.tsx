import { BookInfo } from "../../../type";
import "~/asset/css/BookLocation.css";
import BookShelf from "~/component/book/location/BookShelf";

type BookLocationProps = {
  bookDetailInfo: BookInfo;
};

const findBookLocation = (callSign: string) => {
  const lowerCaseRange = Array.from(
    { length: "z".charCodeAt(0) - "b".charCodeAt(0) + 1 },
    (_, i) => String.fromCharCode("b".charCodeAt(0) + i),
  );
  const callSignAtShelf = [
    ["A", "D", "F", "I"],
    ["B", "E", "G", "N", "J"],
    ["K", "H", "O"],
    lowerCaseRange,
    ["C", "L", "M", "a"],
  ];
  const shelf = callSignAtShelf.findIndex(shelf => shelf.includes(callSign));
  return shelf;
};

const BookLocation = ({ bookDetailInfo }: BookLocationProps) => {
  // TODO: scroll bar (x축 아래)
  // TODO: 책 위치에 맞게 main view 보여주기
  const { books } = bookDetailInfo;

  if (books === undefined) {
    return null;
  }

  const bookLocationInfo = findBookLocation(books[0].callSign.at(0) ?? "");
  return (
    <div className="book-location__container">
      <div className="book-location__shelves">
        {Array.from({ length: 5 }, (_, i) => (
          <BookShelf key={i} index={i} highlight={i === bookLocationInfo} />
        ))}
      </div>
      {/* <div className="book-location__map">
        <div className="saseo">사서</div>
        <div className="ADFI">A</div>
        <div className="BEGNJ">B</div>
        <div className="L">L</div>
        <div className="HKO">H</div>
        <div className="etc">etc</div>
      </div> */}
    </div>
  );
};

export default BookLocation;
