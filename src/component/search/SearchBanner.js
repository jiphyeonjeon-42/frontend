import React from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import "../../css/Banner.css";
import "../../css/SearchBanner.css";

const SearchBanner = ({ setStartCate, setPageRange, setAvailable }) => {
  return (
    <section className="banner search-img">
      <section className="search-banner">
        <div className="banner__title">
          <span className="search-banner__title__ko color-ff font-48-bold">
            검색
          </span>
          <span className="search-banner__title__en color-d5 font-16">
            SEARCH
          </span>
        </div>
        <SearchBar
          setStartCate={setStartCate}
          setPageRange={setPageRange}
          setAvailable={setAvailable}
        />
      </section>
    </section>
  );
};

SearchBanner.propTypes = {
  // eslint-disable-next-line react/require-default-props
  setStartCate: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  setPageRange: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  setAvailable: PropTypes.func,
};

export default SearchBanner;
