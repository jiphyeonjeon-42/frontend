import { useEffect, useRef, useState } from "react";
import Image from "../utils/Image";
import Category from "./Category";
import ArrLeftGray from "../../asset/img/arrow_left_gray.svg";
import ArrLeftBlack from "../../asset/img/arrow_left_black.svg";
import ArrRightGray from "../../asset/img/arrow_right_gray.svg";
import ArrRightBlack from "../../asset/img/arrow_right_black.svg";
import "../../asset/css/CategoryFilter.css";

type Props = {
  selectedCategory: number;
  categoryList: { name: string; count: number }[];
};

const CategoryFilter = ({ selectedCategory, categoryList }: Props) => {
  const categoriesRef = useRef<HTMLDivElement>(null);
  // categoriesRef의 스크롤이 처음이거나 끝인지 판단하는 state
  const [scrollPosition, setScrollPosition] = useState({
    isScrollAtStart: true,
    isScrollAtEnd: true,
  });

  const updateScrollPosition = () => {
    const target = categoriesRef.current;
    if (target) {
      const endOfScroll = target.scrollWidth - target.offsetWidth;
      setScrollPosition({
        isScrollAtStart: target.scrollLeft === 0,
        isScrollAtEnd: target.scrollLeft === endOfScroll,
      });
    }
  };

  useEffect(() => {
    updateScrollPosition();
    // 윈도우 창 크기가 변할 때마다 updateScrollPosition 함수를 실행
    window.addEventListener("resize", updateScrollPosition);
    return () => {
      window.removeEventListener("resize", updateScrollPosition);
    };
  }, [categoriesRef]);

  const scrollTo = (direction: "prev" | "next") => {
    if (categoriesRef.current) {
      const childElements = Array.from(categoriesRef.current.children);

      // categories의 왼쪽 경계값 기준
      const edge = categoriesRef.current.getBoundingClientRect().left;
      const target =
        direction === "prev"
          ? childElements
              // 경계보다 작은 left값을 가진 마지막 요소
              .filter(e => Math.ceil(e.getBoundingClientRect().left) < edge)
              .slice(-1)[0]
          : childElements
              // 경계보다 큰 left값을 가진 첫번째 요소
              .filter(e => Math.floor(e.getBoundingClientRect().left) > edge)
              .slice()[0];

      // 해당 요소로 가로 스크롤 부드럽게 이동
      target?.scrollIntoView({
        inline: "start",
        block: "nearest",
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="category-filter">
      <div className="category-filter__list">
        <button
          className="pre-category"
          type="button"
          onClick={() => scrollTo("prev")}
        >
          <Image
            className="category-button-icon"
            src={scrollPosition.isScrollAtStart ? ArrLeftGray : ArrLeftBlack}
            alt="preCategory"
          />
        </button>
        <div
          className="categories"
          onScroll={updateScrollPosition}
          ref={categoriesRef}
        >
          {categoryList.map((items, index) => (
            <Category
              key={items.name}
              name={items.name}
              count={items.count}
              isSelected={selectedCategory === index}
            />
          ))}
        </div>
        <button
          className="next-category"
          type="button"
          onMouseUp={() => scrollTo("next")}
        >
          <Image
            className="category-button-icon"
            src={scrollPosition.isScrollAtEnd ? ArrRightGray : ArrRightBlack}
            alt="nextCategory"
          />
        </button>
      </div>
      <div className="category-filter__line" />
    </div>
  );
};

export default CategoryFilter;
