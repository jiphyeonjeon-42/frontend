import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { searchWord } from "./Search";
import { useSearchInput } from "./SearchBar";
import { currentPage, pageRangeState } from "./Pagination";
import BackGround from "./BackGround";
import MainHome from "./MainHome";
import MainNew from "./MainNew";
import MainPopular from "./MainPopular";
import "../css/Main.css";

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
    <main className="main-wrapper">
      <BackGround page="main" />
      <MainHome />
      <MainNew />
      <MainPopular />
    </main>
  );
};

export default Main;
