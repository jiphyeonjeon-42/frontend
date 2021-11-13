import React from "react";
import { useRecoilState } from "recoil";
import PropTypes from "prop-types";
import { useModalSearchInput } from "../../atom/useSearchInput";
import SearchIcon from "../../img/search_icon_black.svg";
import "../../css/AdminSearchBar.css";

const AdminSearchBar = ({ placeHolder, width }) => {
  const [input, setInput] = useRecoilState(useModalSearchInput);

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  return (
    <form className={`modal-search-form ${width}`}>
      <input
        className="modal-search__input"
        required
        type="text"
        autoComplete="off"
        placeholder={placeHolder}
        value={input}
        onChange={onChange}
      />
      <button className="modal-search__button" type="submit">
        <img className="modal-search__icon" src={SearchIcon} alt="search" />
      </button>
    </form>
  );
};

AdminSearchBar.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default AdminSearchBar;
