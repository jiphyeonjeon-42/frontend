import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import BarcodeReader from "../utils/BarcodeReader";
import SearchIcon from "../../img/search_icon.svg";

const RentBookWithBarcodeReader = ({
  setSelectedBooks,
  selectedBooks,
  closeMidModal,
}) => {
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
  };

  const seletOneOfBook = async bookId => {
    let book;
    await axios
      .get(`${process.env.REACT_APP_API}/books/${bookId}`)
      .then(response => {
        console.log(response.data);
        book = response.data;
      });
    if (setSelectedBooks) {
      selectedBooks.push(book);
      setSelectedBooks(selectedBooks);
      closeMidModal(0);
    }
  };

  const toDoAfterRead = text => {
    const bookId = text.split(" ")[0];
    setSearchText(bookId);
    toggleBarcodeReader();
    seletOneOfBook(bookId);
    closeMidModal(0);
  };

  return (
    <form onSubmit={onSubmitForm} className="add-book__basic-info__isbn-search">
      {isUsingBarcodeReader && <BarcodeReader toDoAfterRead={toDoAfterRead} />}
      <button type="button" onClick={toggleBarcodeReader}>
        {isUsingBarcodeReader ? "바코드 리더 숨기기" : "바코드로 대출하기"}
      </button>
      <div className="add-book__basic-info__search-bar">
        <input
          type="text"
          value={searchText}
          onChange={onChangeText}
          required
          placeholder="QR코드를 인식해주세요."
        />
        <button type="submit">
          <img className="search-icon" src={SearchIcon} alt="search" />
        </button>
      </div>
    </form>
  );
};

export default RentBookWithBarcodeReader;

RentBookWithBarcodeReader.propTypes = {
  setSelectedBooks: PropTypes.func.isRequired,
  closeMidModal: PropTypes.func.isRequired,
  selectedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
