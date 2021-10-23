/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Arr from "../../img/arrow_right_black.svg";
import "../../css/ReturnbookTable.css";

const ReturnbookTable = ({ factor, openModal, setLendingId }) => {
  const openSetModal = () => {
    setLendingId(factor.book.id);
    openModal();
  };

  return (
    <div className="returnbook-table-list">
      <div className="returnbook-table-list__name font-18-bold color-54">
        {factor.user && factor.user.login}
      </div>
      <button
        className="returnbook-table-list__button"
        type="button"
        onClick={openSetModal}
      >
        <div className="returnbook-table-list__title">
          <span className="font-18-bold color-54">
            {factor.book && factor.book.id}
            {/* {factor.book && factor.book.info && factor.book.info.title} */}
          </span>
          <img className="returnbook-table-list__arr" src={Arr} alt="arrow" />
        </div>
        <div className="returnbook-table-list__info">
          <span className="re-callSign font-16 color-54">
            도서등록번호 : {factor.book && factor.book.callSign}
          </span>
          <span className="re-dueDate font-16 color-54">
            {`반납예정일 : ${factor.dueDate}`}
          </span>
          <span
            className={`re-penaltyDays font-16 ${
              factor.user.penaltyDays === "-" ? "color-54" : "color-red"
            }`}
          >
            {`대출연체일 : ${
              factor.user && factor.user.penaltyDays === "-"
                ? "0"
                : factor.user.penaltyDays
            }`}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ReturnbookTable;

ReturnbookTable.propTypes = {
  setLendingId: PropTypes.func.isRequired,
};
