import React from "react";
import PropTypes from "prop-types";
import BarcodeReader from "../utils/BarcodeReader";
import useGetLendingsSearchId from "../../api/lendings/useGetLendingsSearchId";
import "../../css/ReturnBookWithReader.css";

const returnBarWithBarcodeReader = ({ openModal, setLendingId }) => {
  const { setQuery } = useGetLendingsSearchId({ openModal, setLendingId });

  const toDoAfterRead = text => {
    const bookId = text.split(" ")[0];
    setQuery(bookId);
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
