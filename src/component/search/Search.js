import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import PropTypes from "prop-types";
import SubTitle from "../utils/SubTitle";
import Books from "./Books";
import Pagination from "./Pagination";
import SearchBanner from "./SearchBanner";
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
  const [pageRange, setPageRange] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [isAvailable, setAvailable] = useState(false);
  const [userPage, setPage] = useState(1);
  const [userSort, setSort] = useState("title");
  const [cateIndex, setCateIndex] = useState(0);
  const [userCateName, setCategoryName] = useState("");
  const [entireCate, setEntireCate] = useState([]);
  const [lastPage, setLastPage] = useState(1);

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
      })
      .catch(error => {
        console.log(error);
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
    setPageRange(parseInt((queryPage - 1) / 5, 10));
    setSort(querySort);
    setCateIndex(queryCateIndex);
    if (parseInt(queryCateIndex, 10) === 0) setCategoryName("");
    else if (entireCate[parseInt(queryCateIndex, 10)] !== undefined)
      setCategoryName(entireCate[parseInt(queryCateIndex, 10)].name);
  }, [match.params, location.search, entireCate, lastPage]);

  return (
    <main>
      <SearchBanner setPageRange={setPageRange} setAvailable={setAvailable} />
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
        <div className="search-sort-available">
          <Sort
            userWord={userWord}
            userSort={userSort}
            cateIndex={parseInt(cateIndex, 10)}
          />
          {/* <Available isAvailable={isAvailable} setAvailable={setAvailable} /> */}
        </div>
        <Books bookList={bookList} isLoading={isLoading} />
        <Pagination
          userWord={userWord}
          lastPage={lastPage}
          userPage={parseInt(userPage, 10)}
          userSort={userSort}
          userCateIndex={parseInt(cateIndex, 10)}
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

Search.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};

export default Search;
