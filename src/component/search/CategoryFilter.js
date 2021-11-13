import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ArrLeft from "../../img/arrow_left_black.svg";
import ArrRight from "../../img/arrow_right_black.svg";
import "../../css/CategoryFilter.css";

const PreCategory = ({ startCate, setStartCate }) => {
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

const NextCategory = ({ hiddenCate, startCate, setStartCate }) => {
  const slideRight = () => {
    if (hiddenCate) {
      const startCateText = document.querySelector(`.cateNum-${startCate}`);
      console.log(startCateText.width);
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

const CategoryFilter = ({
  userWord,
  startCate,
  setStartCate,
  userSort,
  userCate,
  entireCate,
}) => {
  const [hiddenCate, setHiddenCate] = useState(false);
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

  useEffect(calcEntireWidth, [startCate, entireCate]);

  useEffect(toggleCategoryButton, [entireCateWidth]);

  useEffect(() => {
    window.addEventListener("resize", calcEntireWidth);
    return () => {
      window.removeEventListener("resize", calcEntireWidth);
    };
  }, [calcEntireWidth]);

  return (
    <div className="category-filter">
      <div className="category-filter__list">
        <PreCategory startCate={startCate} setStartCate={setStartCate} />
        <div className="categories">
          {entireCate.map((items, index) =>
            startCate <= index ? (
              <Category
                key={items.name}
                userWord={userWord}
                userSort={userSort}
                userCate={userCate}
                categoryIndex={index}
                categoryName={items.name}
                categoryNum={items.count}
              />
            ) : null,
          )}
        </div>
        <NextCategory
          startCate={startCate}
          setStartCate={setStartCate}
          hiddenCate={hiddenCate}
        />
      </div>
      <div className="category-filter__line" />
    </div>
  );
};

PreCategory.propTypes = {
  startCate: PropTypes.number.isRequired,
  setStartCate: PropTypes.func.isRequired,
};

NextCategory.propTypes = {
  hiddenCate: PropTypes.bool.isRequired,
  startCate: PropTypes.number.isRequired,
  setStartCate: PropTypes.func.isRequired,
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
  startCate: PropTypes.number.isRequired,
  setStartCate: PropTypes.func.isRequired,
  userSort: PropTypes.string.isRequired,
  userCate: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  entireCate: PropTypes.array.isRequired,
};

export default CategoryFilter;
