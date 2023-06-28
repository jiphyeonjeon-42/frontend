import { useState, useEffect, useRef } from "react";
import MainNewBook from "./MainNewBook";
import MainNewBookPagination from "./MainNewBookPagination";
import Image from "../utils/Image";
import ArrLeft from "../../asset/img/arrow_left.svg";
import ArrRight from "../../asset/img/arrow_right.svg";

const mobileWidth = 100;
const pcWidth = 200;

type Props = {
  docs: object[];
};

const MainNewBookList = ({ docs }: Props) => {
  const [page, setPage] = useState(1);
  const [bookWidth, setBookWidth] = useState(pcWidth);
  const [transition, setTransition] = useState(true);
  const [displayCount, setDisplayCount] = useState(0);
  const intervalId = useRef(0);

  useEffect(() => {
    function handleSize() {
      const width = window.innerWidth < 767 ? mobileWidth : pcWidth;
      if (width !== bookWidth) setBookWidth(width);
      const count = Math.ceil(window.innerWidth / (width * 1.1));
      if (count !== displayCount) setDisplayCount(count);
    }
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }, [bookWidth, displayCount]);

  const books = [...docs.slice(-1), ...docs, ...docs.slice(0, displayCount)];
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
        <Image
          src={ArrLeft}
          alt=""
          width={bookWidth / 4}
          height={bookWidth * 1.5 + 20}
        />
      </button>
      <button
        className="main-new__arrow right"
        onClick={onNext}
        type="button"
        onMouseEnter={pauseInterval}
        onMouseLeave={startInterval}
      >
        <Image
          src={ArrRight}
          alt=""
          width={bookWidth / 4}
          height={bookWidth * 1.5 + 20}
        />
      </button>
      <div className="main-new__booklist">
        <div
          className={`${transition && "main-new__books"}`}
          style={{
            transform: `translate(${
              +((bookWidth / 2) * 0.1) - bookWidth * 1.1 * page * 0.1
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
