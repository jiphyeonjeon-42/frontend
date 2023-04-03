import PropTypes from "prop-types";
import InquireBoxItem from "../utils/InquireBoxItem";
import InquireBoxLine from "../utils/InquireBoxLine";
import usePatchBooksUpdate from "../../api/books/usePatchBooksUpdate";
import useDialog from "../../hook/useDialog";

const BookStockNeedToCheckListLine = ({ book }) => {
  const {
    setClose: closeConfirm,
    Dialog: ConfirmDialog,
    setOpenConfirm,
  } = useDialog();
  const { setChange, Dialog: ResultDialog } = usePatchBooksUpdate({
    bookTitle: book.title,
    closeModal: closeConfirm,
  });
  const setLostBook = e => {
    const unFound = e.currentTarget;
    console.log(unFound, unFound?.id, unFound?.value);
    setOpenConfirm("분실처리하시겠습니까?", unFound.value, () => {
      setChange({ bookId: unFound.id, status: 1 });
    });
  };
  return (
    <InquireBoxLine key={book.bookId}>
      <ConfirmDialog />
      <ResultDialog />
      <InquireBoxItem keyString="bookId" value={book.bookId} />
      <InquireBoxItem keyString="callSign" value={book.callSign} />
      <InquireBoxItem keyString="category" value={book.category} />
      <InquireBoxItem keyString="title" value={book.title} />
      <button
        className="book-stock__lost-button"
        type="button"
        id={book.bookId}
        value={book.title}
        onClick={setLostBook}
      >
        분실처리
      </button>
    </InquireBoxLine>
  );
};

export default BookStockNeedToCheckListLine;

BookStockNeedToCheckListLine.propTypes = {
  book: PropTypes.shape().isRequired,
};
