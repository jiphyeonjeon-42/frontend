/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Arr from "../../img/arrow_right_black.svg";
import "../../css/ReturnbookTable.css";

const ReturnbookTable = ({ factor, openModal, setLendingId }) => {
  const openSetModal = () => {
    setLendingId(factor.id);
    openModal();
  };

  return (
    <div className="return-book__table-list">
      <div className="return-book__table-list__name font-18-bold color-54">
        {factor.login}
      </div>
      <button
        className="return-book__table-list__button"
        type="button"
        onClick={openSetModal}
      >
        <div className="return-book__table-list__title">
          <span className="return-book__table-list__text color-54">
            {factor.title}
          </span>
          <img className="return-book__table-list__arr" src={Arr} alt="arrow" />
        </div>
        <div className="return-book__table-list__info">
          <span className="re-callSign font-16 color-54">
            도서등록번호 : {factor.callSign}
          </span>
          <span className="re-dueDate font-16 color-54">
            {`반납예정일 : ${factor.dueDate.slice(0, 10)}`}
          </span>
          <span
            className={`re-penaltyDays font-16 ${
              factor.penaltyDays ? "color-red" : "color-54"
            }`}
          >
            {`대출연체일 : ${factor.penaltyDays ? factor.penaltyDays : "0"}`}
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
