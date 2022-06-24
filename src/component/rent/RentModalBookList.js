/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import Arrow from "../../img/arrow_right_black.svg";
import "../../css/RentModalBookList.css";

const RentModalBookList = ({
  book,
  setSelectedBooks,
  selectedBooks,
  closeMidModal,
}) => {
  const seletOneOfBook = () => {
    if (setSelectedBooks) {
      selectedBooks.push(book);
      setSelectedBooks(selectedBooks);
      closeMidModal(0);
    }
  };

  const isAlreadySelected = (userBook, alreadySelect) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < alreadySelect.length; i++) {
      if (userBook.id === alreadySelect[i].id) {
        return true;
      }
    }
    return false;
  };

  const isDisabled = () => {
    console.log(book);
    return book.isLendable === 0 ? "disabled" : "";
  };

  return (
    <button
      className={`rent__modal-book-list ${isDisabled()}`}
      type="button"
      onClick={seletOneOfBook}
      disabled={isDisabled()}
    >
      <div className="rent__modal-book-list__name">
        <span className="rent__modal-book-list__title font-18-bold color-54">
          {book.title ? book.title : `Book${book.id}`}
        </span>
        <span
          className={`rent__modal-book-list__valid font-16 color-red ${isDisabled()}`}
        >
          {book.isLendable
            ? isAlreadySelected(book, selectedBooks)
              ? "이미 선택됨"
              : "대출 가능"
            : "대출 불가능"}
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
      <img className="rent__modal-book-list__arrow" src={Arrow} alt="arrow" />
    </button>
  );
};

export default RentModalBookList;

RentModalBookList.propTypes = {
  setSelectedBooks: PropTypes.func.isRequired,
  closeMidModal: PropTypes.func.isRequired,
  selectedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  book: PropTypes.object.isRequired,
};
