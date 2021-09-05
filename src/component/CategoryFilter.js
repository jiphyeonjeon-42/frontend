/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import ArrLeft from "../img/arrow_left_black.svg";
import ArrRight from "../img/arrow_right_black.svg";
import Sort from "./Sort";
import "../css/CategoryFilter.css";

const userCategory = atom({ key: "userCategory", default: 0 });
const startCategory = atom({ key: "startCategory", default: 0 });
const HiddenCategory = atom({ key: "HiddenCategory", default: true });

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
  const hiddenCate = useRecoilValue(HiddenCategory);

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
  //   const isEnd = true;
  const [userCate, setCate] = useRecoilState(userCategory);
  const startCate = useRecoilValue(startCategory);
  const changeFilter = () => {
    setCate(categoryIndex);
  };
  return startCate <= categoryIndex ? (
    <button
      className={`category-button button-onclick-${userCate === categoryIndex}`}
      type="button"
      onClick={changeFilter}
    >
      <div
        className={`${
          userCate === categoryIndex
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
  const setCate = useSetRecoilState(userCategory);
  const setHiddenCate = useSetRecoilState(HiddenCategory);
  const [startCate, setStartCate] = useRecoilState(startCategory);
  const [entireCategory, setEntireCategory] = useState([]);

  const toggleCategoryButton = () => {
    const categoryFileterWidth = document.querySelector(
      ".category-filter__list",
    ).offsetWidth;
    const categoryArrowWidth =
      document.querySelector(".pre-category").offsetWidth +
      document.querySelector(".next-category").offsetWidth;
    const categoryButtonWidth = entireCategory.slice(startCate);
    const categoryListWidth = categoryFileterWidth - categoryArrowWidth;
    const categoryButtonWidthSum =
      categoryButtonWidth.reduce((a, b) => a + b, 0) +
      36 * (categoryButtonWidth.length - 1);
    if (
      startCate > 0 &&
      entireCategory.slice(startCate - 1).reduce((a, b) => a + b, 0) +
        36 * categoryButtonWidth.length <
        categoryListWidth
    )
      setStartCate(startCate - 1);
    if (categoryListWidth >= categoryButtonWidthSum) setHiddenCate(false);
    else setHiddenCate(true);
  };

  useEffect(() => {
    setCate(0);
    const categoryButton = document.getElementsByClassName("category-button");
    const categoryButtonWidth = Array.from(categoryButton).map(
      items => items.offsetWidth,
    );
    setEntireCategory(categoryButtonWidth);
  }, []);

  useEffect(() => {
    toggleCategoryButton();
  }, [startCate, entireCategory]);

  useEffect(() => {
    window.addEventListener("resize", toggleCategoryButton);
    return () => {
      window.removeEventListener("resize", toggleCategoryButton);
    };
  }, [toggleCategoryButton]);

  return (
    <div className="category-filter">
      <div className="category-filter__list">
        <PreCategory />
        <div className="categories">
          <Category categoryIndex={0} categoryName="전체" categoryNum={20} />
          <Category categoryIndex={1} categoryName="데이터1" categoryNum={10} />
          <Category categoryIndex={2} categoryName="데이터2" categoryNum={10} />
          <Category categoryIndex={3} categoryName="데이터3" categoryNum={10} />
          <Category categoryIndex={4} categoryName="데이터4" categoryNum={10} />
          <Category categoryIndex={5} categoryName="데이터5" categoryNum={10} />
          <Category categoryIndex={6} categoryName="데이터6" categoryNum={10} />
          <Category categoryIndex={7} categoryName="데이터7" categoryNum={10} />
          {/* <Category categoryName="데이터7" categoryNum={10} onClick="false" /> */}
        </div>
        <NextCategory />
      </div>
      <div className="category-filter__line" />
      <Sort />
    </div>
  );
};

export default CategoryFilter;
