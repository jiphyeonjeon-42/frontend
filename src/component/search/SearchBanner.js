import React from "react";
import PropTypes from "prop-types";
import SearchBar from "../utils/SearchBar";
import "../../css/Banner.css";
import "../../css/SearchBanner.css";

const SearchBanner = ({ setQuery }) => {
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
        <SearchBar setQuery={setQuery} width="banner" />
      </section>
    </section>
  );
};

SearchBanner.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default SearchBanner;
