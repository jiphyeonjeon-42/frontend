import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import IMGERR from "../../img/image_onerror.svg";

const MainNewBook = ({ book, bookSize }) => {
  function subtituteImg(e) {
    e.target.src = IMGERR;
  }
  return (
    <div
      className="main-new__book"
      style={{ width: bookSize, height: bookSize * 1.5 }}
    >
      <Link
        to={{
          pathname: `/info/${book.id}`,
          state: {
            bread: "신간 도서",
          },
        }}
      >
        <img
          style={{ width: bookSize, height: bookSize * 1.5 }}
          className="main-new__book-img"
          src={book.image}
          alt="new"
          onError={subtituteImg}
        />
      </Link>
    </div>
  );
};

export default MainNewBook;

MainNewBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
  bookSize: PropTypes.number.isRequired,
};
