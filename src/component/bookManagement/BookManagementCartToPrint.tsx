import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Book } from "../../type";
import { useModal } from "../../hook/useModal";
import BookLabelModalToPrint from "./BookManagementModalToPrint";
import Image from "../utils/Image";
import Plus from "../../asset/img/plus_icon_off.svg";
import Minus from "../../asset/img/plus_icon_on.svg";
import "../../asset/css/BookManagementCart.css";

type Props = {
  printList: Book[];
  removeBookById: (bookId: number) => void;
};

const BookManagementCartToPrint = ({ printList, removeBookById }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { Modal, setOpen } = useModal();

  const openModal: MouseEventHandler = e => {
    e.stopPropagation();
    if (printList.length) setOpen();
  };

  const removePrintItem: ChangeEventHandler<HTMLInputElement> = e => {
    const bookId = parseInt(e.target.value, 10);
    removeBookById(bookId);
  };
  return (
    <>
      <Modal>
        <BookLabelModalToPrint printList={printList} />
      </Modal>
      <button
        className="book-management__cart"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="book-management__cart__summary">
          <Image
            className="book-management__cart__summary-icon"
            src={isOpen ? Minus : Plus}
            alt={isOpen ? "카트 생략" : "카트 자세히 보기"}
          />
          <span className="book-management__cart__summary-text font-20-bold color-54">{`선택된 도서 (${printList.length})`}</span>
          <button
            className={`book-management__cart__print ${
              printList.length > 0 ? "color-red" : "color-a4"
            }`}
            type="button"
            disabled={!printList.length}
            onClick={openModal}
          >
            {printList.length > 0
              ? "라벨 출력하기"
              : "라벨 출력할 도서를 선택하세요"}
          </button>
        </div>
        {isOpen ? (
          <div className="book-management__cart__items">
            {printList?.map(item => {
              return (
                <div
                  className="book-management__cart__item font-16"
                  key={item.bookId}
                >
                  <input
                    type="checkbox"
                    value={item.bookId}
                    defaultChecked
                    onChange={removePrintItem}
                  />
                  <span className="book-management__cart-item__id font-16">
                    {item.bookId}
                  </span>
                  <span className="book-management__cart-item__category font-16">
                    {item.category}
                  </span>
                  <span className="book-management__cart-item__call-sign font-16">
                    {item.callSign}
                  </span>
                  <span className="book-management__cart-item__title font-16">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        ) : null}
      </button>
    </>
  );
};

export default BookManagementCartToPrint;
