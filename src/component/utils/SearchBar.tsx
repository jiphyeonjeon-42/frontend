import { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../css/SearchBar.css";

type SearchBarProps = {
  setQuery?(...args: unknown[]): unknown;
  placeHolder?: string;
  wrapperClassName?: string;
  width: string;
  isWithBarcodeButton?: boolean;
  onClickBarcodeButton?(...args: unknown[]): unknown;
  isNavigate?: boolean;
  isFocusedOnMount?: boolean;
};

const SearchBar = ({
  // 검색 호출을 위한 세터
  setQuery,

  wrapperClassName,
  placeHolder,
  isWithBarcodeButton,
  onClickBarcodeButton,
  width,
  isNavigate,
  isFocusedOnMount,
}: SearchBarProps) => {
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
    const encodedSearchWord = encodeURIComponent(searchWord);
    if (isNavigate) navigate(`/search?search=${encodedSearchWord}`);
  };

  useEffect(() => {
    if (isFocusedOnMount) searchRef.current.focus();
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

SearchBar.defaultProps = {
  setQuery: undefined,
  wrapperClassName: "",
  placeHolder: "",
  isWithBarcodeButton: false,
  onClickBarcodeButton: () => {},
  isNavigate: false,
  isFocusedOnMount: true,
};
export default SearchBar;
