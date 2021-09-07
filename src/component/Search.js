/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import Title from "./Title";
import SubTitle from "./SubTitle";
import SearchBar, { useSearchInput } from "./SearchBar";
// eslint-disable-next-line import/no-cycle
import Books from "./Books";
import Pagination, { pageRangeState } from "./Pagination";
import BackGround from "./BackGround";
import "../css/Search.css";
import CategoryFilter from "./CategoryFilter";

export const searchWord = atom({ key: "searchWord", default: "" });
export const currentPage = atom({ key: "currentPage", default: 1 });

const Search = ({ match, location }) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const [subTitle, setSubTitle] = useRecoilState(searchWord);
  const [page, setPage] = useRecoilState(currentPage);
  const setPageRange = useSetRecoilState(pageRangeState);
  const setInputValue = useSetRecoilState(useSearchInput);

  const handleSearchSumbit = event => {
    event.preventDefault();
    setPageRange(0);
    const searchForm = document.getElementById("search-form");
    const searchInputValue = searchForm.querySelector("#search-input").value;
    history.push(`/search/${searchInputValue}?${1}`);
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
    // console.log(queryArr);
    // console.log(query);
    setSubTitle(match.params.word);
    setInputValue(match.params.word);
    setPage(query);
  }, [match.params, location.search]);

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
        <Books userWord={subTitle} userPage={page} />
        <Pagination current={page} />
      </section>
      <section className="wish-book-wraper" />
    </main>
  );
};

export default Search;
