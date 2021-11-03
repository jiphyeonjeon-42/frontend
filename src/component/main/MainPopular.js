import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import popularList from "../../atom/popularList";
import popularMain from "../../atom/popularMain";
import SubTitle from "../utils/SubTitle";
import MainPopularBook from "./MainPopularBook";
import globalModal from "../../atom/globalModal";
import "../../css/MainPopular.css";

const MainPopluar = () => {
  const [page, setPage] = useState(0);
  const [docs, setDocs] = useRecoilState(popularList);
  const [main, setMain] = useRecoilState(popularMain);
  const setGlobalError = useSetRecoilState(globalModal);
  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/books/info/`, {
        params: {
          sort: "popular",
          limit: 9,
        },
      })
      .then(response => {
        const { items } = response.data;
        setDocs(items);
        setMain(items[0]);
      })
      .catch(error => {
        setGlobalError({
          view: true,
          error: `books/info/search=popular ${error.name} ${error.message}`,
        });
      });
  }, []);

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
  const transNum = -2142 - 16 + (206 + 32) * (docs.length - 3 * page);

  return (
    <section className="main-popular-wraper">
      <div className="main-popular">
        <SubTitle
          subTitle="이번 달 인기 도서를 소개합니다"
          description="집현전 사람들이 이번 달 가장 많이 본 책들은 무엇일까요?"
          alignItems="start"
        />
        <div className="main-popular__content">
          <Link
            to={{
              pathname: `/info/${main.id}`,
              state: {
                bread: "인기 도서",
              },
            }}
          >
            <div className="main-popular__cover">
              <img
                src={main.image}
                alt={main.title}
                className="main-popular__cover-img"
              />
              <div className="main-popular__cover-more font-20 color-ff">
                도서 자세히 보기
              </div>
            </div>
          </Link>
          <div className="main-popular__cover-detail">
            <div className="main-popular__description color-54">
              <span className="font-16-light color-2d ">#{main.category}</span>
              <span className="font-16-light color-2d margin-16">
                #{main.author}
              </span>
              <Link
                to={{
                  pathname: `/info/${main.id}`,
                  state: {
                    bread: "인기 도서",
                  },
                }}
              >
                <p className="main-popular__title font-32-bold color-2d">
                  {main.title}
                </p>
              </Link>
              <span className="font-16">출판사</span>
              <span className="font-16-light"> | {main.publisher}</span>
              <span className="main-popular__detail font-16">발행연도</span>
              <span className="font-16-light"> | {main.publishedAt}</span>
              <span className="main-popular__detail font-16">표준부호</span>
              <span className="font-16-light"> | {main.isbn}</span>
            </div>
            <div className="main-popular__booklist">
              <button
                className="main-popular__arrow"
                onClick={onPrev}
                type="button"
              >
                {" "}
              </button>
              <div className="main-popular__container">
                <div
                  className="main-popular__books"
                  style={{ transform: `translate(${transNum}px)` }}
                >
                  {docs.map(book => (
                    <MainPopularBook book={book} key={book.id} />
                  ))}
                </div>
              </div>
              <button
                className="main-popular__arrow right"
                onClick={onNext}
                type="button"
              >
                {" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPopluar;
