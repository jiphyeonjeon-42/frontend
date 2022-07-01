import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import MainNewBook from "./MainNewBook";
import MainNewBookPagination from "./MainNewBookPagination";
import ArrLeft from "../../img/arrow_left.svg";
import ArrRight from "../../img/arrow_right.svg";

const MainNewBookList = ({ books, display }) => {
  const [page, setPage] = useState(1);
  const [transition, setTransition] = useState(true);
  const intervalId = useRef(0);

  const onNext = () => {
    const index = page;
    if (index === books.length - display - 2) {
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
      index = books.length - display - 2;
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
      <button className="main-new__arrow" onClick={onPrev} type="button">
        <img src={ArrLeft} alt="" />
      </button>
      <button className="main-new__arrow right" onClick={onNext} type="button">
        <img src={ArrRight} alt="" />
      </button>{" "}
      <div className="main-new__booklist">
        <div
          className={`${transition && "main-new__books"}`}
          style={{ transform: `translate(${-92 - 236 * page * 0.1}rem)` }}
          onMouseEnter={pauseInterval}
          onMouseLeave={startInterval}
        >
          {books.map(book => (
            <MainNewBook book={book} />
          ))}
        </div>
      </div>
      <MainNewBookPagination page={page} setPage={setPage} />
    </div>
  );
};

export default MainNewBookList;

MainNewBookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  display: PropTypes.number.isRequired,
};
