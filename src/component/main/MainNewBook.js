import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MainNewBook = ({ book }) => {
  return (
    <div className="main-new__book">
      <Link
        to={{
          pathname: `/info/${book.id}`,
          state: {
            bread: "신간 도서",
          },
        }}
      >
        <img className="main-new__book-img" src={book.image} alt="new" />
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
};
