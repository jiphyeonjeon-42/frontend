import BookStockNeedToCheckListLine from "./BookStockNeedToCheckListLine";
import { useGetStockSearch } from "../../api/stock/useGetStockSearch";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import InquireBoxBody from "../utils/InquireBoxBody";
import Pagination from "../utils/Pagination";
import Book from "../../asset/img/admin_icon.svg";
import { useDialog } from "../../hook/useDialog";
import "../../asset/css/BookStockNeedToCheckList.css";

const BookStockNeedToCheckList = () => {
  const { setOpenTitleAndMessage, Dialog } = useDialog();
  const { page, setPage, lastPage, list } = useGetStockSearch({
    setOpenTitleAndMessage,
  });

  return (
    <section>
      <InquireBoxTitle
        Icon={Book}
        titleKO="확인 필요"
        titleEN="최근 업데이트되지 않은 책 목록입니다. 분실되지 않았는지 확인해주세요"
      />
      <InquireBoxBody className="book-stock__need-to-checked">
        {list.map(book => (
          <BookStockNeedToCheckListLine key={book.bookId} book={book} />
        ))}
        <Pagination
          page={page}
          lastPage={lastPage}
          setPage={setPage}
          className="book-stock__need-to__pagination"
        />
      </InquireBoxBody>
      <Dialog />
    </section>
  );
};

export default BookStockNeedToCheckList;
