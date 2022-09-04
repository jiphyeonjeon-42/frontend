import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "../../css/Sort.css";

const SortBy = ({ userWord, cateIndex, userSort, sortName, text }) => {
  // eslint-disable-next-line prefer-const
  const history = useHistory();

  const changeSortBy = () => {
    history.push(
      `?string=${userWord}&page=${1}&category=${cateIndex}&sort=${sortName}`,
    );
  };

  return (
    <button
      type="button"
      onClick={changeSortBy}
      className={`sort-by__button ${
        userSort === sortName ? "font-16-bold color-54" : "font-16 color-a4"
      }`}
    >
      {text}
    </button>
  );
};

const Sort = ({ userWord, userSort, cateIndex }) => {
  return (
    <div className="sort-by">
      <SortBy
        userWord={userWord}
        cateIndex={cateIndex}
        userSort={userSort}
        sortName="title"
        text="이름순"
      />
      <SortBy
        userWord={userWord}
        cateIndex={cateIndex}
        userSort={userSort}
        sortName="new"
        text="신착도서순"
      />
      <SortBy
        userWord={userWord}
        cateIndex={cateIndex}
        userSort={userSort}
        sortName="popular"
        text="인기순"
      />
    </div>
  );
};

SortBy.propTypes = {
  userWord: PropTypes.string.isRequired,
  userSort: PropTypes.string.isRequired,
  cateIndex: PropTypes.number.isRequired,
  sortName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Sort.propTypes = {
  userWord: PropTypes.string.isRequired,
  userSort: PropTypes.string.isRequired,
  cateIndex: PropTypes.number.isRequired,
};

export default Sort;
