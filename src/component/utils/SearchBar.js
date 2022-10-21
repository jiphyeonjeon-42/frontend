import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../css/SearchBar.css";

const SearchBar = ({
  setQuery, // 검색 호출을 위한 세터
  wrapperClassName,
  placeHolder,
  width,
}) => {
  const [searchWord, setSearchWord] = useState("");

  const onChange = event => {
    const { value } = event.currentTarget;
    if (typeof setQuery === "function") {
      console.log("!!", value);
      setQuery(value);
    }
    setSearchWord(value);
  };

  const onSubmit = event => {
    event.preventDefault();
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
};

SearchBar.defaultProps = {
  setQuery: undefined,
  wrapperClassName: "",
  placeHolder: "",
};
export default SearchBar;
