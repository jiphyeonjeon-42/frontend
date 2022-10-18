import React from "react";
import PropTypes from "prop-types";
import IMGERR from "../../img/image_onerror.svg";

const MainPopularSide = ({ books, onClick, side }) => {
  function subtituteImg(e) {
    e.target.src = IMGERR;
  }
  return (
    <button
      className={`main__popular__${
        side === "left" ? "left" : "right"
      } main__popular__content main__popular__side`}
      type="button"
      onClick={onClick}
    >
      {books.map(book => (
        <div className="main__popular__basic-book" key={book.id}>
          <img
            src={book.image}
            alt={book.title}
            className="main__popular__basic-img"
            onError={subtituteImg}
          />
        </div>
      ))}
    </button>
  );
};

export default MainPopularSide;

MainPopularSide.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
  side: PropTypes.string.isRequired,
};
