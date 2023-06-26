import React, { useState } from "react";
import { useGetBooksInfoSearch } from "../../api/books/useGetBooksInfoSearch";
import Modal from "../utils/Modal";
import SearchModal from "../utils/SearchModal";
import "../../asset/css/SuperTagSearchBookModal.css";
import { Book } from "../../type";

type Props = {
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
};

const SuperTagSearchBookModal = ({ setBook }: Props) => {
  const { bookList, lastPage, page, setPage, setQuery } = useGetBooksInfoSearch(
    { limit: 3 },
  );

  return (
    <>
      <Modal isOpen={true} onCloseModal={() => {}}>
        <SearchModal
          className="super-tag-book__search__wrapper"
          titleText="대상 도서"
          searchBarPlaceholder="태그를 관리할 도서를 선택해주세요"
          setQuery={setQuery}
          page={page}
          setPage={setPage}
          lastPage={lastPage}
        >
          <div className="super-tag-book__wrapper">
            {bookList.map(book => (
              <button
                className="super-tag-book-item__wrapper"
                onClick={() => setBook(book)}
                key={book.id || book.bookId}
              >
                <div className="super-tag-book-item__title">{book.title}</div>
                <div className="super-tag-book-item__details">
                  <span>{book.author}</span>
                  <span>{book.publisher}</span>
                  <span>{book.category}</span>
                </div>
                <div className="super-tag-book-item__call-sign">
                  {book.callSign}
                </div>
              </button>
            ))}
          </div>
        </SearchModal>
      </Modal>
    </>
  );
};

export default SuperTagSearchBookModal;
