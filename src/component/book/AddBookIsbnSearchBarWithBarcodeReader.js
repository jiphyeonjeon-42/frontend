import React, { useState } from "react";
import PropTypes from "prop-types";
import BarcodeReader from "../utils/BarcodeReader";
import SearchIcon from "../../img/search_icon.svg";
import BarcodeIcon from "../../img/barcode.svg";

const IsbnSearchBarWithBarcodeReader = ({ fetchFunction }) => {
  const [isUsingBarcodeReader, setUsingBarcodeReader] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleBarcodeReader = () => {
    setUsingBarcodeReader(!isUsingBarcodeReader);
  };

  const onChangeText = e => {
    setSearchText(e.currentTarget.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    fetchFunction(searchText);
  };

  const toDoAfterRead = text => {
    setSearchText(text);
    fetchFunction(text);
    toggleBarcodeReader();
  };

  return (
    <form onSubmit={onSubmitForm} className="add-book__basic-info__isbn-search">
      {isUsingBarcodeReader && <BarcodeReader toDoAfterRead={toDoAfterRead} />}
      <div className="add-book__basic-info__search-bar">
        <input
          type="text"
          value={searchText}
          onChange={onChangeText}
          required
          placeholder="isbn을 입력해주세요"
        />
        <button type="button" onClick={toggleBarcodeReader}>
          <img
            className="add-book__basic-info__barcode-icon"
            src={BarcodeIcon}
            alt="barcode"
          />
        </button>
        <button type="submit">
          <img
            className="add-book__basic-info__search-icon"
            src={SearchIcon}
            alt="search"
          />
        </button>
      </div>
    </form>
  );
};

export default IsbnSearchBarWithBarcodeReader;

IsbnSearchBarWithBarcodeReader.propTypes = {
  fetchFunction: PropTypes.func.isRequired,
};
