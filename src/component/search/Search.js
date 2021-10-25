/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import Title from "../utils/Title";
import SubTitle from "../utils/SubTitle";
import SearchBar from "./SearchBar";
import Books from "./Books";
import Pagination from "./Pagination";
import BackGround from "../utils/BackGround";
import CategoryFilter from "./CategoryFilter";
import Sort from "./Sort";
import WishBook from "./WishBook";
import { searchWord } from "../../atom/searchWord";
import { useSearchInput } from "../../atom/useSearchInput";
import "../../css/Search.css";

const Search = ({ match, location }) => {
  const myRef = useRef(null);
  const setInputValue = useSetRecoilState(useSearchInput);
  const [userWord, setUserWord] = useRecoilState(searchWord);
  const [isLoading, setLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
  const [startCate, setStartCate] = useState(0);
  const [pageRange, setPageRange] = useState(0);
  const [isAvailable, setAvailable] = useState(false);
  const [userPage, setPage] = useState(1);
  const [userSort, setSort] = useState("");
  const [cateIndex, setCateIndex] = useState(0);
  const [userCateName, setCategoryName] = useState("");
  const [entireCate, setEntireCate] = useState([]);
  const [lastPage, setLastPage] = useState(1);

  const fetchBookList = async () => {
    const {
      data: { items, meta, categories },
    } = await axios.get(`${process.env.REACT_APP_API}/books/info/search`, {
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
    setLastPage(meta.totalPages > 0 ? meta.totalPages : 1);
  };

  useEffect(fetchBookList, [userWord, userPage, userSort, userCateName]);

  const returnQuery = (url, key) => {
    let query;
    const splitQuery = url.split(key);

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
      if (
        str === "accurate" ||
        str === "title" ||
        str === "new" ||
        str === "popular"
      )
        return true;
      return false;
    };

    const queryArr = query.split("&");
    let queryString = "";
    let queryPage = "1";
    let queryCateIndex = "0";
    let querySort = "accurate";

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < queryArr.length; i++) {
      if (isValid(queryArr[i], "string="))
        queryString = queryArr[i].split("string=")[1];
      else if (
        isValid(queryArr[i], "page=") &&
        isInteger(queryArr[i].split("page=")[1], 1)
      )
        queryPage = Math.min(queryArr[i].split("page=")[1], lastPage);
      else if (
        isValid(queryArr[i], "category=") &&
        isInteger(queryArr[i].split("category=")[1], 0)
      )
        queryCateIndex =
          queryArr[i].split("category=")[1] >= entireCate.length
            ? 0
            : queryArr[i].split("category=")[1];
      else if (
        isValid(queryArr[i], "sort=") &&
        isSort(queryArr[i].split("sort=")[1])
      )
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
  }, [match.params, location.search, entireCate, lastPage]);

  return (
    <main>
      <BackGround page="search" />
      <section className="search-title">
        <Title titleKorean="검색" titleEng="SEARCH" />
        <SearchBar
          setStartCate={setStartCate}
          setPageRange={setPageRange}
          setAvailable={setAvailable}
        />
      </section>
      <section className="search-section">
        <div className="search-subtitle" ref={myRef}>
          <SubTitle
            subTitle={`'${userWord}' 도서 검색 결과`}
            alignItems="start"
          />
        </div>
        <CategoryFilter
          userWord={userWord}
          userSort={userSort}
          userCate={cateIndex}
          entireCate={entireCate}
          startCate={startCate}
          setStartCate={setStartCate}
        />
        <Sort
          userWord={userWord}
          userSort={userSort}
          cateIndex={cateIndex}
          isAvailable={isAvailable}
          setAvailable={setAvailable}
        />
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <Books bookList={bookList} />
        )}
        <Pagination
          userWord={userWord}
          lastPage={lastPage}
          userPage={userPage}
          userSort={userSort}
          userCateIndex={cateIndex}
          pageRange={pageRange}
          setPageRange={setPageRange}
          myRef={myRef}
        />
      </section>
      <section className="wish-book-wraper">
        <WishBook />
      </section>
    </main>
  );
};

export default Search;
