/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import CheckIcon from "../img/check_icon.svg";
import "../css/Sort.css";

const sortState = atom({ key: "sortState", default: 0 });
const availableState = atom({ key: "availableState", default: false });

const SortBy = ({ sortIndex, text }) => {
  const [userSort, setSort] = useRecoilState(sortState);

  const changeSortBy = () => {
    setSort(sortIndex);
  };

  return (
    <button
      type="button"
      onClick={changeSortBy}
      className={`sort-by__button ${
        userSort === sortIndex ? "font-16-bold color-54" : "font-16 color-a4"
      }`}
    >
      {text}
    </button>
  );
};

const Availavble = () => {
  const [isAvailable, setAvailable] = useRecoilState(availableState);

  const toggleAvailable = () => {
    setAvailable(!isAvailable);
  };

  return (
    <button type="button" onClick={toggleAvailable} className="availavble">
      <img className="availavble__icon" src={CheckIcon} alt="check" />
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

const Sort = () => {
  const setSort = useSetRecoilState(sortState);
  const setAvailable = useSetRecoilState(availableState);

  useEffect(() => {
    setSort(0);
    setAvailable(false);
  }, []);

  return (
    <div className="sort">
      <div className="sort-by">
        <SortBy sortIndex={0} text="이름순" />
        <SortBy sortIndex={1} text="입고순" />
        <SortBy sortIndex={2} text="발행연도순" />
        <SortBy sortIndex={3} text="인기순" />
      </div>
      <Availavble />
    </div>
  );
};

export default Sort;
