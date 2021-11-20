import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const UserConfirm = ({
  bookId,
  closeModal,
  onConfirm,
  setReservationStep,
  setErrorMessage,
}) => {
  const [expectedRank, setExpectedRank] = useState(-1);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/books/${bookId}/reservations/count/`)
      .then(response => {
        setExpectedRank(response.data.count);
      })
      .catch(error => {
        setReservationStep("failure");
        setErrorMessage(
          error.response.data.message
            ? error.response.data.message
            : error.message,
        );
      });
  }, []);
  const onCancel = () => {
    closeModal();
  };
  return (
    <div className="modal__wrapper">
      <div className="mini-modal__text">
        <p className="mini-modal__text__title font-32-bold color-2d">
          현재 예약대기자는
          <span className="color-red"> {expectedRank}명</span>입니다.
          <br />
          예약하시겠습니까?
        </p>
        <p className="mini-modal__text__message font-18-bold color-54">
          주의: 예약도서는 2권 이상 대출할 수 없거나, 연체회원일 경우 대출이
          제한됩니다.
        </p>
      </div>
      <div>
        <button
          className="modal__button confirm mini font-20 color-ff"
          type="button"
          onClick={onConfirm}
        >
          확인하기
        </button>
        <button
          className="modal__button mini font-20 color-ff"
          type="button"
          onClick={onCancel}
        >
          취소하기
        </button>
      </div>
    </div>
  );
};

export default UserConfirm;

UserConfirm.propTypes = {
  bookId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  setReservationStep: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};
