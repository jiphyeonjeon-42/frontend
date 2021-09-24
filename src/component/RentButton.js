import React from "react";
import "../css/RentButton.css";

const RentButton = () => {
  return (
    <div className="rent-button">
      <div className="rent-button__text font-16 color-a4">
        정보를 입력해주세요.
      </div>
      <button className="rent-button__button font-20 color-ff" type="button">
        도서 대출하기
      </button>
    </div>
  );
};

export default RentButton;
