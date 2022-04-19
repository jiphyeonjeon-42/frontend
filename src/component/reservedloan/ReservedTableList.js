/* eslint-disable react/prop-types */
import React from "react";
import "../../css/ReservedTableList.css";
import Arr from "../../img/arrow_right_black.svg";

const ReservedTableList = ({ factor, openModal, setInfo }) => {
  const openSetModal = () => {
    setInfo(factor);
    openModal();
  };

  return (
    <div className="reserved-loan__table-list">
      <div className="reserved-loan__table-list__name font-18-bold color-54">
        {factor.user && factor.user.login}
      </div>
      <button
        className="reserved-loan__table-list__button"
        type="button"
        onClick={openSetModal}
      >
        <div className="reserved-loan__table-list__title">
          <span className="reserved-loan__table-list__text font-18-bold color-54">
            {factor.book && factor.book.info && factor.book.info.title}
          </span>
          <img
            className="reserved-loan__table-list__arr"
            src={Arr}
            alt="arrow"
          />
        </div>
        <div className="reserved-loan__table-list__info">
          <span className="reserved-loan__table-list__call-sign font-16 color-54">
            도서등록번호 : {factor.book && factor.book.callSign}
          </span>
          <span className="font-16 color-54">
            {factor.book &&
              factor.book.lendings[0] &&
              `반납 예정일 : ${factor.book.lendings[0].dueDate}`}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ReservedTableList;
