import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IMGERR from "../../img/image_onerror.svg";

const MainPopularCenter = ({ docs, centerTop, onLeft, onRight }) => {
  const [selected, setSelected] = useState(0);
  const [posX, setPosX] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  function linkToDetail(e) {
    if (posX) return;
    window.location = `/info/${e.currentTarget.id}`;
  }

  function changeSelected(e) {
    if (posX) return;
    setSelected(parseInt(e.currentTarget.value, 10));
  }

  function subtituteImg(e) {
    e.target.src = IMGERR;
  }

  function touchStart(e) {
    setPosX(e.touches[0].pageX);
  }
  function touchMove(e) {
    const move = posX - e.touches[0].pageX;
    if (centerTop || move > 0) setMoveX(move);
  }

  function touchEnd() {
    if (moveX > 30) onRight();
    else if (moveX < -30) onLeft();
    setMoveX(0);
  }

  function mouseMove(e) {
    if (!posX) return;
    const move = posX - e.clientX;
    if (centerTop || move > 0) setMoveX(move);
  }

  function mouseStart(e) {
    setPosX(e.clientX);
  }

  function mouseEnd(e) {
    if (!posX) return;
    const move = posX - e.clientX;
    if (centerTop || move < 0) setMoveX(move);
    if (move > 30) onRight();
    else if (move < -30) onLeft();
    setMoveX(0);
    setPosX(0);
  }

  useEffect(() => {
    const getWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", getWindowHeight);
    return () => {
      window.removeEventListener("resize", getWindowHeight);
    };
  }, [windowHeight]);

  const totalBooks = [docs.slice(0, 3), docs.slice(3, 6), docs.slice(6, 9)];

  return (
    <div className="main__popular__content">
      <div
        role="presentation"
        className="main__popular__center"
        onMouseDown={mouseStart}
        onMouseMove={mouseMove}
        onMouseUp={mouseEnd}
        onMouseLeave={mouseEnd}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        style={{
          transform: `translate(${
            ((windowHeight > 700 ? -750 : -640) - moveX) * 0.1
          }rem)`,
        }}
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
                onClick={selected === index ? linkToDetail : changeSelected}
                key={book.id}
                id={book.id}
              >
                <img
                  draggable="false"
                  src={book.image}
                  alt={book.title}
                  className={`${
                    selected === index && "selected"
                  } main__popular__basic-img`}
                  onError={subtituteImg}
                  value={index}
                />
                <div className="main__popular__summary">
                  <span
                    className={`main__popular__rank ${
                      windowHeight > 700 ? `font-48-bold` : `font-40-bold`
                    }`}
                  >
                    {book.rank}
                  </span>
                  <p
                    className={` ${
                      windowHeight > 700 ? `font-16-light` : `font-14-light`
                    } color-2d`}
                  >
                    #{book.category}
                  </p>
                  <p
                    className={`${
                      windowHeight > 700 ? `font-32-bold` : `font-24-bold`
                    } color-2d`}
                  >
                    {book.title}
                  </p>
                </div>
                <div
                  className={`${
                    selected !== index && "hidden"
                  } main__popular__detail ${
                    windowHeight > 700 ? `font-16-light` : `font-14-light`
                  }  color-2d`}
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
