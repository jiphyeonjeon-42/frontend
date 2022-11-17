import React, { useState } from "react";
import PropTypes from "prop-types";
import BookManagementBooksListItem from "./BookManagementBooksListItem";
import BookManagementModalDetail from "./BookManagementModalDetail";
import useModal from "../../hook/useModal";

const BookManagementBooksList = ({
  booksList,
  printList,
  addBookById,
  addAllBooks,
  removeBookById,
  removeAllBooks,
}) => {
  const [selectedBook, setSelectedBook] = useState({});
  const { Modal, setOpen, setClose } = useModal();

  const includesArrayById = (array, id) => {
    const found = array.findIndex(item => item.bookId === id);
    return found !== -1;
  };

  const allChecked =
    printList.length > 0 &&
    booksList.every(book => includesArrayById(printList, book.bookId));

  const changeAllBooks = () => {
    if (allChecked) {
      removeAllBooks();
    } else {
      addAllBooks();
    }
  };

  return (
    <>
      <Modal>
        <BookManagementModalDetail book={selectedBook} closeModal={setClose} />
      </Modal>
      <div className="book-management__list">
        <div className="book-management__list__box-title">
          <input
            className="book-management__checkbox"
            type="checkbox"
            checked={allChecked}
            onChange={changeAllBooks}
          />
          <span className="book-management__list__id">ID</span>
          <span className="book-management__list__call-sign">청구기호</span>
          <span className="book-management__list__category">카테고리</span>
          <span className="book-management__list__title">제목</span>
          <span className="book-management__list__status">도서상태</span>
          <span className="book-management__">상세정보</span>
        </div>
        <div className="book-management__list__box">
          {booksList.map(book => {
            const openModal = () => {
              setSelectedBook(book);
              setOpen();
            };
            return (
              <BookManagementBooksListItem
                key={book.bookId}
                book={book}
                removeBookById={removeBookById}
                addBookById={addBookById}
                checked={includesArrayById(printList, book.bookId)}
                openModal={openModal}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BookManagementBooksList;

BookManagementBooksList.propTypes = {
  booksList: PropTypes.arrayOf(PropTypes.object).isRequired,
  printList: PropTypes.arrayOf(PropTypes.object).isRequired,
  addBookById: PropTypes.func.isRequired,
  removeBookById: PropTypes.func.isRequired,
  addAllBooks: PropTypes.func.isRequired,
  removeAllBooks: PropTypes.func.isRequired,
};
