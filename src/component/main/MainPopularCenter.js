import React, { useState } from "react";
import PropTypes from "prop-types";
import IMGERR from "../../img/image_onerror.svg";

const MainPopularCenter = ({ docs, centerTop, onLeft, onRight }) => {
  const [selected, setSelected] = useState(0);
  const [posX, setPosX] = useState(0);
  const [moveX, setMoveX] = useState(0);

  const changeSelected = e => {
    setSelected(parseInt(e.currentTarget.value, 10));
    console.log(centerTop);
  };

  function subtituteImg(e) {
    e.target.src = IMGERR;
  }

  function touchStart(e) {
    e.preventDefault();
    setPosX(e.touches[0].pageX);
  }

  function touchMove(e) {
    e.preventDefault();
    const move = posX - e.touches[0].pageX;
    if (centerTop || move > 0) setMoveX(move);
  }

  function touchEnd(e) {
    e.preventDefault();
    if (moveX > 300) onRight();
    else if (moveX < -300) onLeft();
    setMoveX(0);
  }

  const totalBooks = [docs.slice(0, 3), docs.slice(3, 6), docs.slice(6, 9)];
  const scroll = () => {
    return `${-770 - moveX}px`;
  };
  return (
    <div className="main__popular__content">
      <div
        className="main__popular__center"
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        style={{ marginLeft: scroll() }}
      >
        {totalBooks.map(books => (
          <div className="main__popular__books">
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
        ))}
      </div>
    </div>
  );
};

export default MainPopularCenter;

MainPopularCenter.propTypes = {
  docs: PropTypes.arrayOf(PropTypes.object).isRequired,
  centerTop: PropTypes.number.isRequired,
  onLeft: PropTypes.func.isRequired,
  onRight: PropTypes.func.isRequired,
};
