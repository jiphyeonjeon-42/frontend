import React from "react";
import PropTypes from "prop-types";
// import Header from "./Header";
// import Banner from "./Banner";
import BookDetail from "./BookDetail";

const SearchDetail = ({ location }) => {
  if (location.state) {
    return (
      <div className="SearchDetail">
        {/* <Header />
        <Banner /> */}
        <BookDetail location={location} />
      </div>
    );
  }
  return null;
};

SearchDetail.propTypes = {
  location: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object.isRequired,
  }).isRequired,
};

export default SearchDetail;
