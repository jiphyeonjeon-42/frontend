/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../css/SearchLoader.css";
import { useRecoilValue } from "recoil";
import { pageEndState } from "./Books";

const SearchLoader = () => {
  const isEnd = useRecoilValue(pageEndState);
  return (
    <section>
      {isEnd ? (
        <div className="search-end">
          <h1>검색 결과가 없습니다.</h1>
        </div>
      ) : (
        <div className="search-loader" />
        //   <h1>Loading</h1>
        // </div>
      )}
    </section>
  );
};

export default SearchLoader;
