import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import PropTypes from "prop-types";
import BookInfo from "./BookInfo";
import { currentPage } from "./Pagination";
import "../css/Books.css";

const REST_API_KEY = "670dea7916052ba57c8202334cfafd53";
export const pageEndState = atom({ key: "pageEndState", default: true });
// export const searchWord = atom({ key: "searchWord", default: "" });
export const bookListState = atom({ key: "bookListState", default: [] });

const useLoading = initLoading => {
  const [isLoading, setLoading] = useState(initLoading);
  return { isLoading, setLoading };
};

const useBookList = () => {
  const [bookList, setBookList] = useState(bookListState);
  return { bookList, setBookList };
};

const usePage = () => {
  const [page, setPage] = useRecoilState(currentPage);
  return { page, setPage };
};

const useIsEnd = () => {
  const [isEnd, setIsEnd] = useRecoilState(pageEndState);
  return { isEnd, setIsEnd };
};

const Books = ({ userWord, userPage }) => {
  const { isLoading, setLoading } = useLoading(true);
  const { bookList, setBookList } = useBookList(bookListState);
  const { page } = usePage(userPage);
  const { isEnd, setIsEnd } = useIsEnd(false);

  const getBookList = async () => {
    const {
      data: { meta, documents },
    } = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
      params: {
        query: userWord,
        // eslint-disable-next-line object-shorthand
        page: page,
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
    // console.log(bookList, isLoading);
  };

  useEffect(getBookList, [userWord, page]);

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
              )}년 ${parseInt(items.datetime.slice(5, 7), 10)}월`}
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
