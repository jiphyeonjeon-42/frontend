import React from "react";
import PropTypes from "prop-types";
import BookInfo from "./BookInfo";
import "../../css/Books.css";

const Books = ({ bookList, isLoading }) => {
  return (
    <section className="books">
      {isLoading ? (
        <div className="loader" />
      ) : (
        bookList.map(items => (
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
            lendingCnt={items.lendingCnt}
            category={items.category}
            bread="검색"
          />
        ))
      )}
    </section>
  );
};

Books.propTypes = {
  bookList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Books;
