import React, { useEffect, useState } from "react";
import axios from "axios";
import Bookinfo from "./BookInfo";
import "../css/Books.css";

const REST_API_KEY = "";
let searchForm = document.getElementById("search-form");

const useLoading = initLoading => {
  const [isLoading, setLoading] = useState(initLoading);
  return { isLoading, setLoading };
};

const useBookList = initBookList => {
  const [bookList, setBookList] = useState(initBookList);
  return { bookList, setBookList };
};

const usePage = initPage => {
  const [page, setPage] = useState(initPage);
  return { page, setPage };
};

const useWord = initWord => {
  const [word, setWord] = useState(initWord);
  return { word, setWord };
};

const useIsEnd = initIsEnd => {
  const [isEnd, setIsEnd] = useState(initIsEnd);
  return { isEnd, setIsEnd };
};

const Books = () => {
  const { isLoading, setLoading } = useLoading(true);
  const { bookList, setBookList } = useBookList([]);
  const { page, setPage } = usePage(1);
  const { word, setWord } = useWord("파이썬");
  const { isEnd, setIsEnd } = useIsEnd(false);

  const infiniteScroll = async () => {
    const { documentElement, body } = document;

    const scrollHeight = Math.max(
      documentElement.scrollHeight,
      body.scrollHeight,
    );

    const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);

    const clientHeight = Math.min(
      documentElement.clientHeight,
      body.clientHeight,
    );

    if (scrollTop + clientHeight >= scrollHeight) {
      if (isEnd === false) {
        setPage(page + 1);
      }
    }
  };

  const handleSearchSumbit = event => {
    event.preventDefault();
    searchForm = document.getElementById("search-form");
    setPage(1);
    setIsEnd(false);
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
    if (page === 1) {
      setBookList(documents);
    } else {
      setBookList(bookList.concat(documents));
    }
    console.log(bookList, isEnd);
    setLoading(false);
    console.log(isLoading);
  };

  useEffect(getBookList, [word, page]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true);
    return () => window.removeEventListener("scroll", infiniteScroll, true);
  });

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
              publishedAt={parseInt(items.datetime, 10)}
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
