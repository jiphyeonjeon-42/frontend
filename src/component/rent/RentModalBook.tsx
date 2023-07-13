import { useState } from "react";
import BookList from "./RentModalBookList";
import SearchModal from "../utils/SearchModal";
import BarcodeReader from "../utils/BarcodeReader";
import { useGetBooksSearch } from "../../api/books/useGetBooksSearch";
import { useGetBooksId } from "../../api/books/useGetBooksId";
import { Book } from "../../type";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  setSelectedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  closeModal: () => void;
  selectedBooks: Book[];
};

const RentModalBook = ({
  selectedBooks,
  setSelectedBooks,
  closeModal,
}: Props) => {
  const [isUsingBarcodeReader, setUsingBarcodeReader] = useState(true);

  const { setBookId } = useGetBooksId({
    setSelectedBooks,
    closeModal,
  });

  const { addDialogWithTitleAndMessage } = useNewDialog();
  const toDoAfterRead = (text: string) => {
    const bookId = text?.split(" ")[0];
    setUsingBarcodeReader(false);
    const isAlreadySelected = selectedBooks.some(
      book => book.bookId === +bookId,
    );
    if (isAlreadySelected)
      addDialogWithTitleAndMessage(
        "alreadySelected",
        "이미 선택된 도서입니다.",
        "다시 한번 확인해주세요",
      );
    else setBookId(bookId);
    closeModal();
  };

  const { bookList, lastPage, page, setPage, setQuery } = useGetBooksSearch({
    limit: 3,
  });

  return (
    <SearchModal
      titleText="도서 정보"
      searchBarPlaceholder="도서의 이름을 입력해주세요."
      page={page}
      setPage={setPage}
      setQuery={setQuery}
      lastPage={lastPage}
      isWithBarcodeButton
      onClickBarcodeButton={() => setUsingBarcodeReader(!isUsingBarcodeReader)}
    >
      {isUsingBarcodeReader && <BarcodeReader toDoAfterRead={toDoAfterRead} />}
      {bookList.map(book => (
        <BookList
          key={book.bookId}
          book={book}
          setSelectedBooks={setSelectedBooks}
          selectedBooks={selectedBooks}
          closeModal={closeModal}
        />
      ))}
    </SearchModal>
  );
};

export default RentModalBook;
