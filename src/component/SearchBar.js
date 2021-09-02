import React from "react";
import { atom, useRecoilState } from "recoil";
import "../css/SearchBar.css";
import SearchIcon from "../img/search_icon.svg";

export const useSearchInput = atom({ key: "useSearchInput", default: "" });

const useInput = () => {
  const [input, setInput] = useRecoilState(useSearchInput);
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };
  return { input, onChange };
};

const SearchBar = () => {
  const { input, onChange } = useInput();
  return (
    <form id="search-form">
      <input
        id="search-input"
        required
        type="text"
        value={input}
        onChange={onChange}
      />
      <button className="search-button" type="submit">
        <img className="search-icon" src={SearchIcon} alt="search" />
      </button>
    </form>
  );
};

export default SearchBar;
