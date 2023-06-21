import { MouseEventHandler, ReactNode, useRef } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import TextWithLabel from "./TextWithLabel";
import "../../css/SearchModal.css";

type Props = {
  titleText: string;
  className?: string;
  isWithBarcodeButton?: boolean;
  onClickBarcodeButton?: MouseEventHandler<HTMLButtonElement>;
  searchBarPlaceholder?: string;
  page: number;
  setPage: (page: number) => void;
  setQuery: (query: string) => void;
  lastPage: number;
  children: ReactNode;
};

const SearchModal = ({
  titleText,
  className = "",
  isWithBarcodeButton = false,
  onClickBarcodeButton = () => {},
  searchBarPlaceholder = "",
  page,
  setPage,
  setQuery,
  lastPage,
  children,
}: Props) => {
  const headerRef = useRef(null);
  return (
    <div className={`search-modal ${className}`} ref={headerRef}>
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
