/* eslint-disable react/prop-types */
import React from "react";
// import { useHistory } from "react-router-dom";
import CheckIcon from "../../img/check_icon.svg";
import RedCheckIcon from "../../img/check_icon_red.svg";
import "../../css/Available.css";

const Available = ({ isAvailable, setAvailable }) => {
  const toggleAvailable = () => {
    setAvailable(!isAvailable);
  };

  return (
    <button type="button" onClick={toggleAvailable} className="available">
      <img
        className="available__icon"
        src={`${isAvailable ? RedCheckIcon : CheckIcon}`}
        alt="check"
      />
      <div
        className={`available__text font-16-bold ${
          isAvailable ? "color-red" : "color-a4"
        }`}
      >
        대여 가능한 도서만 보기
      </div>
    </button>
  );
};

export default Available;
