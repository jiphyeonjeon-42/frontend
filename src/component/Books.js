import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import PropTypes from "prop-types";
import BookInfo from "./BookInfo";
import "../css/Books.css";
import { REST_API_KEY } from "../api";

export const pageEndState = atom({ key: "pageEndState", default: true });

const useLoading = initLoading => {
  const [isLoading, setLoading] = useState(initLoading);
  return { isLoading, setLoading };
};

const useBookList = initBookList => {
  const [bookList, setBookList] = useState(initBookList);
  return { bookList, setBookList };
};

const useIsEnd = () => {
  const [isEnd, setIsEnd] = useRecoilState(pageEndState);
  return { isEnd, setIsEnd };
};

const Books = ({ userWord, userPage }) => {
  const { isLoading, setLoading } = useLoading(true);
  const { bookList, setBookList } = useBookList([]);
  const { isEnd, setIsEnd } = useIsEnd(false);

  const getBookList = async () => {
    const {
      data: { meta, documents },
    } = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
      params: {
        query: userWord,
        // eslint-disable-next-line object-shorthand
        page: userPage,
        size: 20,
      },
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
      //   params: {
      //     word: searchString,
      //     page: pageNum,
      //   },
    });
    setIsEnd(meta.is_end);
    // if (page === 1) {
    //   setBookList(documents);
    // } else {
    //   setBookList(bookList.concat(documents));
    // }
    setBookList(documents);
    console.log(isEnd);
    setLoading(false);
  };

  useEffect(getBookList, [userWord, userPage]);

  return (
    <section>
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : (
        <div className="books">
          {bookList.map(items => (
            <BookInfo
              className="bookinfo"
              key={parseInt(items.isbn, 10)}
              id={parseInt(items.isbn, 10)}
              title={items.title}
              author={items.authors}
              publisher={items.publisher}
              image={items.thumbnail}
              publishedAt={`${parseInt(
                items.datetime.slice(0, 4),
                10,
              )}.${parseInt(items.datetime.slice(5, 7), 10)}`}
              category={items.status}
              // key={items.id}
              // id={parseInt(items.isbn)}
              // title={items.title}
              // author={items.author}
              // publisher={items.publisher}
              // image={items.image}
              // publishedAt={items.publishedAt}
            />
          ))}
        </div>
      )}
    </section>
  );
};

Books.propTypes = {
  userWord: PropTypes.string.isRequired,
  userPage: PropTypes.number.isRequired,
};

export default Books;
