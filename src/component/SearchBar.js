import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageRangeState } from "../atom/page";
import { startCategory, userCategoryName } from "../atom/categories";
import { useSearchInput } from "../atom/useSearchInput";
import "../css/SearchBar.css";
import SearchIcon from "../img/search_icon.svg";

// export const useSearchInput = atom({ key: "useSearchInput", default: "" });

const SearchBar = () => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const [input, setInput] = useRecoilState(useSearchInput);
  const setPageRange = useSetRecoilState(pageRangeState);
  const setCategoryName = useSetRecoilState(userCategoryName);
  const setStartCategory = useSetRecoilState(startCategory);

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  const handleSearchSumbit = event => {
    event.preventDefault();
    setPageRange(0);
    setCategoryName("");
    setStartCategory(0);
    const searchForm = document.getElementById("search-form");
    const searchInputValue = searchForm.querySelector("#search-input").value;
    history.push(
      `/search/${searchInputValue}?page=${1}&category=${0}&sort=accurate`,
    );
  };

  useEffect(() => {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", handleSearchSumbit);
    return () => searchForm.removeEventListener("submit", handleSearchSumbit);
  }, [handleSearchSumbit]);

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
