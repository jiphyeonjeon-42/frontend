import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
// import { currentPage } from "./Search";
import { useSearchInput } from "./SearchBar";
import { pageRangeState } from "./Pagination";
import BackGround from "./BackGround";
import MainHome from "./MainHome";
import MainNew from "./MainNew";
import MainPopular from "./MainPopular";
import { userCategoryName } from "./CategoryFilter";
import "../css/Main.css";

const Main = () => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const setPageRange = useSetRecoilState(pageRangeState);
  const setInputValue = useSetRecoilState(useSearchInput);
  const setCategoryName = useSetRecoilState(userCategoryName);

  setInputValue("");

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
