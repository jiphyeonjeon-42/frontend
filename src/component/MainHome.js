import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import ScrollIcon from "../img/scroll-icon.svg";
import { searchWord } from "./Search";
import SearchBar, { useSearchInput } from "./SearchBar";
import { currentPage, pageRangeState } from "./Pagination";
import "../css/MainHome.css";

const Main = () => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const setSearchWord = useSetRecoilState(searchWord);
  const setPageRange = useSetRecoilState(pageRangeState);
  const setPage = useSetRecoilState(currentPage);
  const setInputValue = useSetRecoilState(useSearchInput);

  setInputValue("");

  const handleSearchSumbit = event => {
    event.preventDefault();
    const searchForm = document.getElementById("search-form");
    const searchInputValue = searchForm.querySelector("#search-input").value;
    setSearchWord(searchInputValue);
    setPageRange(0);
    setPage(1);
    history.push(`/search/${searchInputValue}`);
  };

  useEffect(() => {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", handleSearchSumbit);
    return () => searchForm.removeEventListener("submit", handleSearchSumbit);
  }, []);
  return (
    <section className="main-bg">
      <div className="main-home">
        <div className="main-home__line" />
        <span className="main-home__greet font-48 color-ff">
          어서오세요, 집현전입니다.
        </span>
        <span className="main-home__guide font-16 color-d5">
          집현전에 원하는 책이 있다면, 검색창에 도서를 입력해주세요.
        </span>
        <SearchBar />
        <div className="main-home__scroll">
          <p className="font-12 color-d5">스크롤을 내려주세요</p>
          <img
            src={ScrollIcon}
            className="main-home__scroll_icon"
            alt="scroll-icon"
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
