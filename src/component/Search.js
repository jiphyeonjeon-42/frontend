/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import Title from "./Title";
import SubTitle from "./SubTitle";
import SearchBar from "./SearchBar";
import Books from "./Books";
import Pagination from "./Pagination";
import BackGround from "./BackGround";
import CategoryFilter from "./CategoryFilter";
import Sort from "./Sort";
import WishBook from "./WishBook";
import { searchWord } from "../atom/searchWord";
import { useSearchInput } from "../atom/useSearchInput";
import "../css/Search.css";

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
  const [lastPage, setLastPage] = useState(0);

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
    setLastPage(meta.totalPages);
  };

  useEffect(fetchBookList, [userWord, userPage, userSort, userCateName]);

  useEffect(() => {
    const queryArr = location.search.split("?");
    const query = queryArr[queryArr.length - 1];
    const [queryString, queryPage, queryCate, querySort] = query.split("&");
    setUserWord(decodeURIComponent(queryString.split("string=")[1]));
    setInputValue(decodeURIComponent(queryString.split("string=")[1]));
    setPage(queryPage.split("=")[1]);
    setSort(querySort.split("=")[1]);
    setCateIndex(queryCate.split("=")[1]);
    if (parseInt(queryCate.split("=")[1], 10) === 0) setCategoryName("");
    else if (entireCate[queryCate.split("=")[1]] !== undefined)
      setCategoryName(entireCate[queryCate.split("=")[1]].name);
  }, [match.params, location.search, entireCate]);

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
          userSort={userSort}
          userCate={cateIndex}
          entireCate={entireCate}
          startCate={startCate}
          setStartCate={setStartCate}
        />
        <Sort
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
