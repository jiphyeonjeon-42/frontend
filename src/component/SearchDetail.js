import React from "react";
import PropTypes from "prop-types";
// import Header from "./Header";
// import Banner from "./Banner";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import BookDetail from "./BookDetail";
import { pageEndState } from "./Books";
import BookStatus from "./BookStatus";

const SearchDetail = ({ location }) => {
  const setPageEndState = useSetRecoilState(pageEndState);
  setPageEndState(true);
  const param = useParams();
  console.log(param);
  if (location.state) {
    return (
      <div className="SearchDetail">
        {/* <Header />
        <Banner /> */}
        <BookDetail location={location} />
        <BookStatus />
      </div>
    );
  }
  return <h1>{param.id}</h1>;
};

SearchDetail.propTypes = {
  location: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchDetail;
