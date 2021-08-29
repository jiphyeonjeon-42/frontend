/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/SearchBar.css";

const useInput = initInput => {
  const [input, setInput] = useState(initInput);
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setInput(value);
    // console.log(input);
  };
  return { input, onChange };
};

const SearchBar = () => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const { input, onChange } = useInput("");

  function handleClick() {
    history.push(`/search/${input}`);
  }
  return (
    <form id="search-form">
      <input
        className="search-input"
        required
        type="text"
        placeholder="도서를 검색하세요."
        value={input}
        onChange={onChange}
      />
      <button className="search-button" type="submit" onClick={handleClick}>
        <img
          className="search-icon"
          src="https://image.flaticon.com/icons/png/512/54/54481.png"
          alt="search"
        />
      </button>
    </form>
  );
};

export default SearchBar;
