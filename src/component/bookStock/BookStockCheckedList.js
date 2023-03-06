import React, { useState } from "react";
import PropTypes from "prop-types";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import Book from "../../img/admin_icon.svg";
import InquireBoxBody from "../utils/InquireBoxBody";
import BookStockCheckedListLine from "./BookStockCheckedListLine";
import Pagination from "../utils/Pagination";
import "../../css/BookStockCheckedList.css";

const BookStockCheckedList = ({ checkedList }) => {
  const [page, setPage] = useState(1);

  const start = (page - 1) * 5;
  const VisibleList = checkedList.slice(start, start + 5);
  const lastPage =
    checkedList.length > 5 ? Math.floor(checkedList.length / 5) + 1 : 0;

  return (
    <section className="book-stock__checked-list">
      <InquireBoxTitle
        Icon={Book}
        titleKO="확인 완료"
        titleEN="방금 재고확인한 도서 목록입니다. 새로고침시 유지되지 않으니 조심하세요!"
      />
      <InquireBoxBody className="book-stock__checked-list__box">
        {VisibleList.map(book => (
          <BookStockCheckedListLine key={book.bookId} book={book} />
        ))}

        <Pagination
          page={page}
          lastPage={lastPage}
          setPage={setPage}
          className="book-stock__need-to__pagination"
        />
      </InquireBoxBody>
    </section>
  );
};

export default BookStockCheckedList;

BookStockCheckedList.propTypes = {
  checkedList: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
