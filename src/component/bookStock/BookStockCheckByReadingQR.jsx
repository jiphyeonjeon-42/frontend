import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import BarcodeReader from "../utils/BarcodeReader";
import useModal from "../../hook/useModal";
import { parseBookIdFromQRLabel } from "../../util/parseBookIdFromQRLabel";
import BookStockDetailModal from "./BookStockDetailModal";

const BookStockCheckByReadingQR = ({ addChecked }) => {
  const [bookId, setBookId] = useState(0);
  const {
    isOpen: isModalOpen,
    setOpen: openBookDetailModal,
    setClose: closeModal,
    Modal,
  } = useModal();

  const isReadyToRead = !isModalOpen;

  const toDoAfterRead = useCallback(QRText => {
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
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
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

BookStockCheckByReadingQR.propTypes = {
  addChecked: PropTypes.func.isRequired,
};
