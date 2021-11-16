import React, { useState } from "react";
import PropTypes from "prop-types";
import MainPopularBook from "./MainPopularBook";

const MainPopularBookList = ({ docs, setMain }) => {
  const [page, setPage] = useState(0);

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
  const transNum = -32 - 3 * 238 * page;

  return (
    <div className="main-popular__booklist">
      <button className="main-popular__arrow" onClick={onPrev} type="button">
        {" "}
      </button>
      <div className="main-popular__container">
        <div
          className="main-popular__books"
          style={{ transform: `translate(${transNum}px)` }}
        >
          {docs.map(book => (
            <MainPopularBook book={book} key={book.id} setMain={setMain} />
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
  );
};

export default MainPopularBookList;

MainPopularBookList.propTypes = {
  docs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setMain: PropTypes.func.isRequired,
};
