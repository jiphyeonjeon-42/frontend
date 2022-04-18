/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import Arrow from "../../img/arrow_right_black.svg";
import "../../css/RentBookList.css";

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

  return (
    <button
      className="modal-book-list"
      type="button"
      onClick={seletOneOfBook}
      disabled={
        isAlreadySelected(book, selectedBooks) || book.isLenderable === false
          ? "disabled"
          : ""
      }
    >
      <div className="modal-book-list__book">
        <div className="modal-book-list__name">
          <div className="font-18-bold color-54">
            {book.info.title ? book.info.title : `Book${book.id}`}
          </div>
          <div className="modal-book-list__valid font-16 color-red">
            {book.isLenderable
              ? isAlreadySelected(book, selectedBooks)
                ? "이미 선택됨"
                : "대출 가능"
              : "대출 불가능"}
          </div>
        </div>
        <div className="modal-book-list__info">
          <div className="font-16 color-54">
            {book.info.author ? book.info.author : "저자"}
          </div>
          <div className="modal-book-list__separator">|</div>
          <div className="font-16 color-54">
            {book.info.publisher ? book.info.publisher : "출판사"}
          </div>
          <div className="modal-book-list__separator">|</div>
          <div className="font-16 color-54">
            {book.info.category ? book.info.category : "카테고리"}
          </div>
          <div className="modal-book-list__callsign font-16 color-54">
            {`도서코드 : ${book.callSign}`}
          </div>
        </div>
      </div>
      <img className="modal-book-list__arrow" src={Arrow} alt="arrow" />
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
