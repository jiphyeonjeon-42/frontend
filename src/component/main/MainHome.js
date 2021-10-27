import React from "react";
import SearchBar from "../search/SearchBar";
import ScrollIcon from "../../img/scroll-icon.svg";
import "../../css/MainHome.css";

const Main = () => {
  return (
    <section className="main-home-wraper">
      <div className="main-home">
        <div className="main-home__line" />
        <span className="main-home__greet font-48-bold color-ff">
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
