import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import PropTypes from "prop-types";
import { searchWord } from "../../atom/searchWord";
import { useSearchInput } from "../../atom/useSearchInput";
import "../../css/SearchBar.css";
import SearchIcon from "../../img/search_icon.svg";

const SearchBar = ({ setPageRange, setAvailable }) => {
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
    if (setAvailable) setAvailable(false);

    const categories = document.querySelector(".categories");
    if (categories) categories.scrollTo(0, 0);

    const searchForm = document.getElementById("search-form");
    const searchInputValue = searchForm.querySelector("#search-input").value;
    setUserWord(searchInputValue);
    history.push(
      `/search?string=${encodeURIComponent(
        searchInputValue,
      )}&page=${1}&category=${0}&sort=title`,
    );
  };

  useEffect(() => {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", handleSearchSumbit);
    return () => searchForm.removeEventListener("submit", handleSearchSumbit);
  }, [handleSearchSumbit, setPageRange, setAvailable]);

  return (
    <div className="search-bar">
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
    </div>
  );
};

SearchBar.propTypes = {
  setPageRange: PropTypes.func.isRequired,
  setAvailable: PropTypes.func.isRequired,
};

export default SearchBar;
