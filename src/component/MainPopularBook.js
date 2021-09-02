import React from "react";
import PropTypes from "prop-types";
import { useSetRecoilState } from "recoil";
import popularMain from "../atom/popularMain";
import "../css/MainPopularBook.css";

const MainPopularBook = ({ book }) => {
  const setMain = useSetRecoilState(popularMain);
  const onMain = e => {
    console.log(e);
    setMain(book);
  };

  return (
    <button
      className="main-popular__booklist__book-button"
      type="button"
      value="wow"
      onClick={onMain}
    >
      <img
        className="main-popular__booklist__book-cover"
        src={book.thumbnail}
        alt={book.title}
      />
      <p className="font-16-bold color-2d main-popular__booklist__title">
        {book.title}
      </p>
      <p className="font-16 color-54 ">
        {book.authors[0]} | {book.publisher}
      </p>
    </button>
  );
};

export default MainPopularBook;

MainPopularBook.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    authors: PropTypes.oneOfType({
      0: PropTypes.string,
    }),
    publisher: PropTypes.string,
  }).isRequired,
};
