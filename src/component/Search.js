/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import Title from "./Title";
import SubTitle from "./SubTitle";
import SearchBar, { useSearchInput } from "./SearchBar";
import Books from "./Books";
import Pagination, { currentPage, pageRangeState } from "./Pagination";
import BackGround from "./BackGround";
import "../css/Search.css";

export const searchWord = atom({ key: "searchWord", default: "" });

const Search = ({ match }) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const [subTitle, setSubTitle] = useRecoilState(searchWord);
  const setPageRange = useSetRecoilState(pageRangeState);
  const setPage = useSetRecoilState(currentPage);
  const setInputValue = useSetRecoilState(useSearchInput);

  const handleSearchSumbit = event => {
    event.preventDefault();
    setPageRange(0);
    setPage(1);
    const searchForm = document.getElementById("search-form");
    const searchInputValue = searchForm.querySelector("#search-input").value;
    history.push(`/search/${searchInputValue}`);
  };

  useEffect(() => {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", handleSearchSumbit);
    return () => searchForm.removeEventListener("submit", handleSearchSumbit);
  }, []);

  useEffect(() => {
    console.log(match.params.word);
    setSubTitle(match.params.word);
    setInputValue(match.params.word);
  }, [match.params]);

  return (
    <main>
      <BackGround page="search" />
      <section className="search-title">
        <Title titleKorean="검색" titleEng="SEARCH" />
        <SearchBar />
      </section>
      <section className="search-section-wraper">
        <div className="search-section">
          <div className="search-subtitle">
            <SubTitle
              subTitle={`'${subTitle}' 도서 검색 결과`}
              alignItems="start"
            />
          </div>
          <Books userWord={subTitle} />
          <Pagination />
        </div>
      </section>
    </main>
  );
};

export default Search;
