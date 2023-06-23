import { useState } from "react";
import useModal from "../../hook/useModal";
import { Book } from "../../type";
import BookManagementBooksListItem from "./BookManagementBooksListItem";
import BookManagementModalDetail from "./BookManagementModalDetail";
import Management from "../utils/Management";

type Props = {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
  setQuery: (query: string) => void;
  booksList: Book[];
  printList: Book[];
  addBookById: (bookId: number) => void;
  removeBookById: (bookId: number) => void;
  addAllBooks: () => void;
  removeAllBooks: () => void;
};

const BookManagementBooksList = ({
  page,
  setPage,
  lastPage,
  setQuery,
  booksList,
  printList,
  addBookById,
  addAllBooks,
  removeBookById,
  removeAllBooks,
}: Props) => {
  const [selectedBook, setSelectedBook] = useState<Book>();
  const { Modal, setOpen, setClose } = useModal();

  const includesArrayById = (array: Book[], id: number) => {
    const found = array.findIndex(item => item.bookId === id);
    return found !== -1;
  };

  const allChecked =
    printList.length > 0 &&
    booksList.every(book => includesArrayById(printList, book.bookId));

  const changeAllBooks = () => {
    if (allChecked) {
      removeAllBooks();
    } else {
      addAllBooks();
    }
  };

  return (
    <>
      {selectedBook && (
        <Modal>
          <BookManagementModalDetail
            book={selectedBook}
            closeModal={setClose}
          />
        </Modal>
      )}
      <Management
        searchBarPlaceHolder="도서 관련 정보를 입력하세요"
        setQuery={setQuery}
        TitleFragement={
          <>
            <input
              className="book-management__checkbox"
              type="checkbox"
              checked={allChecked}
              onChange={changeAllBooks}
            />
            <span className="book-management__list__id">ID</span>
            <p className="book-management__list__classification">
              <span className="book-management__list__category">카테고리</span>
              <span className="book-management__list__call-sign">청구기호</span>
            </p>
            <span className="book-management__list__title">제목</span>
            <span className="book-management__list__status">도서 상태</span>
            <span className="book-management__list__information">수정</span>
          </>
        }
        BoxFragement={
          <>
            {booksList.map(book => {
              const openModal = () => {
                setSelectedBook(book);
                setOpen();
              };
              return (
                <BookManagementBooksListItem
                  key={book.bookId}
                  book={book}
                  removeBookById={removeBookById}
                  addBookById={addBookById}
                  checked={includesArrayById(printList, book.bookId)}
                  openModal={openModal}
                />
              );
            })}
          </>
        }
        page={page}
        setPage={setPage}
        lastPage={lastPage}
      />
    </>
  );
};

export default BookManagementBooksList;
