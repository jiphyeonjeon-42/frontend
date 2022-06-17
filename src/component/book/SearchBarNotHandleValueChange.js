import React, { useRef } from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../img/search_icon.svg";

const SearchBarNotHandleValueChange = ({ fetchFunction, formStyleName }) => {
  const searchQueryRef = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    fetchFunction(searchQueryRef);
  };

  // useEffect(() => {
  //   searchQueryRef.current.value = "9788998756444";
  //   fetchFunction(searchQueryRef);
  // }, []);

  return (
    <form onSubmit={onSubmitForm} className={formStyleName}>
      <input type="search-query" id="query" ref={searchQueryRef} required />
      <button type="submit">
        <img className="search-icon" src={SearchIcon} alt="search" />
      </button>
    </form>
  );
};

export default SearchBarNotHandleValueChange;

SearchBarNotHandleValueChange.propTypes = {
  formStyleName: PropTypes.string.isRequired,
  fetchFunction: PropTypes.func.isRequired,
};
