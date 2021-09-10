/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import Title from "./Title";
import SubTitle from "./SubTitle";
import SearchBar, { useSearchInput } from "./SearchBar";
// eslint-disable-next-line import/no-cycle
import Books, { entireCategory } from "./Books";
import Pagination, { pageRangeState, currentPage } from "./Pagination";
import BackGround from "./BackGround";
import "../css/Search.css";
import CategoryFilter, {
  userCategory,
  userCategoryName,
} from "./CategoryFilter";
import Sort, { sortBy } from "./Sort";

export const searchWord = atom({ key: "searchWord", default: "" });

const Search = ({ match, location }) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const [subTitle, setSubTitle] = useRecoilState(searchWord);
  const [page, setPage] = useRecoilState(currentPage);
  const [sort, setSort] = useRecoilState(sortBy);
  const setCate = useSetRecoilState(userCategory);
  const setPageRange = useSetRecoilState(pageRangeState);
  const setInputValue = useSetRecoilState(useSearchInput);
  const setCategoryName = useSetRecoilState(userCategoryName);
  const entireCate = useRecoilValue(entireCategory);

  const handleSearchSumbit = event => {
    event.preventDefault();
    setPageRange(0);
    setCategoryName("");
    const searchForm = document.getElementById("search-form");
    const searchInputValue = searchForm.querySelector("#search-input").value;
    history.push(
      `/search/${searchInputValue}?page=${1}&category=${0}&sort=accurate`,
    );
  };

  useEffect(() => {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", handleSearchSumbit);
    return () => searchForm.removeEventListener("submit", handleSearchSumbit);
  }, []);

  useEffect(() => {
    console.log(match);
    const queryArr = location.search.split("?");
    const query = queryArr[queryArr.length - 1];
    const [queryPage, queryCate, querySort] = query.split("&");
    setSubTitle(match.params.word);
    setInputValue(match.params.word);
    setPage(queryPage.split("=")[1]);
    setSort(querySort.split("=")[1]);
    setCate(queryCate.split("=")[1]);
    if (parseInt(queryCate.split("=")[1], 10) === 0) setCategoryName("");
    else if (entireCate[queryCate.split("=")[1]] === undefined)
      console.log(entireCate);
    else setCategoryName(entireCate[queryCate.split("=")[1]].name);
  }, [match.params, location.search, entireCate]);

  return (
    <main>
      <BackGround page="search" />
      <section className="search-title">
        <Title titleKorean="검색" titleEng="SEARCH" />
        <SearchBar />
      </section>
      <section className="search-section">
        <div className="search-subtitle">
          <SubTitle
            subTitle={`'${subTitle}' 도서 검색 결과`}
            alignItems="start"
          />
        </div>
        <CategoryFilter />
        <Sort />
        <Books userWord={subTitle} userPage={page} userSort={sort} />
        <Pagination />
      </section>
      <section className="wish-book-wraper" />
    </main>
  );
};

export default Search;
