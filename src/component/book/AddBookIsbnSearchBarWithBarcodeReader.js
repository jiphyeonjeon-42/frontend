import React, { useState } from "react";
import PropTypes from "prop-types";
import BarcodeReader from "./BarcodeReader";
import SearchIcon from "../../img/search_icon.svg";

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
      <button type="button" onClick={toggleBarcodeReader}>
        {isUsingBarcodeReader ? "바코드 리더 숨기기" : "바코드로 isbn읽기"}
      </button>
      <div className="add-book__basic-info__search-bar">
        <input
          type="text"
          value={searchText}
          onChange={onChangeText}
          required
          placeholder="isbn을 입력해주세요"
        />
        <button type="submit">
          <img className="search-icon" src={SearchIcon} alt="search" />
        </button>
      </div>
    </form>
  );
};

export default IsbnSearchBarWithBarcodeReader;

IsbnSearchBarWithBarcodeReader.propTypes = {
  fetchFunction: PropTypes.func.isRequired,
};
