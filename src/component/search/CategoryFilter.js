import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ArrLeftGray from "../../img/arrow_left_gray.svg";
import ArrLeftBlack from "../../img/arrow_left_black.svg";
import ArrRightGray from "../../img/arrow_right_gray.svg";
import ArrRightBlack from "../../img/arrow_right_black.svg";
import "../../css/CategoryFilter.css";

const MARGIN_OF_CATEGORY_BUTTON = 36;
const EPSILON = 1;

const PreCategory = ({ startOfScroll }) => {
  const scrollToPre = () => {
    const categories = document.querySelector(".categories");
    const categoriesScrollX = categories.scrollLeft;

    const categoryButton = document.getElementsByClassName("category-button");
    const categoryButtonWidth = Array.from(categoryButton).map(
      items => items.clientWidth + MARGIN_OF_CATEGORY_BUTTON,
    );

    let sumOfCategory = 0;
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < categoryButtonWidth.length; index++) {
      if (
        sumOfCategory + categoryButtonWidth[index] + EPSILON >=
        categoriesScrollX
      ) {
        break;
      }
      sumOfCategory += categoryButtonWidth[index];
    }
    categories.scrollTo({ left: sumOfCategory, top: 0, behavior: "smooth" });
  };

  return (
    <button className="pre-category" type="button" onClick={scrollToPre}>
      {startOfScroll ? (
        <img
          className="category-button-icon"
          src={ArrLeftGray}
          alt="preCategory"
        />
      ) : (
        <img
          className="category-button-icon"
          src={ArrLeftBlack}
          alt="preCategory"
        />
      )}
    </button>
  );
};

const NextCategory = ({ endOfScroll }) => {
  const scrollToNext = () => {
    const categories = document.querySelector(".categories");
    const categoriesScrollX = categories.scrollLeft;
    const categoriesOffsetWidth =
      document.querySelector(".categories").offsetWidth;
    const categoriesScrollWidth =
      document.querySelector(".categories").scrollWidth;
    const endOfScrollWidth = categoriesScrollWidth - categoriesOffsetWidth;

    const categoryButton = document.getElementsByClassName("category-button");
    const categoryButtonWidth = Array.from(categoryButton).map(
      items => items.clientWidth + MARGIN_OF_CATEGORY_BUTTON,
    );

    let sumOfCategory = 0;
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < categoryButtonWidth.length; index++) {
      sumOfCategory += categoryButtonWidth[index];
      if (sumOfCategory - EPSILON > categoriesScrollX) {
        break;
      }
    }
    categories.scrollTo({
      left: sumOfCategory > endOfScrollWidth ? endOfScrollWidth : sumOfCategory,
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className="next-category" type="button" onClick={scrollToNext}>
      {endOfScroll ? (
        <img
          className="category-button-icon"
          src={ArrRightGray}
          alt="preCategory"
        />
      ) : (
        <img
          className="category-button-icon"
          src={ArrRightBlack}
          alt="nextCategory"
        />
      )}
    </button>
  );
};

const Category = ({
  userWord,
  userSort,
  userCate,
  categoryIndex,
  categoryName,
  categoryNum,
}) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();

  const changeFilter = () => {
    history.push(
      `?string=${userWord}&page=${1}&category=${categoryIndex}&sort=${userSort}`,
    );
  };

  return (
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
        } category-button-text cateNum-${categoryIndex}`}
      >
        {categoryName} ({categoryNum})
      </div>
    </button>
  );
};

const CategoryFilter = ({ userWord, userSort, userCate, entireCate }) => {
  const [startOfScroll, setStartOfScroll] = useState(true);
  const [endOfScroll, setEndOfScroll] = useState(true);

  const setScrollState = () => {
    const categoriesScrollX = document.querySelector(".categories").scrollLeft;
    const categoriesOffsetWidth =
      document.querySelector(".categories").offsetWidth;
    const categoriesScrollWidth =
      document.querySelector(".categories").scrollWidth;
    const endOfScrollWidth = categoriesScrollWidth - categoriesOffsetWidth;

    if (categoriesScrollX === 0) {
      setStartOfScroll(true);
    } else {
      setStartOfScroll(false);
    }

    if (categoriesScrollX === endOfScrollWidth) {
      setEndOfScroll(true);
    } else {
      setEndOfScroll(false);
    }
  };

  useEffect(() => {
    setScrollState();
    window.addEventListener("resize", setScrollState);
    return () => {
      window.removeEventListener("resize", setScrollState);
    };
  }, [setScrollState]);

  return (
    <div className="category-filter">
      <div className="category-filter__list">
        <PreCategory startOfScroll={startOfScroll} />
        <div className="categories" onScroll={setScrollState}>
          {entireCate.map((items, index) => (
            <Category
              key={items.name}
              userWord={userWord}
              userSort={userSort}
              userCate={userCate}
              categoryIndex={index}
              categoryName={items.name}
              categoryNum={items.count}
            />
          ))}
        </div>
        <NextCategory endOfScroll={endOfScroll} />
      </div>
      <div className="category-filter__line" />
    </div>
  );
};

PreCategory.propTypes = {
  startOfScroll: PropTypes.bool.isRequired,
};

NextCategory.propTypes = {
  endOfScroll: PropTypes.bool.isRequired,
};

Category.propTypes = {
  userWord: PropTypes.string.isRequired,
  userSort: PropTypes.string.isRequired,
  userCate: PropTypes.number.isRequired,
  categoryIndex: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  categoryNum: PropTypes.number.isRequired,
};

CategoryFilter.propTypes = {
  userWord: PropTypes.string.isRequired,
  userSort: PropTypes.string.isRequired,
  userCate: PropTypes.number.isRequired,
  entireCate: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoryFilter;
