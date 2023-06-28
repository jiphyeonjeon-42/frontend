import useGetBooksIdForStock from "../../api/books/useGetBooksIdForStock";
import BookDetailView from "../utils/BookDetailView";
import SpanWithLabel from "../utils/SpanWithLabel";
import Button from "../utils/Button";
import useDialog from "../../hook/useDialog";
import { bookStatus } from "../../constant/status";
import usePatchStockUpdate from "../../api/stock/usePatchStockUpdate";
import "../../asset/css/BookStockDetailModal.css";

type Props = {
  bookId: number;
  addChecked(...args: unknown[]): unknown;
  closeModal(...args: unknown[]): unknown;
};

const BookStockDetailModal = ({ bookId, closeModal, addChecked }: Props) => {
  const { setOpenTitleAndMessage, Dialog } = useDialog();
  const { bookDetail: book } = useGetBooksIdForStock({
    id: bookId,
    setOpenTitleAndMessage,
    closeModal,
  });

  const { setBookId } = usePatchStockUpdate({
    setOpenTitleAndMessage,
    addList: () => {
      addChecked(book);
      closeModal();
    },
  });

  const callUpdate = () => {
    setBookId(bookId);
  };

  return (
    <>
      {book.bookId ? (
        <BookDetailView
          book={book}
          bookInfoDetailUI={
            <>
              <SpanWithLabel labelText="INFO ID" value={book.bookInfoId} />
              <SpanWithLabel labelText="제목" value={book.title} />
              <SpanWithLabel labelText="저자" value={book.author} />
              <SpanWithLabel labelText="카테고리" value={book.category} />
            </>
          }
          bookDetailUI={
            <>
              <SpanWithLabel labelText="BOOK ID" value={book.bookId} />
              <SpanWithLabel labelText="청구기호" value={book.callSign} />
              <SpanWithLabel
                labelText="도서 상태"
                value={bookStatus.find(i => i.code === book.status).string}
              />
            </>
          }
          bottomUI={
            <div className="book-stock__detail-modal__buttons">
              <Button onClick={callUpdate} value="업데이트" color="red" />
              <Button onClick={closeModal} value="닫기" />
            </div>
          }
        />
      ) : null}

      <Dialog />
    </>
  );
};

export default BookStockDetailModal;
