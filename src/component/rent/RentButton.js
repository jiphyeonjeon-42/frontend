import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../../css/RentButton.css";

const RentButton = ({ selectUser, selectBooks }) => {
  const createLending = () => {
    axios.post(`${process.env.REACT_APP_API}/lendings`, {
      userId: selectUser.id,
      bookId: selectBooks[0].id,
      condition: "문제없음",
    });
    if (selectBooks.length > 1) {
      axios.post(`${process.env.REACT_APP_API}/lendings`, {
        userId: selectUser.id,
        bookId: selectBooks[1].id,
        condition: "문제없음",
      });
    }
  };
  return (
    <div className="rent-button">
      <div className="rent-button__text font-16 color-a4">
        {selectUser && selectBooks.length > 0
          ? `Name${selectUser.id}님에게 Book${selectBooks[0].id}${
              selectBooks[1] ? `, Book${selectBooks[1].id}` : ``
            }를 대출합니다.`
          : "정보를 입력해주세요."}
      </div>
      <button
        className={`rent-button__button ${
          selectUser && selectBooks.length > 0 ? "red" : "black"
        }-button font-20 color-ff`}
        type="button"
        disabled={selectUser && selectBooks.length > 0 ? "" : "disabled"}
        onClick={createLending}
      >
        도서 대출하기
      </button>
    </div>
  );
};

RentButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectUser: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  selectBooks: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default RentButton;
