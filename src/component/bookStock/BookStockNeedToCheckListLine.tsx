import { MouseEventHandler } from "react";
import { usePatchBooksUpdate } from "../../api/books/usePatchBooksUpdate";
import { useNewDialog } from "../../hook/useNewDialog";
import { Book } from "../../type";
import InquireBoxItem from "../utils/InquireBoxItem";
import InquireBoxLine from "../utils/InquireBoxLine";

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
      "confirmLostBook",
      "분실처리하시겠습니까?",
      unFound.value,
      () => {
        setChange({ ...book, status: 1 });
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
