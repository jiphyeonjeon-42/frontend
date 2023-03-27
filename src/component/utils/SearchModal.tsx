/* eslint-disable react/no-unused-prop-types */
import React, { useRef } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import TextWithLabel from "./TextWithLabel";
import "../../css/SearchModal.css";

type Props = {
  titleText: string;
  isWithBarcodeButton: boolean;
  onClickBarcodeButton: () => void;
  searchBarPlaceholder: string;
  page: number;
  setPage: (page: number) => void;
  setQuery: (query: string) => void;
  lastPage: number;
  children: React.ReactNode;
};

const defaultProps = {
  isWithBarcodeButton: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickBarcodeButton: () => {},
  searchBarPlaceholder: "",
};

const SearchModal = (props: Props) => {
  const {
    titleText,
    isWithBarcodeButton,
    onClickBarcodeButton,
    searchBarPlaceholder,
    page,
    setPage,
    setQuery,
    lastPage,
    children,
  } = { ...defaultProps, ...props };
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
