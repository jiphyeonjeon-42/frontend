import { MouseEventHandler } from "react";
import InquireBoxItem from "../utils/InquireBoxItem";
import InquireBoxLine from "../utils/InquireBoxLine";
import { usePatchBooksUpdate } from "../../api/books/usePatchBooksUpdate";
import { Book } from "../../type";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  book: Book;
};

const BookStockNeedToCheckListLine = ({ book }: Props) => {
  const { setChange } = usePatchBooksUpdate({
    bookTitle: book.title,
    closeModal: () => {},
  });

  const { addConfirmDialog } = useNewDialog();
  const setLostBook: MouseEventHandler<HTMLButtonElement> = e => {
    const unFound = e.currentTarget;
    addConfirmDialog(
      `${unFound.id}분실`,
      "분실처리하시겠습니까?",
      unFound.value,
      () => {
        setChange({ bookId: +unFound.id, status: 1 });
      },
    );
  };
  return (
    <InquireBoxLine key={book.bookId}>
      <InquireBoxItem keyString="bookId" value={book.bookId} />
      <InquireBoxItem keyString="callSign" value={book.callSign} />
      <InquireBoxItem keyString="category" value={book.category} />
      <InquireBoxItem keyString="title" value={book.title} />
      <button
        className="book-stock__lost-button"
        type="button"
        id={book.bookId.toString()}
        value={book.title}
        onClick={setLostBook}
      >
        분실처리
      </button>
    </InquireBoxLine>
  );
};

export default BookStockNeedToCheckListLine;
