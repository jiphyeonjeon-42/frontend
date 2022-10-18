import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import IMGERR from "../../img/image_onerror.svg";

const MainNewBook = ({ book, bookWidth }) => {
  function subtituteImg(e) {
    e.target.src = IMGERR;
  }
  return (
    <div
      className="main-new__book"
      style={{ width: bookWidth, height: bookWidth * 1.5 }}
    >
      <Link to={`/info/${book.id}`} state={{ bread: "신간 도서" }}>
        {book.image ? (
          <img
            style={{ width: bookWidth, height: bookWidth * 1.5 }}
            src={book.image}
            alt="new"
            onError={subtituteImg}
          />
        ) : (
          <p className="main-new__book-sub-img">{book.title}</p>
        )}
      </Link>
    </div>
  );
};

export default MainNewBook;

MainNewBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  bookWidth: PropTypes.number.isRequired,
};
