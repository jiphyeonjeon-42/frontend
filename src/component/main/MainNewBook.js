import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Image from "../utils/Image";

const MainNewBook = ({ book, bookWidth }) => {
  return (
    <div
      className="main-new__book"
      style={{ width: bookWidth, height: bookWidth * 1.5 }}
    >
      <Link to={`/info/${book.id}`} state={{ bread: "신간 도서" }}>
        <Image
          width={`${bookWidth}`}
          height={`${bookWidth * 1.5}`}
          src={book.image}
          alt="new"
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
    title: PropTypes.string,
  }).isRequired,
  bookWidth: PropTypes.number.isRequired,
};
