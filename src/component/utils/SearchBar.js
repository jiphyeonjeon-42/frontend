import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../css/SearchBar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  setQuery, // 검색 호출을 위한 세터
  wrapperClassName,
  placeHolder,
  width,
  isNavigate,
}) => {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  const onChange = event => {
    const { value } = event.currentTarget;
    if (typeof setQuery === "function") {
      if (!isNavigate) setQuery(value);
    }
    setSearchWord(value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (isNavigate) navigate(`/search?search=${searchWord}`);
  };

  return (
    <form
      className={`search-bar__wrapper ${width} ${wrapperClassName}`}
      onSubmit={onSubmit}
    >
      <input
        className="search-bar__input"
        required
        type="text"
        autoComplete="off"
        placeholder={placeHolder}
        value={searchWord}
        onChange={onChange}
      />
      <button className="search-bar__button" type="submit" onSubmit={onSubmit}>
        검색
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  setQuery: PropTypes.func,
  placeHolder: PropTypes.string,
  wrapperClassName: PropTypes.string,
  width: PropTypes.string.isRequired,
  isNavigate: PropTypes.bool,
};

SearchBar.defaultProps = {
  setQuery: undefined,
  wrapperClassName: "",
  placeHolder: "",
  isNavigate: false,
};
export default SearchBar;
