import PropTypes from "prop-types";
import React from "react";
import InquireBoxItem from "../utils/InquireBoxItem";
import InquireBoxLine from "../utils/InquireBoxLine";

const BookStockCheckedListLine = ({ book }) => {
  return (
    <InquireBoxLine>
      <InquireBoxItem keyString="bookId" value={book.bookId} />
      <InquireBoxItem keyString="callSign" value={book.callSign} />
      <InquireBoxItem keyString="category" value={book.category} />
      <InquireBoxItem keyString="title" value={book.title} />
    </InquireBoxLine>
  );
};

export default BookStockCheckedListLine;

BookStockCheckedListLine.propTypes = {
  book: PropTypes.shape.isRequired,
};
