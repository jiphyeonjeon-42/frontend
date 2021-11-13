/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router-dom";
import "../../css/Sort.css";

const SortBy = ({ userWord, cateIndex, userSort, sortName, text }) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();

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
        sortName="accurate"
        text="정확도순"
      />
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
        text="발행연도순"
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

export default Sort;
