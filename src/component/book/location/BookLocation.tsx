import { BookInfo } from "../../../type";

interface BookLocationProps {
  bookDetailInfo: BookInfo;
}

const BookLocation = ({ bookDetailInfo }: BookLocationProps) => {
  // TODO: scroll bar (x축 아래)
  // TODO: 책 위치에 맞게 main view 보여주기
  const { books } = bookDetailInfo;

  if (books === undefined) {
    return null;
  }

  return (
    <div className="book-location__container">
      <div className="book-detail__location">
        <div className="shelf"></div>
        <div className="shelf"></div>
        <div className="shelf"></div>
        <div className="shelf"></div>
      </div>
      <div className="book-detail__mini-map">
        <div className="saseo">사서</div>
        <div className="ADFI">A</div>
        <div className="BEGNJ">B</div>
        <div className="L">L</div>
        <div className="HKO">H</div>
        <div className="etc">etc</div>
      </div>
    </div>
  );
};

export default BookLocation;
