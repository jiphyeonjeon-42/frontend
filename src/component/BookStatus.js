/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
// import axios from "axios";
import React from "react";
import "../css/BookStatus.css";
import Arr from "../img/arror_right_res.svg";

const BookStatus = ({ id, callSign, dueDate, status }) => {
  return (
    <div className="bookStatus color-54">
      <div className="bookStatus-id font-16">{id}</div>
      <div className="bookStatus-callSign font-16">{callSign}</div>
      <div className="bookStatus-status font-16">{status}</div>
      <div className="bookStatus-dueDate font-16">{dueDate}</div>
      <button className="reservation-btn font-16 color-red">
        <span>예악 하기</span>
        <img className="bookStatus-arr" src={Arr} alt="Arr" />
      </button>
    </div>
  );
};

export default BookStatus;
