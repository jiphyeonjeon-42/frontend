import React, { useState } from "react";
import PropTypes from "prop-types";
import useModal from "../../hook/useModal";
import BookLabelModalToPrint from "./bookLabel/BookLabelModalToPrint";
import Image from "../utils/Image";
import Plus from "../../img/plus_icon_off.svg";
import Minus from "../../img/plus_icon_on.svg";

const BookManagementCartToPrint = ({ printList, removeBookById }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { Modal, setOpen } = useModal();

  const openModal = e => {
    e.stopPropagation();
    if (printList.length) setOpen();
  };

  const removePrintItem = e => {
    const bookId = parseInt(e.currentTarget.value, 10);
    removeBookById(bookId);
  };
  return (
    <>
      <Modal>
        <BookLabelModalToPrint printList={printList} />
      </Modal>
      <div className="book-management__cart">
        <button
          className="book-management__cart__summary"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            className="book-management__cart__icon"
            src={isOpen ? Minus : Plus}
            alt={isOpen ? "카트 생략" : "카트 자세히 보기"}
          />
          <span className="font-20-bold color-54">{`선택된 도서 (${printList.length})`}</span>
        </button>
        <button type="button" onClick={openModal}>
          라벨 출력하기
        </button>

        {isOpen
          ? printList?.map(item => {
              return (
                <div
                  className="book-management__cart__item font-16"
                  key={item.bookId}
                >
                  <button
                    className="book-management__cart__remove-button "
                    type="button"
                    onClick={removePrintItem}
                    value={item.bookId}
                  >
                    빼기
                  </button>
                  <span>{item.bookId}</span>
                  <span>{item.callSign}</span>
                  <span>{item.title}</span>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default BookManagementCartToPrint;
BookManagementCartToPrint.propTypes = {
  printList: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeBookById: PropTypes.func.isRequired,
};
