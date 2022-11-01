import React, { useRef } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import TextWithLabel from "./TextWithLabel";
import "../../css/SearchModal.css";

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
}) => {
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

SearchModal.propTypes = {
  titleText: PropTypes.string.isRequired,
  isWithBarcodeButton: PropTypes.bool,
  onClickBarcodeButton: PropTypes.func,
  searchBarPlaceholder: PropTypes.string,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

SearchModal.defaultProps = {
  isWithBarcodeButton: false,
  onClickBarcodeButton: () => {},
  searchBarPlaceholder: "",
};
