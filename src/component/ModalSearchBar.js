import React, { useState } from "react";
import SearchIcon from "../img/search_icon_black.svg";
import "../css/ModalSearchBar.css";

// eslint-disable-next-line react/prop-types
const ModalSearchBar = ({ placeHolder, width }) => {
  const [input, setInput] = useState("");

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  return (
    <form className={`modal-search-form ${width}`}>
      <input
        className="modal-search__input"
        required
        type="text"
        autoComplete="off"
        placeholder={placeHolder}
        value={input}
        onChange={onChange}
      />
      <button className="modal-search__button" type="submit">
        <img className="modal-search__icon" src={SearchIcon} alt="search" />
      </button>
    </form>
  );
};

export default ModalSearchBar;
