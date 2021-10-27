import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import globalModal from "../../atom/globalModal";
import SubTitle from "../utils/SubTitle";
import ArrLeft from "../../img/arrow_left.svg";
import ArrRight from "../../img/arrow_right.svg";
import "../../css/MainNew.css";

function useWidth() {
  const [widthSize, setWidthSize] = useState(undefined);
  useEffect(() => {
    function handleSize() {
      setWidthSize(window.innerWidth);
    }
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }, []);
  return widthSize;
}

const MainNew = () => {
  const [docs, setDocs] = useState([]);
  const [page, setPage] = useState(1);
  const [transition, setTransition] = useState(true);
  const setGlobalError = useSetRecoilState(globalModal);
  const intervalId = useRef(0);
  const display = Math.ceil((useWidth() - 266) / 236);
  const shelf = [...docs.slice(-1), ...docs, ...docs.slice(0, display + 1)];

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/books/info/`, {
        params: {
          sort: "new",
          limit: 20,
        },
      })
      .then(response => {
        const { items } = response.data;
        setDocs([...items]);
      })
      .catch(error => {
        setGlobalError({
          view: true,
          error: `books/info/search=new ${error.name} ${error.message}`,
        });
      });
  }, []);

  const onNext = () => {
    const index = page;
    if (index === shelf.length - display - 2) {
      setTransition(false);
      setPage(0);
      setTimeout(() => {
        setTransition(true);
        setPage(1);
      }, 3);
    } else setPage(index + 1);
  };
  const onPrev = () => {
    let index = page;
    if (index === 0) {
      index = shelf.length - display - 2;
      setTransition(false);
      setPage(index);
      setTimeout(() => {
        setTransition(true);
        setPage(index - 1);
      }, 3);
    } else setPage(index - 1);
  };
  const onChapter = e => {
    setPage((e.target.innerText - 1) * 5);
  };
  const pauseInterval = () => {
    clearInterval(intervalId.current);
  };
  const startInterval = () => {
    clearInterval(intervalId.current);
    intervalId.current = setInterval(onNext, 2000);
  };

  useEffect(() => {
    clearInterval(intervalId.current);
    intervalId.current = setInterval(onNext, 2000);
    return () => clearInterval(intervalId.current);
  }, [page]);
  const transNum = -124 - 236 * shelf.length + 236 * (shelf.length - page);
  return (
    <section className="main-new">
      <div className="main-new__title-wrapper">
        <SubTitle
          subTitle="집현전에 새로 들어온 신작을 확인해보세요"
          description="책을 클릭하면 더 자세한 정보를 확인할 수 있습니다."
          alignItems="center"
        />
      </div>

      <div className="main-new__booklist">
        <button className="main-new__arrow" onClick={onPrev} type="button">
          <img src={ArrLeft} alt="" />
        </button>
        <button
          className="main-new__arrow right"
          onClick={onNext}
          type="button"
        >
          <img src={ArrRight} alt="" />
        </button>
        <div
          className={`${transition && "main-new__books"}`}
          style={{ transform: `translate(${transNum}px)` }}
          onMouseEnter={pauseInterval}
          onMouseLeave={startInterval}
        >
          {shelf.map(item => (
            <div className="main-new__book">
              <Link
                to={{
                  pathname: `/info/${item.id}`,
                  state: {
                    bread: "신간 도서",
                  },
                }}
              >
                <img
                  className="main-new__book-img"
                  src={item.image}
                  alt="new"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="main-new__books_pagination">
        <button
          type="button"
          className={`${
            (Math.floor(page / 5) === 0 || Math.floor(page / 5) === 4) &&
            "selected"
          } main-new__books_pag_circle`}
          onClick={onChapter}
        >
          1
        </button>
        <button
          type="button"
          className={`${
            Math.floor(page / 5) === 1 && "selected"
          } main-new__books_pag_circle`}
          onClick={onChapter}
        >
          2
        </button>
        <button
          type="button"
          className={`${
            Math.floor(page / 5) === 2 && "selected"
          } main-new__books_pag_circle`}
          onClick={onChapter}
        >
          3
        </button>
        <button
          type="button"
          className={`${
            Math.floor(page / 5) === 3 && "selected"
          } main-new__books_pag_circle`}
          onClick={onChapter}
        >
          4
        </button>
      </div>
    </section>
  );
};

export default MainNew;
