import { useGetBooksIdForStock } from "../../api/books/useGetBooksIdForStock";
import { usePatchStockUpdate } from "../../api/stock/usePatchStockUpdate";
import { Book } from "../../type";
import { bookStatus } from "../../constant/status";
import BookDetailView from "../utils/BookDetailView";
import SpanWithLabel from "../utils/SpanWithLabel";
import Button from "../utils/Button";

import "../../asset/css/BookStockDetailModal.css";

type Props = {
  bookId: number;
  addChecked: (checked: Book) => void;
  closeModal: () => void;
};

const BookStockDetailModal = ({ bookId, closeModal, addChecked }: Props) => {
  const { bookDetail: book } = useGetBooksIdForStock({
    id: bookId,
    closeModal,
  });

  const { setBookId } = usePatchStockUpdate({
    addList: () => {
      if (book) addChecked(book);
      closeModal();
    },
  });

  const callUpdate = () => setBookId(bookId);

  return (
    <>
      {book && book.bookId ? (
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
                value={bookStatus.find(i => i.code === book.status)?.string}
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
    </>
  );
};

export default BookStockDetailModal;
