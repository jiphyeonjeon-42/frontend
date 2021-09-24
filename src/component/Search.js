/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Title from "./Title";
import SubTitle from "./SubTitle";
import SearchBar from "./SearchBar";
import Books from "./Books";
import Pagination from "./Pagination";
import { currentPage } from "../atom/page";
import BackGround from "./BackGround";
import CategoryFilter from "./CategoryFilter";
import {
  entireCategory,
  userCategory,
  userCategoryName,
} from "../atom/categories";
import { sortBy } from "../atom/sortBy";
import { searchWord } from "../atom/searchWord";
import { useSearchInput } from "../atom/useSearchInput";
import Sort from "./Sort";
import WishBook from "./WishBook";
import "../css/Search.css";

// export const searchWord = atom({ key: "searchWord", default: "" });

const Search = ({ match, location }) => {
  const [subTitle, setSubTitle] = useRecoilState(searchWord);
  const myRef = useRef(null);
  const setPage = useSetRecoilState(currentPage);
  const setSort = useSetRecoilState(sortBy);
  const setCate = useSetRecoilState(userCategory);
  const setInputValue = useSetRecoilState(useSearchInput);
  const setCategoryName = useSetRecoilState(userCategoryName);
  const entireCate = useRecoilValue(entireCategory);

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
        <div className="search-subtitle" ref={myRef}>
          <SubTitle
            subTitle={`'${subTitle}' 도서 검색 결과`}
            alignItems="start"
          />
        </div>
        <CategoryFilter />
        <Sort />
        <Books />
        <Pagination myRef={myRef} />
      </section>
      <section className="wish-book-wraper">
        <WishBook />
      </section>
    </main>
  );
};

export default Search;
