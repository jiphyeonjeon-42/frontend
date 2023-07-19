import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../utils/Image";
import ArrLeftGray from "../../asset/img/arrow_left_gray.svg";
import ArrLeftBlack from "../../asset/img/arrow_left_black.svg";
import ArrRightGray from "../../asset/img/arrow_right_gray.svg";
import ArrRightBlack from "../../asset/img/arrow_right_black.svg";
import "../../asset/css/CategoryFilter.css";

const MARGIN_OF_CATEGORY_BUTTON = 36;
const EPSILON = 1;

type PreCategoryProps = {
  startOfScroll: boolean;
};

const PreCategory = ({ startOfScroll }: PreCategoryProps) => {
  const scrollToPre = () => {
    const categories = document.querySelector(".categories");
    if (categories) {
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
    }
  };

  return (
    <button className="pre-category" type="button" onClick={scrollToPre}>
      {startOfScroll ? (
        <Image
          className="category-button-icon"
          src={ArrLeftGray}
          alt="preCategory"
        />
      ) : (
        <Image
          className="category-button-icon"
          src={ArrLeftBlack}
          alt="preCategory"
        />
      )}
    </button>
  );
};

type NextCategoryProps = {
  endOfScroll: boolean;
};

const NextCategory = ({ endOfScroll }: NextCategoryProps) => {
  const scrollToNext = () => {
    const categories = document.querySelector<HTMLDivElement>(".categories");
    if (categories) {
      const categoriesScrollX = categories.scrollLeft;
      const categoriesOffsetWidth = categories.offsetWidth;
      const categoriesScrollWidth = categories.scrollWidth;
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
        left:
          sumOfCategory > endOfScrollWidth ? endOfScrollWidth : sumOfCategory,
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button className="next-category" type="button" onClick={scrollToNext}>
      {endOfScroll ? (
        <Image
          className="category-button-icon"
          src={ArrRightGray}
          alt="preCategory"
        />
      ) : (
        <Image
          className="category-button-icon"
          src={ArrRightBlack}
          alt="nextCategory"
        />
      )}
    </button>
  );
};

type CategoryProps = {
  userWord: string;
  userSort: string;
  userCate: number;
  categoryIndex: number;
  categoryName: string;
  categoryNum: number;
};

const Category = ({
  userWord,
  userSort,
  userCate,
  categoryIndex,
  categoryName,
  categoryNum,
}: CategoryProps) => {
  const navigate = useNavigate();

  const changeFilter = () => {
    navigate(
      `?search=${userWord}&page=${1}&category=${categoryName}&sort=${userSort}`,
    );
  };

  return (
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
        } category-button-text cateNum-${categoryIndex}`}
      >
        {categoryName} ({categoryNum})
      </div>
    </button>
  );
};

type CategoryFilterProps = {
  userWord: string;
  userSort: string;
  userCate: number;
  entireCate: { name: string; count: number }[];
};

const CategoryFilter = ({
  userWord,
  userSort,
  userCate,
  entireCate,
}: CategoryFilterProps) => {
  const [startOfScroll, setStartOfScroll] = useState(true);
  const [endOfScroll, setEndOfScroll] = useState(true);

  const setScrollState = () => {
    const categories = document.querySelector<HTMLDivElement>(".categories");
    if (categories) {
      const categoriesScrollX = categories.scrollLeft;
      const categoriesOffsetWidth = categories.offsetWidth;
      const categoriesScrollWidth = categories.scrollWidth;
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

export default CategoryFilter;
