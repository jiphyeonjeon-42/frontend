import React from "react";
import PropTypes from "prop-types";
import "../../css/MainPopularBook.css";

const MainPopularBook = ({ book, setMain }) => {
  function onMain() {
    setMain(book);
  }
  return (
    <button
      className="main-popular__booklist__book-button"
      type="button"
      value="wow"
      onClick={onMain}
    >
      <img
        className="main-popular__booklist__book-cover"
        src={book.image}
        alt={book.title}
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
