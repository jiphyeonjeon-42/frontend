import React, { useEffect, useState } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import Bookinfo from "./BookInfo";
import "../css/Books.css";
// eslint-disable-next-line import/no-cycle
import { pageRangeState } from "./Pagination";

const REST_API_KEY = "a73179e66ae3cdbd45b31c84ac3c8df4";
let searchForm = document.getElementById("search-form");

export const pageEndState = atom({ key: "pageEndState", default: true });
export const searchWord = atom({ key: "searchWord", default: "" });
export const bookListState = atom({ key: "bookListState", default: [] });
export const currentPage = atom({ key: "currentPage", default: 1 });

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

const useWord = () => {
  const [word, setWord] = useRecoilState(searchWord);
  return { word, setWord };
};

const useIsEnd = () => {
  const [isEnd, setIsEnd] = useRecoilState(pageEndState);
  return { isEnd, setIsEnd };
};

const Books = () => {
  const setPageRange = useSetRecoilState(pageRangeState);
  // eslint-disable-next-line prefer-const
  //   let history = useHistory();
  const { isLoading, setLoading } = useLoading(true);
  const { bookList, setBookList } = useBookList([]);
  const { page, setPage } = usePage(1);
  const { word, setWord } = useWord("");
  const { isEnd, setIsEnd } = useIsEnd(false);

  //   const infiniteScroll = async () => {
  //     const { documentElement, body } = document;

  //     const scrollHeight = Math.max(
  //       documentElement.scrollHeight,
  //       body.scrollHeight,
  //     );

  //     const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);

  //     const clientHeight = Math.min(
  //       documentElement.clientHeight,
  //       body.clientHeight,
  //     );

  //     if (scrollTop + clientHeight >= scrollHeight) {
  //       if (isEnd === false) {
  //         setPage(page + 1);
  //       }
  //     }
  //   };

  const handleSearchSumbit = event => {
    // history.push("/");
    event.preventDefault();
    searchForm = document.getElementById("search-form");
    setPage(1);
    setPageRange(0);
    // setIsEnd(false);
    setWord(searchForm.querySelector("input").value);
    console.log(word);
  };

  const getBookList = async () => {
    const {
      data: { meta, documents },
    } = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
      params: {
        query: word,
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
    console.log(bookList, isEnd);
    setLoading(false);
    console.log(isLoading);
  };

  useEffect(getBookList, [word, page]);

  //   useEffect(() => {
  //     window.addEventListener("scroll", infiniteScroll, true);
  //     return () => window.removeEventListener("scroll", infiniteScroll, true);
  //   });

  useEffect(() => {
    searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", handleSearchSumbit);
    return () => searchForm.removeEventListener("submit", handleSearchSumbit);
  });

  return (
    <section>
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : (
        <div className="books">
          {bookList.map(items => (
            <Bookinfo
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

export default Books;
