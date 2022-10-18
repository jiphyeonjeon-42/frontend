import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SubTitle from "../utils/SubTitle";
import Books from "./Books";
import Pagination from "../utils/Pagination";
import SearchBanner from "./SearchBanner";
import CategoryFilter from "./CategoryFilter";
import Sort from "./Sort";
import WishBook from "./WishBook";
import MiniModal from "../utils/MiniModal";
import ModalContentsTitleWithMessage from "../utils/ModalContentsTitleWithMessage";
import getErrorMessage from "../../data/error";
import { searchWord } from "../../atom/searchWord";
import { useSearchInput } from "../../atom/useSearchInput";
import "../../css/Search.css";

const Search = () => {
  const myRef = useRef(null);
  const setInputValue = useSetRecoilState(useSearchInput);
  const [userWord, setUserWord] = useRecoilState(searchWord);
  const [isLoading, setLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
  const [userPage, setPage] = useState(1);
  const [userSort, setSort] = useState("title");
  const [cateIndex, setCateIndex] = useState(0);
  const [userCateName, setCategoryName] = useState("");
  const [entireCate, setEntireCate] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [errorCode, setErrorCode] = useState(-1);
  const [miniModal, setMiniModal] = useState(0);
  const location = useLocation();

  const closeMiniModal = () => {
    setMiniModal(0);
  };

  const fetchBookList = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/books/info/search`, {
        params: {
          query: userWord,
          page: userPage - 1,
          sort: userSort,
          category: userCateName,
          limit: 20,
        },
      })
      .then(res => {
        setBookList(res.data.items);
        setEntireCate(res.data.categories);
        setLoading(false);
        setLastPage(
          res.data.meta.totalPages > 0 ? res.data.meta.totalPages : 1,
        );
        setMiniModal(0);
        setErrorCode(-1);
      })
      .catch(error => {
        setMiniModal(1);
        setErrorCode(error.response.data.errorCode);
      });
  };

  useEffect(fetchBookList, [userWord, userPage, userSort, userCateName]);

  const returnQuery = (url, key) => {
    let query;
    const splitQuery = url.split(key);

    // eslint-disable-next-line prefer-destructuring
    if (splitQuery.length === 2) query = splitQuery[1];
    else if (splitQuery.length < 2) query = "";
    else query = splitQuery.slice(1).join(key);

    return query;
  };

  const queryOption = query => {
    const isValid = (str, include) => {
      if (
        str.includes(include) &&
        str.split(include).length === 2 &&
        str.split(include)[0] === ""
      )
        return true;
      return false;
    };

    const isInteger = (str, base) => {
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(str)) return false;
      if (parseFloat(str, 10) % 1 !== 0) return false;
      if (parseInt(str, 10) < base) return false;
      return true;
    };

    const isSort = str => {
      if (str === "title" || str === "new" || str === "popular") return true;
      return false;
    };

    const queryArr = query.split("&");
    let queryString = "";
    let queryPage = 1;
    let queryCateIndex = 0;
    let querySort = "title";

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < queryArr.length; i++) {
      if (isValid(queryArr[i], "string="))
        // eslint-disable-next-line prefer-destructuring
        queryString = queryArr[i].split("string=")[1];
      else if (
        isValid(queryArr[i], "page=") &&
        isInteger(queryArr[i].split("page=")[1], 1)
      )
        queryPage = Math.min(
          parseInt(queryArr[i].split("page=")[1], 10),
          lastPage,
        );
      else if (
        isValid(queryArr[i], "category=") &&
        isInteger(queryArr[i].split("category=")[1], 0)
      )
        queryCateIndex =
          queryArr[i].split("category=")[1] >= entireCate.length
            ? 0
            : parseInt(queryArr[i].split("category=")[1], 10);
      else if (
        isValid(queryArr[i], "sort=") &&
        isSort(queryArr[i].split("sort=")[1])
      )
        // eslint-disable-next-line prefer-destructuring
        querySort = queryArr[i].split("sort=")[1];
    }
    return [queryString, queryPage, queryCateIndex, querySort];
  };

  useEffect(() => {
    const query = returnQuery(location.search, "?");
    const [queryString, queryPage, queryCateIndex, querySort] =
      queryOption(query);
    setUserWord(decodeURIComponent(queryString));
    setInputValue(decodeURIComponent(queryString));
    setPage(queryPage);
    setSort(querySort);
    setCateIndex(queryCateIndex);
    if (parseInt(queryCateIndex, 10) === 0) setCategoryName("");
    else if (entireCate[parseInt(queryCateIndex, 10)] !== undefined)
      setCategoryName(entireCate[parseInt(queryCateIndex, 10)].name);
  }, [location.search, entireCate, lastPage]);

  const [title, content] = getErrorMessage(parseInt(errorCode, 10)).split(
    "\r\n",
  );

  return (
    <main>
      <SearchBanner />
      <section className="search-section">
        <div className="search-subtitle" ref={myRef}>
          <SubTitle
            subTitle={
              userWord === ""
                ? "전체 도서 목록"
                : `'${userWord}' 도서 검색 결과`
            }
            alignItems="start"
            description=""
          />
        </div>
        <CategoryFilter
          userWord={userWord}
          userSort={userSort}
          userCate={parseInt(cateIndex, 10)}
          entireCate={entireCate}
        />
        <div className="search-sort">
          <Sort
            userWord={userWord}
            userSort={userSort}
            cateIndex={parseInt(cateIndex, 10)}
          />
        </div>
        <Books bookList={bookList} isLoading={isLoading} />
        <Pagination
          lastPage={lastPage}
          page={parseInt(userPage, 10)}
          setPage={setPage}
          isReplaceUrl
          scrollRef={myRef}
        />
      </section>
      <section className="wish-book-wraper">
        <WishBook />
      </section>
      {miniModal && errorCode >= 0 ? (
        <MiniModal closeModal={closeMiniModal}>
          <ModalContentsTitleWithMessage
            closeModal={closeMiniModal}
            title={title}
            message={content}
          />
        </MiniModal>
      ) : (
        ""
      )}
    </main>
  );
};

export default Search;
