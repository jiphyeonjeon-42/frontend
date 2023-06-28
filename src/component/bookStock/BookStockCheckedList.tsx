import { useState } from "react";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import BookIcon from "../../asset/img/admin_icon.svg";
import InquireBoxBody from "../utils/InquireBoxBody";
import BookStockCheckedListLine from "./BookStockCheckedListLine";
import Pagination from "../utils/Pagination";
import "../../asset/css/BookStockCheckedList.css";
import { Book } from "../../type";

type Props = {
  checkedList: Book[];
};
const BookStockCheckedList = ({ checkedList }: Props) => {
  const [page, setPage] = useState(1);

  const start = (page - 1) * 5;
  const VisibleList = checkedList.slice(start, start + 5);
  const lastPage =
    checkedList.length > 5 ? Math.floor(checkedList.length / 5) + 1 : 0;

  return (
    <section className="book-stock__checked-list">
      <InquireBoxTitle
        Icon={BookIcon}
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
