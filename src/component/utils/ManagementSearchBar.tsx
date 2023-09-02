import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import SearchBar from "~/component/utils/SearchBar";

type Props = {
  width: "banner" | "center" | "short" | "long";
  setQuery?: (query: string) => void;
  placeHolder?: string;
  wrapperClassName?: string;
  isWithBarcodeButton?: boolean;
  isFocusedOnMount?: boolean;
  onClickBarcodeButton?: MouseEventHandler<HTMLButtonElement>;
};

const ManagementSearchBar = ({
  width,
  setQuery = () => {},
  placeHolder,
  wrapperClassName = "",
  isWithBarcodeButton = false,
  isFocusedOnMount = true,
  onClickBarcodeButton = () => {},
  ...rest
}: Props) => {
  const [keyword, setKeyword] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocusedOnMount && searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const changeKeyword: ChangeEventHandler<HTMLInputElement> = e => {
    const changed = e.currentTarget.value;
    setKeyword(changed);
    setQuery(changed);
  };

  return (
    <SearchBar className={wrapperClassName} width={width}>
      <SearchBar.Input
        {...rest}
        placeholder={placeHolder}
        value={keyword}
        onChange={changeKeyword}
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
      <SearchBar.Button />
    </SearchBar>
  );
};

export default ManagementSearchBar;
