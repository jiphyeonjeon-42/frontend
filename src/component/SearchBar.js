/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchWord } from "../atom/searchWord";
import { useSearchInput } from "../atom/useSearchInput";
import "../css/SearchBar.css";
import SearchIcon from "../img/search_icon.svg";

const SearchBar = ({ setStartCate, setPageRange, setAvailable }) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const [input, setInput] = useRecoilState(useSearchInput);
  const setUserWord = useSetRecoilState(searchWord);

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  const handleSearchSumbit = event => {
    event.preventDefault();
    // setCategoryName("");
    if (setPageRange) setPageRange(0);
    if (setStartCate) setStartCate(0);
    if (setAvailable) setAvailable(false);
    const searchForm = document.getElementById("search-form");
    const searchInputValue = searchForm.querySelector("#search-input").value;
    setUserWord(searchInputValue);
    history.push(
      `/search?string=${encodeURIComponent(
        searchInputValue,
      )}&page=${1}&category=${0}&sort=accurate`,
    );
  };

  useEffect(() => {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", handleSearchSumbit);
    return () => searchForm.removeEventListener("submit", handleSearchSumbit);
  }, [handleSearchSumbit, setStartCate, setPageRange, setAvailable]);

  return (
    <form id="search-form">
      <input
        id="search-input"
        required
        type="text"
        autoComplete="off"
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
