import React from "react";
import "../../css/RentButton.css";

// eslint-disable-next-line react/prop-types
const RentButton = ({ selectUser, selectBooks }) => {
  return (
    <div className="rent-button">
      <div className="rent-button__text font-16 color-a4">
        {
          // eslint-disable-next-line react/prop-types
          selectUser && selectBooks.length > 0
            ? // eslint-disable-next-line react/prop-types
              `${selectUser.id}님에게 ${selectBooks[0].id}${
                // eslint-disable-next-line react/prop-types
                selectBooks[1] ? `, ${selectBooks[1].id}` : ``
              }를 대출합니다.`
            : "정보를 입력해주세요."
        }
      </div>
      <button
        className={`rent-button__button ${
          // eslint-disable-next-line react/prop-types
          selectUser && selectBooks.length > 0 ? "red" : "black"
        }-button font-20 color-ff`}
        type="button"
      >
        도서 대출하기
      </button>
    </div>
  );
};

export default RentButton;
