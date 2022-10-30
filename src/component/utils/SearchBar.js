import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../css/SearchBar.css";

const SearchBar = ({
  setQuery, // 검색 호출을 위한 세터
  wrapperClassName,
  placeHolder,
  isWithBarcodeButton,
  onClickBarcodeButton,
  width,
  isNavigate,
}) => {
  const [urlParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState(urlParams.get("search") || "");
  const navigate = useNavigate();
  const searchRef = useRef();

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

  useEffect(() => {
    searchRef.current.focus();
  }, []);

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
        ref={searchRef}
      />
      {isWithBarcodeButton ? (
        <button
          type="button"
          className="search-bar__button barcode"
          onClick={onClickBarcodeButton}
        >
          바코드
        </button>
      ) : null}
      <button
        className="search-bar__button submit"
        type="submit"
        onSubmit={onSubmit}
      >
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
  isWithBarcodeButton: PropTypes.bool,
  onClickBarcodeButton: PropTypes.func,
  isNavigate: PropTypes.bool,
};

SearchBar.defaultProps = {
  setQuery: undefined,
  wrapperClassName: "",
  placeHolder: "",
  isWithBarcodeButton: false,
  onClickBarcodeButton: () => {},
  isNavigate: false,
};
export default SearchBar;
