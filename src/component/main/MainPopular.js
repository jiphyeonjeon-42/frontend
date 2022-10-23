import React, { useState } from "react";
import SubTitle from "../utils/SubTitle";
import MainPopularCenter from "./MainPopularCenter";
import MainPopularSide from "./MainPopularSide";
import useGetBooksInfoPopular from "../../api/books/useGetBooksInfoPopular";
import "../../css/MainPopular.css";

const MainPopular = () => {
  const [centerTop, setCenterTop] = useState(0);
  const { docs, Dialog } = useGetBooksInfoPopular();

  const left = docs.slice(centerTop - 3, centerTop);
  const center = () => {
    if (centerTop) return docs.slice(centerTop - 3, centerTop + 6);
    return [...docs.slice(0, 3), ...docs.slice(0, 6)];
  };
  const right = docs.slice(centerTop + 3, centerTop + 6);
  const onLeft = () => {
    if (centerTop === 0) return;
    setCenterTop(centerTop - 3);
  };
  const onRight = () => {
    if (centerTop === 27) return;
    setCenterTop(centerTop + 3);
  };

  const position = () => {
    return Math.round(centerTop / 3) * 10;
  };

  return (
    <section className="main__popular">
      <div className="main__popular__wrapper">
        <Dialog />
        <SubTitle
          subTitle="42일 인기 도서를 소개합니다"
          description="42서울 카뎃들이 42일 동안 가장 많이 본 책들은 무엇일까요?"
          alignItems="start"
        />
        <div className="main__popular__contents">
          <MainPopularCenter
            docs={center()}
            centerTop={centerTop}
            onLeft={onLeft}
            onRight={onRight}
          />
          <MainPopularSide books={left} onClick={onLeft} side="left" />
          <MainPopularSide books={right} onClick={onRight} side="right" />
          <div
            className="main__popular__pagination"
            style={{ left: `${position()}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default MainPopular;
