import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import MainNewBook from "./MainNewBook";
import MainNewBookPagination from "./MainNewBookPagination";
import ArrLeft from "../../img/arrow_left.svg";
import ArrRight from "../../img/arrow_right.svg";

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

const MainNewBookList = ({ docs }) => {
  const [page, setPage] = useState(1);
  const [bookWidth, setBookWidth] = useState(200);
  const [transition, setTransition] = useState(true);
  const intervalId = useRef(0);

  const displayCount = Math.ceil(useWidth() / (bookWidth + 10));
  const books = [...docs.slice(-1), ...docs, ...docs.slice(0, displayCount)];

  useEffect(() => {
    if (window.innerWidth < 767 && bookWidth !== 100) setBookWidth(100);
    if (window.innerWidth >= 767 && bookWidth !== 200) setBookWidth(200);
  }, [window.innerWidth]);

  useEffect(() => {
    if (window.innerWidth < 767 && bookWidth !== 100) setBookWidth(100);
    if (window.innerWidth >= 767 && bookWidth !== 200) setBookWidth(200);
  }, [window.innerWidth]);

  const onNext = () => {
    const index = page;
    if (index === books.length - displayCount - 1) {
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
    if (index === 1) {
      index = books.length - displayCount;
      setTransition(false);
      setPage(index);
      setTimeout(() => {
        setTransition(true);
        setPage(index - 1);
      }, 3);
    } else setPage(index - 1);
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

  return (
    <div className="main-new__content">
      <button
        className="main-new__arrow"
        onClick={onPrev}
        type="button"
        onMouseEnter={pauseInterval}
        onMouseLeave={startInterval}
      >
        <img
          src={ArrLeft}
          alt=""
          style={{ width: bookWidth / 4, height: bookWidth * 1.5 + 20 }}
        />
      </button>
      <button
        className="main-new__arrow right"
        onClick={onNext}
        type="button"
        onMouseEnter={pauseInterval}
        onMouseLeave={startInterval}
      >
        <img
          src={ArrRight}
          alt=""
          style={{ width: bookWidth / 4, height: bookWidth * 1.5 + 20 }}
        />
      </button>
      <div className="main-new__booklist">
        <div
          className={`${transition && "main-new__books"}`}
          style={{
            transform: `translate(${
              +((bookWidth / 2) * 0.1) - (bookWidth + 20) * page * 0.1
            }rem)`,
          }}
          onMouseEnter={pauseInterval}
          onMouseLeave={startInterval}
        >
          {books.map(book => (
            <MainNewBook book={book} bookWidth={bookWidth} />
          ))}
        </div>
      </div>
      <MainNewBookPagination page={page} setPage={setPage} />
    </div>
  );
};

export default MainNewBookList;

MainNewBookList.propTypes = {
  docs: PropTypes.arrayOf(PropTypes.object).isRequired,
};
