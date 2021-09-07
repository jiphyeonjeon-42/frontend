import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LinkToDetail from "../img/link_to_detail.svg";
import "../css/BookInfo.css";

const BookInfo = ({
  id,
  title,
  author,
  publisher,
  image,
  publishedAt,
  category,
}) => {
  return (
    <div className="book-info-wraper">
      <div className="book-info">
        <img
          className="book-info__image"
          src={image}
          alt={title}
          title={title}
        />
        <div className="book-info__available color-ff font-14">대여가능</div>
        <div className="book-info__info">
          <div className="book-info__title font-18-bold--letterspacing color-54">
            {title}
          </div>
          <div className="book-info__others font-16 color-54">
            <span>
              {author}
              {/* {author[0]}
              {author.length > 1 ? ` 외 ${author.length - 1}명 ` : ``} */}
            </span>
            <span className="book-info__separator">|</span>
            <span>{publisher}</span>
            <span className="book-info__separator">|</span>
            <span>{category}</span>
          </div>
          <div className="book-info__published-at font-16 color-54">
            <span>발행연도</span>
            <span className="book-info__separator-half" />
            <span>{publishedAt}</span>
          </div>
          <div className="book-info__isbn font-16 color-54">
            <span>표준부호</span>
            <span className="book-info__separator-half" />
            <span>{id}</span>
          </div>
          <div className="book-info__link">
            <Link
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
              <img
                className="book-info__link-icon"
                src={LinkToDetail}
                alt={title}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="book-info__line" />
    </div>
  );
};

BookInfo.propTypes = {
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

export default BookInfo;
