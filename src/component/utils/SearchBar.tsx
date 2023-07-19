import {
  useRef,
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../asset/css/SearchBar.css";

type Props = {
  setQuery?: (query: string) => void;
  placeHolder?: string;
  wrapperClassName?: string;
  width: "banner" | "center" | "short" | "long";
  isWithBarcodeButton?: boolean;
  onClickBarcodeButton?: MouseEventHandler<HTMLButtonElement>;
  isNavigate?: boolean;
  isFocusedOnMount?: boolean;
};

const SearchBar = ({
  setQuery,
  placeHolder = "",
  wrapperClassName = "",
  width,
  isWithBarcodeButton = false,
  onClickBarcodeButton = () => {},
  isNavigate = false,
  isFocusedOnMount = true,
}: Props) => {
  const [urlParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState(urlParams.get("search") || "");
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.currentTarget;
    if (typeof setQuery === "function") {
      if (!isNavigate) setQuery(value);
    }
    setSearchWord(value);
  };

  const onSubmit: FormEventHandler = event => {
    event.preventDefault();
    const encodedSearchWord = encodeURIComponent(searchWord);
    if (isNavigate) navigate(`/search?search=${encodedSearchWord}`);
  };

  useEffect(() => {
    if (isFocusedOnMount && searchRef.current) {
      searchRef.current.focus();
    }
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
      <button className="search-bar__button submit" type="submit">
        검색
      </button>
    </form>
  );
};

export default SearchBar;
