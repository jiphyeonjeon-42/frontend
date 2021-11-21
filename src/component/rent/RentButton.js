/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import "../../css/RentButton.css";

const RentButton = ({ selectUser, selectBooks, setModal }) => {
  const openRentModal = () => {
    setModal(true);
  };
  return (
    <div className="rent-button">
      <div className="rent-button__text font-16 color-a4">
        {selectUser && selectBooks.length > 0
          ? `${selectUser.login}님에게 ${selectBooks[0].info.title}${
              selectBooks[1] ? `, ${selectBooks[1].info.title}` : ``
            }를 대출합니다.`
          : "정보를 입력해주세요."}
      </div>
      <button
        className={`rent-button__button ${
          selectUser &&
          !selectUser.isPenalty &&
          selectBooks.length > 0 &&
          2 - selectUser.lendingCnt >= selectBooks.length
            ? "red"
            : "black"
        }-button font-20 color-ff`}
        type="button"
        disabled={
          selectUser &&
          !selectUser.isPenalty &&
          selectBooks.length > 0 &&
          2 - selectUser.lendingCnt >= selectBooks.length
            ? ""
            : "disabled"
        }
        onClick={openRentModal}
      >
        도서 대출하기
      </button>
    </div>
  );
};

RentButton.propTypes = {
  // eslint-disable-next-line react/require-default-props
  selectUser: PropTypes.object,
  selectBooks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setModal: PropTypes.func.isRequired,
};

export default RentButton;
