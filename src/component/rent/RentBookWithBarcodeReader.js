import React, { useState } from "react";
import PropTypes from "prop-types";
import BarcodeReader from "../utils/BarcodeReader";
import useGetBooksId from "../../api/books/useGetBooksId";
import "../../css/RentBookWithBarcodeReader.css";

const RentBookWithBarcodeReader = ({ setSelectedBooks, closeModal }) => {
  const [isUsingBarcodeReader, setUsingBarcodeReader] = useState(true);

  const toggleBarcodeReader = () => {
    setUsingBarcodeReader(!isUsingBarcodeReader);
  };

  const { setBookId } = useGetBooksId({ setSelectedBooks, closeModal });

  const toDoAfterRead = text => {
    const bookId = text.split(" ")[0];
    toggleBarcodeReader();
    setBookId(bookId);
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
