import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/BookInfo.css";

const Bookinfo = ({
  id,
  title,
  author,
  publisher,
  image,
  publishedAt,
  category,
}) => {
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
          category,
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
          <h5 className="book-info__title">{title}</h5>
          {/* <h6 className="book-info__author">{author}</h6> */}
          <h6 className="book-info__author">
            {author[0]}
            {author.length > 1 ? ` 외 ${author.length - 1}명 ` : " "}|{" "}
            {publisher}
          </h6>
          <h6 className="book-info__publish">{publishedAt}</h6>
          <div className="book-info__cate">
            <span className="book-info__category">#{category}</span>
          </div>
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
  publishedAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Bookinfo;
