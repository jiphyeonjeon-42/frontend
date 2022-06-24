import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import axios from "axios";
import AdminSearchBar from "../utils/AdminSearchBar";
import { useAdminSearchInput } from "../../atom/useSearchInput";
import AdminPagination from "../utils/AdminPagination";
import BookList from "./RentModalBookList";
import "../../css/RentModalBook.css";

const RentModalBook = ({ selectedBooks, setSelectedBooks, closeMidModal }) => {
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
        console.log(res.data.items);
        setBookList(res.data.items);
        setLastBookSearchPage(
          res.data.meta.totalPages > 0 ? res.data.meta.totalPages : 1,
        );
      })
      .catch(error => {
        const { errorCode } = error.response.data;
        // eslint-disable-next-line no-restricted-globals
        if (errorCode === 100) location.replace("/");
        if ([101, 102, 108, 109].includes(errorCode))
          // eslint-disable-next-line no-restricted-globals
          location.replace("/logout");
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
    <section className="modal__wrapper rent__modal-book">
      <div className="rent__modal-book__title">
        <div className="rent__modal-book__title-text font-28-bold color-54">
          도서 정보
        </div>
        <AdminSearchBar
          width="long"
          placeHolder="도서의 이름을 입력해주세요."
        />
      </div>
      <div className="rent__modal-book__total-list">
        {bookList.map(book => (
          <BookList
            key={book.id}
            book={book}
            setSelectedBooks={setSelectedBooks}
            selectedBooks={selectedBooks}
            closeMidModal={closeMidModal}
          />
        ))}
      </div>
      <div className="rent__modal-user__pagination">
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

export default RentModalBook;

RentModalBook.propTypes = {
  setSelectedBooks: PropTypes.func.isRequired,
  closeMidModal: PropTypes.func.isRequired,
  selectedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
