/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
// import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import userState from "../../atom/userState";
import "../../css/BookStatus.css";
import Arr from "../../img/arror_right_res.svg";
import MiniModal from "../utils/MiniModal";

const BookStatus = ({ id, callSign, dueDate, status }) => {
  const [miniModal, setMiniModal] = useState(false);
  const user = useRecoilValue(userState);
  const openModal = () => {
    if (!status) {
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

  return (
    <div className="bookStatus color-54">
      <div className="bookStatus-id font-16">{id}</div>
      <div className="bookStatus-callSign font-16">{callSign}</div>
      <div className="bookStatus-status font-16">{status}</div>
      <div className="bookStatus-dueDate font-16">{dueDate}</div>
      <button
        className={`reservation-btn font-16 ${
          status ? "color-red" : "color-a4"
        }`}
        onClick={openModal}
      >
        <span>예악 하기</span>
        <img className="bookStatus-arr" src={Arr} alt="Arr" />
      </button>
      {miniModal && (
        <MiniModal handleModal={closeModal} typeProps="confirm" bookId={id} />
      )}
    </div>
  );
};

export default BookStatus;
