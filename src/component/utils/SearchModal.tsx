import { useRef } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import TextWithLabel from "./TextWithLabel";
import "../../css/SearchModal.css";

type SearchModalProps = {
  titleText: string;
  isWithBarcodeButton?: boolean;
  onClickBarcodeButton?(...args: unknown[]): unknown;
  searchBarPlaceholder?: string;
  page: number;
  setPage(...args: unknown[]): unknown;
  setQuery(...args: unknown[]): unknown;
  lastPage: number;
  children: React.ReactElement;
};

const SearchModal = ({
  titleText,
  isWithBarcodeButton,
  onClickBarcodeButton,
  searchBarPlaceholder,
  page,
  setPage,
  setQuery,
  lastPage,
  children,
}: SearchModalProps) => {
  const headerRef = useRef(null);
  return (
    <div className="search-modal" ref={headerRef}>
      <div className="search-modal__header padding">
        <TextWithLabel
          mainText={titleText}
          wrapperClassName="search-modal__header__title"
        />
        <SearchBar
          setQuery={setQuery}
          width="long"
          isWithBarcodeButton={isWithBarcodeButton}
          onClickBarcodeButton={onClickBarcodeButton}
          placeHolder={searchBarPlaceholder}
        />
      </div>
      <div className="search-modal__list padding">{children}</div>
      <div className="search-modal__pagination">
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </div>
    </div>
  );
};

export default SearchModal;

SearchModal.defaultProps = {
  isWithBarcodeButton: false,
  onClickBarcodeButton: () => {},
  searchBarPlaceholder: "",
};
