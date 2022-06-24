/* eslint-disable react/prop-types */
import React from "react";
import "../../css/ReservedTableList.css";
import Arr from "../../img/arrow_right_black.svg";

const ReservedTableList = ({
  isPending,
  isWaiting,
  factor,
  openModal,
  setInfo,
}) => {
  const openSetModal = () => {
    setInfo(factor);
    openModal();
  };

  // console.log(factor && factor.endAt && factor.endAt.slice(0, 10));

  return (
    <div className="reserved-loan__table-list">
      <div className="reserved-loan__table-list__name font-18-bold color-54">
        {factor && factor.login}
      </div>
      <button
        className="reserved-loan__table-list__button"
        type="button"
        onClick={openSetModal}
      >
        <div className="reserved-loan__table-list__title">
          <span className="reserved-loan__table-list__text font-18-bold color-54">
            {factor && factor.title}
          </span>
          <img
            className="reserved-loan__table-list__arr"
            src={Arr}
            alt="arrow"
          />
        </div>
        <div className="reserved-loan__table-list__info">
          <span className="reserved-loan__table-list__call-sign font-16 color-54">
            도서등록번호 : {factor && factor.callSign}
          </span>
          <span className="font-16 color-54">
            {factor && factor.endAt && isPending
              ? `예약 만료일 : ${factor.endAt.slice(0, 10)}`
              : null}
            {factor && factor.createdAt && isWaiting
              ? `예약 시작일 : ${factor.createdAt.slice(0, 10)}`
              : null}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ReservedTableList;
