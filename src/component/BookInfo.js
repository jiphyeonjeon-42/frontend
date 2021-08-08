import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/BookInfo.css";

const Bookinfo = ({ id, title, author, publisher, image, publishedAt }) => {
  return (
    <Link
      className="book-info__link"
      to={{
        pathname: `/info/${id}`,
        state: {
          title,
          author,
          publisher,
          image,
          publishedAt,
        },
      }}
    >
      <div className="book-info">
        <img
          className="book-info__image"
          src={image}
          alt={title}
          title={title}
        />

        <div className="book-info__info">
          <h4 className="book-info__title">{title}</h4>
          {/* <h6 className="book-info__author">{author}</h6> */}
          <div className="book-info__author">
            {author.map(who => (
              <h6 className="book-info__author">{who} </h6>
            ))}
          </div>
          <h6 className="book-info__publish">
            {publisher} | {publishedAt}
          </h6>
        </div>
      </div>
    </Link>
  );
};

Bookinfo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  author: PropTypes.arrayOf(PropTypes.string.isRequired),
  //   author: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  publishedAt: PropTypes.number.isRequired,
};

export default Bookinfo;
