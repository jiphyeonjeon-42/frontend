import React from "react";
import PropTypes from "prop-types";
import SearchBar from "../utils/SearchBar";
import Pagination from "../utils/Pagination";
import BookList from "./RentModalBookList";
import RentBookWithBarcodeReader from "./RentBookWithBarcodeReader";
import "../../css/RentModalBook.css";
import useGetBooksSearch from "../../api/books/useGetBooksSearch";

const RentModalBook = ({ selectedBooks, setSelectedBooks, closeModal }) => {
  const { bookList, lastPage, page, setPage, setQuery, Dialog } =
    useGetBooksSearch();

  return (
    <section className="rent__modal-book">
      <div className="rent__modal-book__title">
        <div className="rent__modal-book__title-text font-28-bold color-54">
          도서 정보
        </div>
        <Dialog />
        <SearchBar
          setQuery={setQuery}
          width="long"
          placeHolder="도서의 이름을 입력해주세요."
        />
      </div>
      <RentBookWithBarcodeReader
        setSelectedBooks={setSelectedBooks}
        selectedBooks={selectedBooks}
        closeModal={closeModal}
      />
      <div className="rent__modal-book__total-list">
        {bookList.map(book => (
          <BookList
            key={book.id}
            book={book}
            setSelectedBooks={setSelectedBooks}
            selectedBooks={selectedBooks}
            closeModal={closeModal}
          />
        ))}
      </div>
      <div className="rent__modal-user__pagination">
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </div>
    </section>
  );
};

export default RentModalBook;

RentModalBook.propTypes = {
  setSelectedBooks: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedBooks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
