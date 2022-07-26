/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LinkToDetail from "../../img/link_to_detail.svg";
import "../../css/BookInfo.css";
import IMGERR from "../../img/image_onerror.svg";

const BookInfo = ({
  id,
  isbn,
  title,
  author,
  publisher,
  image,
  publishedAt,
  category,
  bread,
  lendingCnt,
}) => {
  const parseDate = publishedDate => {
    if (!publishedDate) return { year: null, month: null, day: null };
    const [year, month, day] = publishedDate.split("-");
    return { year, month, day };
  };

  const { year, month } = parseDate(publishedAt) ?? { year: 0, month: 0 };

  function subtituteImg(e) {
    e.target.src = IMGERR;
  }

  return (
    <div className="book-info-wraper">
      <Link
        className="book-info"
        to={{
          pathname: `/info/${id}`,
          state: {
            title,
            author,
            publisher,
            image,
            publishedAt,
            category,
            bread,
          },
        }}
      >
        <img
          className="book-info__image"
          src={image}
          alt={title}
          title={title}
          onError={subtituteImg}
        />
        <div className="book-info__info">
          <div className="book-info__title font-18-bold--letterspacing color-54">
            {title}
          </div>
          <div className="book-info__others font-16 color-54">
            <span>{author}</span>
            <span className="book-info__separator">|</span>
            <span>{publisher}</span>
            <span className="book-info__separator">|</span>
            <span>{category}</span>
          </div>
          <div className="book-info__published-at font-14 color-54">
            <span>발행연월</span>
            <span className="book-info__separator-half" />
            <span>
              {year && month ? `${year}년 ${parseInt(month, 10)}월` : "-"}
            </span>
          </div>
          <div className="book-info__isbn font-14 color-54">
            <span>표준부호</span>
            <span className="book-info__separator-half" />
            <span>{isbn}</span>
          </div>
          <div className="book-info__lendingCnt font-14 color-54">
            <span>대여가능</span>
            <span className="book-info__separator-half" />
            <span>{`${lendingCnt} 권`}</span>
          </div>
          <img
            className="book-info__link-icon"
            src={LinkToDetail}
            alt={title}
          />
        </div>
      </Link>
      <div className="book-info__line" />
    </div>
  );
};

BookInfo.propTypes = {
  id: PropTypes.number.isRequired,
  isbn: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  publishedAt: PropTypes.object,
  category: PropTypes.string.isRequired,
  bread: PropTypes.string.isRequired,
  lendingCnt: PropTypes.number.isRequired,
};

export default BookInfo;
