/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useHistory } from "react-router-dom";
import {
  entireCategory,
  userCategory,
  startCategory,
} from "../atom/categories";
import { sortBy } from "../atom/sortBy";
import ArrLeft from "../img/arrow_left_black.svg";
import ArrRight from "../img/arrow_right_black.svg";
import "../css/CategoryFilter.css";

// export const userCategory = atom({ key: "userCategory", default: 0 });
// export const userCategoryName = atom({ key: "userCategoryName", default: "" });
// const startCategory = atom({ key: "startCategory", default: 0 });
const hiddenCategory = atom({ key: "hiddenCategory", default: true });

const PreCategory = () => {
  const [startCate, setStartCate] = useRecoilState(startCategory);

  const slideLeft = () => {
    if (startCate > 0) {
      setStartCate(startCate - 1);
    }
  };

  return (
    <button className="pre-category" type="button" onClick={slideLeft}>
      {startCate === 0 ? (
        <img className="category-button-icon" src={ArrLeft} alt="preCategory" />
      ) : (
        <img
          className="category-button-icon-reverse"
          src={ArrRight}
          alt="preCategory"
        />
      )}
    </button>
  );
};

const NextCategory = () => {
  const [startCate, setStartCate] = useRecoilState(startCategory);
  const hiddenCate = useRecoilValue(hiddenCategory);

  const slideRight = () => {
    if (hiddenCate) {
      setStartCate(startCate + 1);
    }
  };

  return (
    <button className="next-category" type="button" onClick={slideRight}>
      {hiddenCate ? (
        <img
          className="category-button-icon"
          src={ArrRight}
          alt="nextCategory"
        />
      ) : (
        <img
          className="category-button-icon-reverse"
          src={ArrLeft}
          alt="preCategory"
        />
      )}
    </button>
  );
};

const Category = ({ categoryIndex, categoryName, categoryNum }) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const startCate = useRecoilValue(startCategory);
  const userCate = useRecoilValue(userCategory);
  const sort = useRecoilValue(sortBy);

  const changeFilter = () => {
    history.push(`?page=${1}&category=${categoryIndex}&sort=${sort}`);
  };

  return startCate <= categoryIndex ? (
    <button
      className={`category-button button-onclick-${
        parseInt(userCate, 10) === categoryIndex
      }`}
      type="button"
      onClick={changeFilter}
    >
      <div
        className={`${
          parseInt(userCate, 10) === categoryIndex
            ? "font-16-bold color-54"
            : "font-16 color-a4"
        } category-button-text`}
      >
        {categoryName} ({categoryNum})
      </div>
    </button>
  ) : (
    ``
  );
};

const CategoryFilter = () => {
  const setHiddenCate = useSetRecoilState(hiddenCategory);
  const startCate = useRecoilValue(startCategory);
  const entireCate = useRecoilValue(entireCategory);
  const [entireCateWidth, setEntireCateWidth] = useState([]);

  const toggleCategoryButton = () => {
    const categoryFileterWidth = document.querySelector(
      ".category-filter__list",
    ).offsetWidth;
    const categoryArrowWidth =
      document.querySelector(".pre-category").offsetWidth +
      document.querySelector(".next-category").offsetWidth;
    const categoryListWidth = categoryFileterWidth - categoryArrowWidth;
    const categoryButtonWidthSum =
      entireCateWidth.reduce((a, b) => a + b, 0) +
      36 * (entireCateWidth.length - 1);
    if (categoryListWidth >= categoryButtonWidthSum) setHiddenCate(false);
    else setHiddenCate(true);
  };

  const calcEntireWidth = () => {
    const categoryButton = document.getElementsByClassName("category-button");
    const categoryButtonWidth = Array.from(categoryButton).map(
      items => items.offsetWidth,
    );
    setEntireCateWidth(categoryButtonWidth);
  };

  useEffect(() => {
    calcEntireWidth();
  }, [startCate, entireCate]);

  useEffect(() => {
    toggleCategoryButton();
  }, [entireCateWidth]);

  useEffect(() => {
    window.addEventListener("resize", calcEntireWidth);
    return () => {
      window.removeEventListener("resize", calcEntireWidth);
    };
  }, [calcEntireWidth]);

  return (
    <div className="category-filter">
      <div className="category-filter__list">
        <PreCategory />
        <div className="categories">
          {entireCate.map((items, index) => (
            <Category
              categoryIndex={index}
              categoryName={items.name}
              categoryNum={items.count}
            />
          ))}
        </div>
        <NextCategory />
      </div>
      <div className="category-filter__line" />
    </div>
  );
};

export default CategoryFilter;
