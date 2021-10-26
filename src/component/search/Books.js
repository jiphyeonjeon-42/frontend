import React from "react";
import PropTypes from "prop-types";
import BookInfo from "./BookInfo";
import "../../css/Books.css";

const Books = ({ bookList }) => {
  return (
    <section className="books">
      {bookList.map(items => (
        <BookInfo
          className="bookinfo"
          key={items.id}
          id={items.id}
          isbn={items.isbn}
          title={items.title}
          author={items.author}
          publisher={items.publisher}
          image={items.image}
          publishedAt={items.publishedAt}
          category={items.category}
          bread="검색"
        />
      ))}
    </section>
  );
};

Books.propTypes = {
  bookList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Books;
