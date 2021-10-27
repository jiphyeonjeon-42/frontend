import React from "react";
import { atom, useRecoilState } from "recoil";
import SearchIcon from "../../img/search_icon_black.svg";
import "../../css/ModalSearchBar.css";

export const useModalSearchInput = atom({
  key: "useModalSearchInput",
  default: "",
});

// eslint-disable-next-line react/prop-types
const ModalSearchBar = ({ placeHolder, width }) => {
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

export default ModalSearchBar;
