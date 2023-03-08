import React from "react";
import PropTypes from "prop-types";
import Image from "./Image";
import "../../css/BookDetailView.css";

const BookDetailView = ({ book, bookInfoDetailUI, bookDetailUI, bottomUI }) => {
  return (
    <div className="book__detail__wrarpper">
      <p className="book__detail__title">도서정보</p>
      <div className="book__detail__book-info">
        <Image
          className="book__detail__book-cover"
          src={book.image}
          alt={book.title}
        />
        <div className="book__detail__details">{bookInfoDetailUI}</div>
      </div>
      {bookDetailUI ? (
        <div className="book__detail__book">
          <p>도서관리정보</p>
          <div className="book__detail__details">{bookDetailUI}</div>
        </div>
      ) : null}
      {bottomUI}
    </div>
  );
};

export default BookDetailView;

BookDetailView.propTypes = {
  book: PropTypes.shape().isRequired,
  bookInfoDetailUI: PropTypes.node.isRequired,
  bookDetailUI: PropTypes.node,
  bottomUI: PropTypes.node.isRequired,
};

BookDetailView.defaultProps = {
  bookDetailUI: undefined,
};
