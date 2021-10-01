/* eslint-disable react/prop-types */
import React from "react";
import BookInfo from "./BookInfo";
import "../css/Books.css";

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

export default Books;
