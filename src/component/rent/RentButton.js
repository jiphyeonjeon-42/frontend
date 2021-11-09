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
          ? `Name${selectUser.id}님에게 ${selectBooks[0].info.title}${
              selectBooks[1] ? `, ${selectBooks[1].info.title}` : ``
            }를 대출합니다.`
          : "정보를 입력해주세요."}
      </div>
      <button
        className={`rent-button__button ${
          selectUser && selectBooks.length > 0 ? "red" : "black"
        }-button font-20 color-ff`}
        type="button"
        disabled={selectUser && selectBooks.length > 0 ? "" : "disabled"}
        onClick={openRentModal}
      >
        도서 대출하기
      </button>
    </div>
  );
};

RentButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectUser: PropTypes.object.isRequired,
  selectBooks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setModal: PropTypes.func.isRequired,
};

export default RentButton;
