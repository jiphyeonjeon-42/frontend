import React, { useEffect, useState } from "react";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import PropTypes from "prop-types";
import BookInfo from "./BookInfo";
// eslint-disable-next-line import/no-cycle
import { userCategoryName } from "./CategoryFilter";
import "../css/Books.css";

export const entireCategory = atom({ key: "entireCategory", default: [] });
export const lastPageNum = atom({ key: "lastPageNum", default: 0 });

const useLoading = initLoading => {
  const [isLoading, setLoading] = useState(initLoading);
  return { isLoading, setLoading };
};

const useBookList = initBookList => {
  const [bookList, setBookList] = useState(initBookList);
  return { bookList, setBookList };
};

const Books = ({ userWord, userPage, userSort }) => {
  const { isLoading, setLoading } = useLoading(true);
  const { bookList, setBookList } = useBookList([]);
  const setEntireCate = useSetRecoilState(entireCategory);
  const userCateName = useRecoilValue(userCategoryName);
  //   const [currentword] = useRecoilValue(searchWord);
  const setLastPage = useSetRecoilState(lastPageNum);

  const getBookList = async () => {
    const {
      data: { items, meta, categories },
    } = await axios.get(`${process.env.REACT_APP_API}/books/search`, {
      //   params: {
      //     query: userWord,
      //     // eslint-disable-next-line object-shorthand
      //     page: userPage,
      //     size: 20,
      //   },
      //   headers: {
      //     Authorization: `KakaoAK ${REST_API_KEY}`,
      //   },
      params: {
        query: userWord,
        page: userPage,
        sort: userSort,
        category: userCateName,
        limit: 20,
      },
    });
    setBookList(items);
    setEntireCate(categories);
    setLoading(false);
    setLastPage(meta.totalPages);
  };

  useEffect(getBookList, [userWord, userPage, userSort, userCateName]);

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
              key={items.id}
              id={items.id}
              isbn={items.isbn}
              title={items.title}
              author={items.author}
              publisher={items.publisher}
              image={items.image}
              publishedAt={`${items.publishedAt.split("-")[0]}.${
                items.publishedAt.split("-")[1]
              }`}
              category={items.category}
              bread="검색"
            />
          ))}
        </div>
      )}
    </section>
  );
};

Books.propTypes = {
  userWord: PropTypes.string.isRequired,
  userSort: PropTypes.string.isRequired,
  userPage: PropTypes.number.isRequired,
};

export default Books;
