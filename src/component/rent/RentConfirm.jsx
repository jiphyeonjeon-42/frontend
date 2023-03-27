/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import "../../css/RentConfirm.css";

const RentConfirm = ({ selectedUser, selectedBooks, openModal }) => {
  return (
    <section className="rent__confirm-button">
      <div className="rent__confirm-button__text font-16 color-a4">
        {selectedUser && selectedBooks.length > 0
          ? `${
              selectedUser.nickname ? selectedUser.nickname : selectedUser.email
            }님에게 ${selectedBooks[0].title}${
              selectedBooks[1] ? `, ${selectedBooks[1].title}` : ``
            }를 대출합니다.`
          : "정보를 입력해주세요."}
      </div>
      <button
        className={`rent__confirm-button__button ${
          selectedUser &&
          !selectedUser.isPenalty &&
          selectedBooks.length > 0 &&
          2 - selectedUser.lendings.length >= selectedBooks.length
            ? "red"
            : "black"
        }-button color-ff`}
        type="button"
        disabled={
          selectedUser &&
          !selectedUser.isPenalty &&
          selectedBooks.length > 0 &&
          2 - selectedUser.lendings.length >= selectedBooks.length
            ? ""
            : "disabled"
        }
        onClick={openModal}
      >
        도서 대출하기
      </button>
    </section>
  );
};

RentConfirm.propTypes = {
  // eslint-disable-next-line react/require-default-props
  selectedUser: PropTypes.object,
  selectedBooks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default RentConfirm;
