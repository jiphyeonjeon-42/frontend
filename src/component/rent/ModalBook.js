import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import ModalSearchBar from "../utils/ModalSearchBar";
import { useModalSearchInput } from "../../atom/useSearchInput";
import ModalPagination from "./ModalPagination";
import BookList from "./BookList";
import "../../css/ModalBook.css";

// eslint-disable-next-line react/prop-types
const ModalBook = ({ selectBooks, setSelectBooks, setUserModal }) => {
  const [bookSearchWord, setBookSearchWord] =
    useRecoilState(useModalSearchInput);
  const [bookSearchPage, setBookSearchPage] = useState(1);
  const [bookSearchPageRange, setBookSearchPageRange] = useState(0);
  const [lastBookSearchPage, setLastBookSearchPage] = useState(1);
  const [bookList, setBookList] = useState([]);

  const handleBookSearchSumbit = event => {
    event.preventDefault();
    const searchForm = document.querySelector(".modal-search-form");
    const searchInputValue = searchForm.querySelector(
      ".modal-search__input",
    ).value;
    setBookSearchWord(searchInputValue);
    setBookSearchPage(1);
    setBookSearchPageRange(0);
  };

  const fetchBookData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/books/search`, {
        params: {
          query: bookSearchWord,
          page: bookSearchPage,
          limit: 5,
        },
      })
      .then(res => {
        setBookList(res.data.items);
        setLastBookSearchPage(res.data.meta.totalPages);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(fetchBookData, [bookSearchWord, bookSearchPage]);

  useEffect(() => {
    const searchForm = document.querySelector(".modal-search-form");
    searchForm.addEventListener("submit", handleBookSearchSumbit);
    return () =>
      searchForm.removeEventListener("submit", handleBookSearchSumbit);
  }, [handleBookSearchSumbit]);

  useEffect(() => {
    setBookSearchWord("");
  }, []);
  return (
    <section className="modal-book">
      <div className="modal-book__search-bar">
        <div className="modal-book__text font-28-bold color-54">도서 정보</div>
        <ModalSearchBar placeHolder="도서의 이름을 입력해주세요." />
      </div>
      {bookList.map((book, index) => (
        <BookList
          key={book.id}
          book={book}
          setSelectBooks={setSelectBooks}
          selectBooks={selectBooks}
          setUserModal={setUserModal}
          isLenderable={(index * 2 + 1) % 2}
          name={`Name${book.id}`}
        />
      ))}
      <div className="modal-user__pagination">
        <ModalPagination
          userPage={bookSearchPage}
          setUserPage={setBookSearchPage}
          pageRange={bookSearchPageRange}
          setPageRange={setBookSearchPageRange}
          lastPage={lastBookSearchPage}
        />
      </div>
    </section>
  );
};

export default ModalBook;
