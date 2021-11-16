import React from "react";
import PropTypes from "prop-types";

const successMessage = lendabledate => {
  if (lendabledate)
    return `대출 가능 일자는 ${lendabledate}.입니다. 감사합니다.`;
  return "대출이 가능해지면 Slack 알림을 보내드리겠습니다.";
};

const SuccessRsv = ({ closeModal, rank, lendabledate }) => {
  return (
    <div className="modal__wrapper">
      <div className="mini-modal__text">
        <p className="mini-modal__text__title font-32-bold color-2d">
          예약
          <span className="color-red"> {rank}순위</span>로 등록되셨습니다.
        </p>
        <p className="mini-modal__text__message font-18-bold color-54">
          {successMessage(lendabledate)}
        </p>
      </div>
      <div>
        <button
          className="modal__button confirm mini font-20 color-ff"
          type="button"
          onClick={closeModal}
        >
          확인하기
        </button>
      </div>
    </div>
  );
};

export default SuccessRsv;

SuccessRsv.propTypes = {
  closeModal: PropTypes.func.isRequired,
  rank: PropTypes.number.isRequired,
  lendabledate: PropTypes.string.isRequired,
};
