import React, { useState } from "react";
import useGetBooksSearch from "../../api/books/useGetBooksSearch";
import BookManagementCartToPrint from "./BookManagementCartToPrint";
import BookManagementBooksList from "./BookManagementBooksList";
import Tabs from "../utils/Tabs";
import Banner from "../utils/Banner";
import SearchBar from "../utils/SearchBar";
import { managementTabList } from "../../data/tablist";
import "../../css/BookManagement.css";

const BookManagement = () => {
  const [printList, setPrintList] = useState([]);
  const { bookList, lastPage, page, setPage, setQuery, Dialog } =
    useGetBooksSearch({ limit: 10 });

  const addBookById = bookId => {
    const book = bookList.find(item => item.bookId === bookId);
    setPrintList([...printList, book]);
  };
  const addAllBooks = () => {
    const newList = new Set([...printList, ...bookList]);
    setPrintList([...newList]);
  };

  const removeBookById = bookId => {
    const newList = printList.filter(item => item.bookId !== bookId);
    setPrintList(newList);
  };
  const removeAllBooks = () => {
    const newList = printList.filter(item => !bookList.includes(item));
    setPrintList([...newList]);
  };

  return (
    <main>
      <Dialog />
      <Banner img="admin" titleKo="유저 관리" titleEn="USER MANAGEMENT" />
      <Tabs tabList={managementTabList} />
      <section className="book-management__wrapper">
        <SearchBar
          placeHolder="도서 관련 정보를 입력하세요"
          width="center"
          wrapperClassName="book-management__search-bar"
          setQuery={setQuery}
        />
        <BookManagementBooksList
          page={page}
          setPage={setPage}
          lastPage={lastPage}
          booksList={bookList}
          printList={printList}
          addBookById={addBookById}
          addAllBooks={addAllBooks}
          removeBookById={removeBookById}
          removeAllBooks={removeAllBooks}
        />
      </section>
      <BookManagementCartToPrint
        printList={printList}
        removeBookById={removeBookById}
      />
    </main>
  );
};

export default BookManagement;
