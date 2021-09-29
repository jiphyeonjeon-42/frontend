import React from "react";
import "../css/ModalBook.css";
import ModalSearchBar from "./ModalSearchBar";

const ModalBook = () => {
  return (
    <div className="modal-book__search-bar">
      <div className="modal-book__text font-28-bold color-54">도서 정보</div>
      <ModalSearchBar placeHolder="도서의 이름을 입력해주세요." />
    </div>
  );
};

export default ModalBook;
