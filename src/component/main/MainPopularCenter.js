import React, { useState } from "react";
import PropTypes from "prop-types";
import IMGERR from "../../img/image_onerror.svg";

const MainPopularCenter = ({ books, centerTop }) => {
  const [selected, setSelected] = useState(0);

  const changeSelected = e => {
    setSelected(parseInt(e.currentTarget.value, 10));
  };

  function subtituteImg(e) {
    e.target.src = IMGERR;
  }
  return (
    <div
      className={`${centerTop === 0 && "margin-220"} main__popular__content`}
    >
      {books.map((book, index) => (
        <button
          className={`${
            selected === index && "selected"
          } main__popular__basic-book center`}
          value={index}
          type="button"
          onClick={changeSelected}
          key={book.id}
        >
          <img
            src={book.image}
            alt={book.title}
            className={`${
              selected === index && "selected"
            } main__popular__basic-img`}
            onError={subtituteImg}
            value={index}
          />
          <div className="main__popular__summary">
            <span className="main__popular__rank font-48-bold">
              {book.rank}
            </span>
            <p className="font-16-light color-2d"> #{book.category}</p>
            <p className="font-32-bold color-2d">{book.title}</p>
          </div>
          <div
            className={`${
              selected !== index && "hidden"
            } main__popular__detail font-16-light color-2d`}
          >
            <p>작가 | {book.author}</p>
            <p>출판사 | {book.publisher}</p>
            <p>발행연도 | {book.publishedAt}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MainPopularCenter;

MainPopularCenter.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  centerTop: PropTypes.number.isRequired,
};
