import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import BarcodeReader from "../utils/BarcodeReader";
import "../../css/ReturnBookWithReader.css";

const getLendingIdbyBookId = async bookId => {
  let lendingId;
  await axios
    .get(
      `${process.env.REACT_APP_API}/lendings/search/?query=${bookId}&?type=bookId`,
    )
    .then(response => {
      if (response?.data?.items.length === 0) lendingId = -1;
      else lendingId = response.data.items.id;
    });
  return lendingId;
};

const returnBarWithBarcodeReader = ({ openModal, setLendingId }) => {
  const toDoAfterRead = async text => {
    const bookId = text.split(" ")[0];
    const lendingId = await getLendingIdbyBookId(bookId);
    if (lendingId === -1) {
      // eslint-disable-next-line no-alert
      alert("책을 다시 한번 확인해주세요. 해당책의 대출기록이 없습니다.");
    } else {
      setLendingId(lendingId);
      openModal();
    }
  };

  return (
    <div className="return-book__basic-info__qr-search">
      <BarcodeReader toDoAfterRead={toDoAfterRead} />
    </div>
  );
};

export default returnBarWithBarcodeReader;

returnBarWithBarcodeReader.propTypes = {
  fetchFunction: PropTypes.func.isRequired,
};
