/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
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
  const { input, onChange } = useInput("");
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
      <input className="search-button" type="submit" value="검색" />
    </form>
  );
};

export default SearchBar;
