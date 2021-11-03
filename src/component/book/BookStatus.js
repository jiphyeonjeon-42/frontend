/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import userState from "../../atom/userState";
import "../../css/BookStatus.css";
import ArrRes from "../../img/arrow_right_res.svg";
import ArrDef from "../../img/arrow_right_res_default.svg";
import MiniModal from "../utils/MiniModal";

const BookStatus = ({ id, callSign, dueDate, status, index }) => {
  const [miniModal, setMiniModal] = useState(false);
  const user = useRecoilValue(userState);
  const openModal = () => {
    if (dueDate === "-") {
      return;
    }
    if (!user.isLogin) {
      window.location = `${process.env.REACT_APP_API}/auth/oauth`;
      return;
    }
    setMiniModal(true);
  };

  const closeModal = () => {
    setMiniModal(false);
  };

  const doubleDigit = number => {
    return number < 10 ? `0${number}` : `${number}`;
  };
  return (
    <div className="bookStatus color-54">
      <div className="bookStatus-id font-16">{doubleDigit(index + 1)}</div>
      <div className="bookStatus-callSign font-16">{callSign}</div>
      <div className="bookStatus-status font-16">{status}</div>
      <div className="bookStatus-dueDate font-16">{dueDate}</div>
      <button
        type="button"
        className={`reservation-btn font-16 ${
          dueDate === "-" ? "color-a4" : "color-red cursor-pointer"
        }`}
        onClick={openModal}
        disabled={dueDate === "-"}
      >
        <span>{dueDate === "-" ? "예약 불가" : "예약 하기"}</span>
        <img
          className="bookStatus-arr"
          src={dueDate === "-" ? ArrDef : ArrRes}
          alt="Arr"
        />
      </button>
      {miniModal && (
        <MiniModal handleModal={closeModal} typeProps="confirm" bookId={id} />
      )}
    </div>
  );
};

export default BookStatus;
