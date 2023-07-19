import { useCallback, useState } from "react";
import BarcodeReader from "../utils/BarcodeReader";
import { useModal } from "../../hook/useModal";
import { parseBookIdFromQRLabel } from "../../util/parseBookIdFromQRLabel";
import BookStockDetailModal from "./BookStockDetailModal";
import { Book } from "../../type";

type Props = {
  addChecked: (checked: Book) => void;
};

const BookStockCheckByReadingQR = ({ addChecked }: Props) => {
  const [bookId, setBookId] = useState(0);
  const {
    isOpen: isModalOpen,
    setOpen: openBookDetailModal,
    setClose: closeModal,
    Modal,
  } = useModal();

  const isReadyToRead = !isModalOpen;

  const toDoAfterRead = useCallback((QRText: string) => {
    if (isReadyToRead) {
      const parsedId = parseBookIdFromQRLabel(QRText);
      setBookId(parsedId);
      openBookDetailModal();
    }
  }, []);

  return (
    <section>
      {isReadyToRead ? <BarcodeReader toDoAfterRead={toDoAfterRead} /> : null}
      {bookId ? (
        <Modal>
          <BookStockDetailModal
            bookId={bookId}
            closeModal={closeModal}
            addChecked={addChecked}
          />
        </Modal>
      ) : null}
    </section>
  );
};

export default BookStockCheckByReadingQR;
