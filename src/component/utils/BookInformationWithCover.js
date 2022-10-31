import React from "react";
import PropTypes from "prop-types";
import Image from "./Image";
import "../../css/BookInformationWithCover.css";

const BookInformationWithCover = ({
  wrapperClassName,
  bookCoverImg,
  bookCoverAlt,
  children,
}) => {
  return (
    <div className={`book-info__wrapper ${wrapperClassName}`}>
      <div className="book-info__cover">
        <Image
          className="book-info__cover-img"
          src={bookCoverImg}
          alt={bookCoverAlt}
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
