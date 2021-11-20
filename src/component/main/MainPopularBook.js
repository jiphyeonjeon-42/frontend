import React from "react";
import PropTypes from "prop-types";
import "../../css/MainPopularBook.css";
import IMGERR from "../../img/image_onerror.svg";

const MainPopularBook = ({ book, setMain }) => {
  function onMain() {
    setMain(book);
  }
  function subtituteImg(e) {
    e.target.src = IMGERR;
  }
  return (
    <button
      className="main-popular__booklist__book-button"
      type="button"
      onClick={onMain}
    >
      <img
        className="main-popular__booklist__book-cover"
        src={book.image}
        alt={book.title}
        onError={subtituteImg}
      />
      <p className="font-16-bold color-2d main-popular__booklist__title">
        {book.title}
      </p>
      <p className="font-16 color-54 ">
        {book.author} | {book.publisher}
      </p>
    </button>
  );
};

export default MainPopularBook;

MainPopularBook.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    publisher: PropTypes.string,
  }).isRequired,
  setMain: PropTypes.func.isRequired,
};
