import React from "react";
import PropTypes from "prop-types";
import "../../css/ReservedTableList.css";
import Arr from "../../img/arrow_right_black.svg";

const ReservedTableList = ({
  isPending,
  isWaiting,
  isExpired,
  factor,
  openModal,
  setInfo,
}) => {
  const openSetModal = () => {
    setInfo(factor);
    openModal();
  };

  const printEndReason = status => {
    if (status === 1) return "대출 완료";
    if (status === 2) return "예약 취소";
    return "예약 기한 만료";
  };

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
            {factor && factor.status && isExpired
              ? `예약 만료 이유 : ${printEndReason(factor.status)}`
              : null}
          </span>
        </div>
      </button>
    </div>
  );
};

ReservedTableList.propTypes = {
  isPending: PropTypes.bool.isRequired,
  isWaiting: PropTypes.bool.isRequired,
  isExpired: PropTypes.bool.isRequired,
  factor: PropTypes.shape.isRequired,
  openModal: PropTypes.func.isRequired,
  setInfo: PropTypes.func.isRequired,
};

export default ReservedTableList;
