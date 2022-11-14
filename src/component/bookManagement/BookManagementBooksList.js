import React from "react";
import PropTypes from "prop-types";

const BookManagementBooksList = ({
  booksList,
  printList,
  addBookById,
  addAllBooks,
  removeBookById,
  removeAllBooks,
}) => {
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
          const checked = includesArrayById(printList, book.bookId);
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
              <span className="book-management__list__id font-18">
                {book.bookId}
              </span>
              <span className="book-management__list__call-sign font-18-bold">
                {book.callSign}
              </span>
              <span className="book-management__list__category font-18">
                {book.category}
              </span>
              <span className="book-management__list__title font-18-bold">
                {book.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
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
