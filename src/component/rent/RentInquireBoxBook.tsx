import { useModal } from "../../hook/useModal";
import RentModalBook from "./RentModalBook";
import Image from "../utils/Image";
import { Book } from "../../type";
import DeleteButton from "../../asset/img/x_button.svg";
import "../../asset/css/RentInquireBoxBook.css";

type Props = {
  setSelectedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  selectedBooks: Book[];
  shape: string;
  book?: Book | null;
};

const InquireBoxBook = ({
  shape,
  book,
  selectedBooks,
  setSelectedBooks,
}: Props) => {
  const { setOpen, setClose, Modal } = useModal();

  const deleteBook = () => {
    if (setSelectedBooks && book) {
      setSelectedBooks(
        selectedBooks.filter(selectedBook => selectedBook !== book),
      );
    }
  };

  return (
    <div className={`rent__inquire-box-book ${shape}`}>
      {book ? (
        <div className="rent__inquire-box-book-active">
          <div className="rent__inquire-box-book__id-undo">
            <div className="rent__inquire-box-book__id color-54">
              {book?.title}
            </div>
            <button
              className="rent__inquire-box-book__undo-button color-a4"
              type="button"
              onClick={deleteBook}
            >
              <Image src={DeleteButton} alt="delete" />
            </button>
          </div>
          <div className="rent__inquire-box-book__info color-54">
            <div className="book__info__factor">
              <span className="book__info__factor-key">ISBN</span>
              <span className="book__info__factor-value">{book?.isbn}</span>
            </div>
            <div className="book__info__factor">
              <span className="book__info__factor-key">청구기호</span>
              <span className="book__info__factor-value">{book?.callSign}</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="rent__inquire-box-book__add-button color-a4"
          type="button"
          onClick={setOpen}
        >
          +
        </button>
      )}
      <Modal>
        <RentModalBook
          selectedBooks={selectedBooks}
          setSelectedBooks={setSelectedBooks}
          closeModal={setClose}
        />
      </Modal>
    </div>
  );
};

export default InquireBoxBook;
