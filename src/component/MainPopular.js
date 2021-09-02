import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import popularList from "../atom/popularList";
import popularMain from "../atom/popularMain";
import SubTitle from "./SubTitle";
import MainPopularBook from "./MainPopularBook";
import ARRLEFT from "../img/arrow_left_circle.svg";
import ARRRIGHT from "../img/arrow_right_circle.svg";
import "../css/MainPopular.css";

const REST_API_KEY = "a73179e66ae3cdbd45b31c84ac3c8df4";

const MainPopluar = () => {
  const [page, setPage] = useState(0);
  const [docs, setDocs] = useRecoilState(popularList);
  const [main, setMain] = useRecoilState(popularMain);
  const getData = async () => {
    const {
      data: { documents },
    } = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
      params: {
        query: "인기",
        sort: "recency",
        size: 9,
      },
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    });
    setDocs(documents);
    setMain(documents[0]);
  };
  useEffect(getData, []);

  const onNext = () => {
    let index = page;
    if (index === 2) {
      index = -1;
    }
    index += 1;
    setPage(index);
  };

  const onPrev = () => {
    let index = page;
    if (index === 0) {
      index = 3;
    }
    index -= 1;
    setPage(index);
  };
  const transNum = -2142 + (206 + 32) * (docs.length - 3 * page);

  return (
    <section className="main-popular">
      <SubTitle
        subTitle="이번 달 인기 도서를 소개합니다"
        description="집현전 사람들이 이번 달 가장 많이 본 책들은 무엇일까요?"
        alignItems="start"
      />
      <div className="main-popular__content">
        <div className="main-popular__cover">
          <img
            src={main.thumbnail}
            alt={main.title}
            className="main-popular__cover-img"
          />
          <div className="main-popular__cover-more font-20 color-ff">
            도서 자세히 보기
          </div>
        </div>
        <div className="main-popular__cover-detail">
          <div className="main-popular__description color-54">
            <span className="font-16-light color-2d">#{main.title}</span>
            <span className="font-16-light color-2d">#{main.author}</span>
            <p className="main-popular__title font-32-bold color-2d">
              {main.title}
            </p>
            <span className="font-16">출판사</span>
            <span className="font-16-light"> | {main.publisher}</span>
            <span className="main-popular__detail font-16">발행연도</span>
            <span className="font-16-light"> | {main.datetime}</span>
            <span className="main-popular__detail font-16">표준부호</span>
            <span className="font-16-light"> | {main.isbn}</span>
          </div>
          <div className="main-popular__booklist">
            <button
              className="main-popular__arrow"
              onClick={onPrev}
              type="button"
            >
              <img src={ARRLEFT} alt="" />
            </button>
            <div className="main-popular__container">
              <div
                className="main-popular__books"
                style={{ transform: `translate(${transNum}px)` }}
              >
                {docs.map(book => (
                  <MainPopularBook book={book} />
                ))}
              </div>
            </div>
            <button
              className="main-popular__arrow"
              onClick={onNext}
              type="button"
            >
              <img src={ARRRIGHT} alt="" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPopluar;
