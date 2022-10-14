import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import BarcodeReader from "../utils/BarcodeReader";
import "../../css/RentBookWithBarcodeReader.css";

const RentBookWithBarcodeReader = ({ setSelectedBooks, closeModal }) => {
  const [isUsingBarcodeReader, setUsingBarcodeReader] = useState(true);

  const toggleBarcodeReader = () => {
    setUsingBarcodeReader(!isUsingBarcodeReader);
  };

  const seletOneOfBook = async bookId => {
    let book;
    await axios
      .get(`${process.env.REACT_APP_API}/books/${bookId}`)
      .then(response => {
        book = response.data;
        setSelectedBooks(prev => [...prev, book]);
        closeModal(0);
      });
  };

  const toDoAfterRead = text => {
    const bookId = text.split(" ")[0];
    toggleBarcodeReader();
    seletOneOfBook(bookId);
    closeModal(0);
  };

  return (
    <form className="rent-book__basic-info__qr-search">
      {isUsingBarcodeReader && <BarcodeReader toDoAfterRead={toDoAfterRead} />}
      <button type="button" onClick={toggleBarcodeReader}>
        {isUsingBarcodeReader ? "바코드 리더 숨기기" : "바코드로 대출하기"}
      </button>
    </form>
  );
};

export default RentBookWithBarcodeReader;

RentBookWithBarcodeReader.propTypes = {
  setSelectedBooks: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
