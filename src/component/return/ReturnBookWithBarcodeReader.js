import React, { useState } from "react";
import PropTypes from "prop-types";
import BarcodeReader from "../utils/BarcodeReader";
import "../../css/ReturnBookWithReader.css";

const returnBarWithBarcodeReader = ({ fetchFunction }) => {
  const [isUsingBarcodeReader, setUsingBarcodeReader] = useState(true);

  const toggleBarcodeReader = () => {
    setUsingBarcodeReader(!isUsingBarcodeReader);
  };

  const toDoAfterRead = text => {
    fetchFunction(text);
    toggleBarcodeReader();
  };

  return (
    <div className="return-book__basic-info__qr-search">
      {isUsingBarcodeReader && <BarcodeReader toDoAfterRead={toDoAfterRead} />}
    </div>
  );
};

export default returnBarWithBarcodeReader;

returnBarWithBarcodeReader.propTypes = {
  fetchFunction: PropTypes.func.isRequired,
};
