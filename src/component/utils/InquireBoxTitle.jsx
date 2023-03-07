import React from "react";
import PropTypes from "prop-types";
import Image from "./Image";
import SearchBar from "./SearchBar";
import "../../css/InquireBoxTitle.css";

const InquireBoxTitle = ({
  Icon,
  titleKO,
  titleEN,
  KOsize,
  ENsize,
  placeHolder,
  setQuery,
  isWithBarcodeButton,
  onClickBarcodeButton,
}) => {
  return (
    <div className="inquire-box-title">
      <Image
        className={`inquire-box-title__icon ${placeHolder && "short"}`}
        src={Icon}
        alt="icon"
      />
      <span
        className={`inquire-box-title__text ${placeHolder && "short"} color-ff`}
      >
        <span
          className={`inquire-box-title__kr ${
            placeHolder && "short"
          } ${KOsize}`}
        >
          {titleKO}
        </span>
        <span
          className={`inquire-box-title__en ${
            placeHolder && "short"
          } ${ENsize}`}
        >
          {titleEN}
        </span>
      </span>
      {placeHolder ? (
        <SearchBar
          placeHolder={placeHolder}
          width="short"
          setQuery={setQuery}
          isWithBarcodeButton={isWithBarcodeButton}
          onClickBarcodeButton={onClickBarcodeButton}
        />
      ) : null}
    </div>
  );
};

InquireBoxTitle.defaultProps = {
  KOsize: "font-28-bold",
  ENsize: "font-16",
  placeHolder: "",
  setQuery: undefined,
  isWithBarcodeButton: false,
  onClickBarcodeButton: () => {},
};

InquireBoxTitle.propTypes = {
  Icon: PropTypes.string.isRequired,
  titleKO: PropTypes.string.isRequired,
  titleEN: PropTypes.string.isRequired,
  KOsize: PropTypes.string,
  ENsize: PropTypes.string,
  placeHolder: PropTypes.string,
  setQuery: PropTypes.func,
  isWithBarcodeButton: PropTypes.bool,
  onClickBarcodeButton: PropTypes.func,
};

export default InquireBoxTitle;
