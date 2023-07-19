import { Book } from "../../type";
import Image from "../utils/Image";
import Arrow from "../../asset/img/arrow_right_black.svg";
import "../../asset/css/RentModalBookList.css";

type Props = {
  setSelectedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  closeModal: () => void;
  selectedBooks: Book[];
  book: Book;
};

const RentModalBookList = ({
  book,
  setSelectedBooks,
  selectedBooks,
  closeModal,
}: Props) => {
  const seletOneOfBook = () => {
    setSelectedBooks([...selectedBooks, book]);
    closeModal();
  };

  const isAlreadySelected = (userBook: Book, alreadySelect: Book[]) => {
    for (let i = 0; i < alreadySelect.length; i += 1) {
      if (userBook.bookId === alreadySelect[i].bookId) {
        return true;
      }
    }
    return false;
  };

  const isDisabled = () => {
    if (book.isLendable === 0) return "disabled";
    if (isAlreadySelected(book, selectedBooks)) return "selected";
    return "available";
  };

  return (
    <button
      className={`rent__modal-book-list ${isDisabled()}`}
      type="button"
      onClick={seletOneOfBook}
      disabled={isDisabled() !== "available"}
    >
      <div className="rent__modal-book-list__name">
        <span className="rent__modal-book-list__title color-54">
          {book.title ? book.title : `Book ${book.bookId}`}
        </span>
        <span
          className={`rent__modal-book-list__valid font-16 ${isDisabled()}`}
        >
          {book.isLendable
            ? isAlreadySelected(book, selectedBooks)
              ? "이미 선택됨"
              : "대출 가능"
            : "대출 불가"}
        </span>
      </div>
      <div className="rent__modal-book-list__info">
        <span className="font-16 color-54">
          {book.author ? book.author : "저자"}
        </span>
        <span className="rent__modal-book-list__separator">|</span>
        <span className="font-16 color-54">
          {book.publisher ? book.publisher : "출판사"}
        </span>
        <span className="rent__modal-book-list__separator">|</span>
        <span className="font-16 color-54">
          {book.category ? book.category : "카테고리"}
        </span>
      </div>
      <span className="rent__modal-book-list__callsign font-16 color-54">
        {book.callSign ? book.callSign : ""}
      </span>
      <Image className="rent__modal-book-list__arrow" src={Arrow} alt="arrow" />
    </button>
  );
};

export default RentModalBookList;
