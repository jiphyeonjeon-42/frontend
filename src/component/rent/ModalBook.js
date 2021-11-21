import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import axios from "axios";
import AdminSearchBar from "../utils/AdminSearchBar";
import { useAdminSearchInput } from "../../atom/useSearchInput";
import AdminPagination from "../utils/AdminPagination";
import BookList from "./BookList";
import "../../css/ModalBook.css";

const ModalBook = ({ selectBooks, setSelectBooks, setUserModal }) => {
  const [bookSearchWord, setBookSearchWord] =
    useRecoilState(useAdminSearchInput);
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
          limit: 3,
        },
      })
      .then(res => {
        setBookList(res.data.items);
        setLastBookSearchPage(
          res.data.meta.totalPages > 0 ? res.data.meta.totalPages : 1,
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(fetchBookData, [bookSearchWord, bookSearchPage]);

  useEffect(() => {
    setBookSearchPageRange(0);
    setBookSearchPage(1);
  }, [bookSearchWord]);

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
        <AdminSearchBar placeHolder="도서의 이름을 입력해주세요." />
      </div>
      {bookList.map(book => (
        <BookList
          key={book.id}
          book={book}
          setSelectBooks={setSelectBooks}
          selectBooks={selectBooks}
          setUserModal={setUserModal}
        />
      ))}
      <div className="modal-user__pagination">
        <AdminPagination
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

ModalBook.propTypes = {
  setSelectBooks: PropTypes.func.isRequired,
  setUserModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectBooks: PropTypes.object.isRequired,
};
