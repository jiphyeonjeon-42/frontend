/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
import { userCategory } from "../atom/categories";
import { sortBy } from "../atom/sortBy";
import CheckIcon from "../img/check_icon.svg";
import RedCheckIcon from "../img/check_icon_red.svg";
import "../css/Sort.css";

// export const sortBy = atom({ key: "sortBy", default: "" });
const availableState = atom({ key: "availableState", default: false });

const SortBy = ({ sort, text }) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const [userSort, setSort] = useRecoilState(sortBy);
  const cateIndex = useRecoilValue(userCategory);

  const changeSortBy = () => {
    setSort(sort);
    history.push(`?page=${1}&category=${cateIndex}&sort=${sort}`);
  };

  return (
    <button
      type="button"
      onClick={changeSortBy}
      className={`sort-by__button ${
        userSort === sort ? "font-16-bold color-54" : "font-16 color-a4"
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

const Sort = () => {
  const setSort = useSetRecoilState(sortBy);
  const setAvailable = useSetRecoilState(availableState);

  useEffect(() => {
    setSort(0);
    setAvailable(false);
  }, []);

  return (
    <div className="sort">
      <div className="sort-by">
        <SortBy sort="accurate" text="정확도순" />
        <SortBy sort="title" text="이름순" />
        <SortBy sort="new" text="발행연도순" />
        <SortBy sort="popular" text="인기순" />
      </div>
      <Availavble />
    </div>
  );
};

export default Sort;
