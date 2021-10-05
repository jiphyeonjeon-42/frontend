/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router-dom";
import CheckIcon from "../../img/check_icon.svg";
import RedCheckIcon from "../../img/check_icon_red.svg";
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

const Availavble = ({ isAvailable, setAvailable }) => {
  const toggleAvailable = () => {
    setAvailable(!isAvailable);
  };

  return (
    <button type="button" onClick={toggleAvailable} className="availavble">
      <img
        className="availavble__icon"
        src={`${isAvailable ? RedCheckIcon : CheckIcon}`}
        alt="check"
      />
      <div
        className={`availavble__text font-16-bold ${
          isAvailable ? "color-red" : "color-a4"
        }`}
      >
        대여 가능한 도서만 보기
      </div>
    </button>
  );
};

const Sort = ({ userWord, isAvailable, setAvailable, userSort, cateIndex }) => {
  return (
    <div className="sort">
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
      <Availavble isAvailable={isAvailable} setAvailable={setAvailable} />
    </div>
  );
};

export default Sort;
