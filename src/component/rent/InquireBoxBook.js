/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSetRecoilState } from "recoil";
import { isModalOpen } from "../Modal";
import DeleteButton from "../../img/x_button.svg";
import "../../css/InquireBoxBook.css";

const BOOK_MODAL = 2;

const InquireBoxBook = ({ shape, book, selectBooks, setSelectBooks }) => {
  const setUserModal = useSetRecoilState(isModalOpen);

  const openModal = () => {
    setUserModal(BOOK_MODAL);
  };

  useEffect(() => {
    console.log("selectBooks", selectBooks);
  }, [selectBooks]);

  const deleteBook = () => {
    if (setSelectBooks && book) {
      console.log(selectBooks.indexOf(book));
      setSelectBooks(selectBooks.splice(1 - selectBooks.indexOf(book), 1));
    }
  };

  return (
    <div className={`inquire-box-book ${shape}`}>
      {book ? (
        <div className="inquire-box-book__id-undo">
          <div className="inquire-box-book__id font-28-bold color-54">
            {book.id}
          </div>
          <button
            className="inquire-box-book__undo-button color-a4"
            type="button"
            onClick={deleteBook}
          >
            <img src={DeleteButton} alt="delete" />
          </button>
        </div>
      ) : (
        <button
          className={`inquire-box-book__add-button add-${shape} color-a4`}
          type="button"
          onClick={openModal}
        >
          +
        </button>
      )}
    </div>
  );
};

export default InquireBoxBook;

InquireBoxBook.propTypes = {
  setSelectBooks: PropTypes.func.isRequired,
};
