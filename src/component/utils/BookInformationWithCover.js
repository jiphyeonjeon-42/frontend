import React from "react";
import PropTypes from "prop-types";
import "../../css/BookInformationWithCover.css";
import IMGERR from "../../img/image_onerror.svg";

const BookInformationWithCover = ({
  wrapperClassName,
  bookCoverImg,
  bookCoverAlt,
  children,
}) => {
  function subtituteImg(e) {
    e.target.src = IMGERR;
  }
  return (
    <div className={`book-info__wrapper ${wrapperClassName}`}>
      <div className="book-info__cover">
        <img
          className="book-info__cover-img"
          src={bookCoverImg}
          alt={bookCoverAlt}
          onError={subtituteImg}
        />
      </div>
      <div className="book-info__detail">{children}</div>
    </div>
  );
};

export default BookInformationWithCover;

BookInformationWithCover.propTypes = {
  wrapperClassName: PropTypes.string,
  bookCoverImg: PropTypes.string.isRequired,
  bookCoverAlt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

BookInformationWithCover.defaultProps = {
  wrapperClassName: "",
};
