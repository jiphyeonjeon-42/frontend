import PropTypes from "prop-types";
import Image from "../utils/Image";
import Edit from "../../img/edit.svg";
import { bookStatus } from "../../data/status";
import "../../css/BookManagementBooksListItem.css";

const BookManagementBooksListItem = ({
  checked,
  book,
  removeBookById,
  addBookById,
  openModal,
}) => {
  const changeBook = () => {
    if (checked) removeBookById(book.bookId);
    else addBookById(book.bookId);
  };
  return (
    <div className="book-management__list__item" key={book.bookId}>
      <input
        className="book-management__checkbox"
        type="checkbox"
        checked={checked}
        onChange={changeBook}
      />
      <span className="book-management__list__id font-18">{book.bookId}</span>
      <p className="book-management__list__classification">
        <span className="book-management__list__category font-18">
          {book.category}
        </span>
        <span className="book-management__list__call-sign font-18-bold">
          {book.callSign}
        </span>
      </p>
      <span className="book-management__list__title font-18-bold">
        {book.title}
      </span>
      <span
        className={`book-management__list__status 
        font-18${book.status ? "-bold" : ""}
        ${book.status === 1 || book.status === 2 ? " color-red" : ""}`}
      >
        {book.status === 0
          ? "-"
          : bookStatus.find(item => item.code === book.status)?.string}
      </span>
      <button
        className="book-management__list__information"
        type="button"
        onClick={openModal}
      >
        <Image src={Edit} alt="도서 상세정보 및 수정" />
      </button>
    </div>
  );
};

export default BookManagementBooksListItem;

BookManagementBooksListItem.propTypes = {
  book: PropTypes.shape().isRequired,
  checked: PropTypes.bool.isRequired,
  removeBookById: PropTypes.func.isRequired,
  addBookById: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
