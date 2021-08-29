import React from "react";
// import Title from "./Title";
import SubTitle from "./SubTitle";
import "../css/Main.css";

const Main = () => {
  return (
    <main>
      <section className="main-bg">
        <div className="main-title">
          <div className="main-title__line" />
          <span className="main-title__greet">어서오세요, 집현전입니다.</span>
          <span className="main-title__search">
            집현전에 원하는 책이 있다면, 검색창에 도서를 입력해주세요.
          </span>
        </div>
      </section>
      <section className="main-new">
        <SubTitle
          subTitle="집현전에 새로 들어온 신작을 확인해보세요"
          description="책을 클릭하면 더 자세한 정보를 확인할 수 있습니다."
          alignItems="center"
        />
      </section>
      <section className="main-popular">
        <SubTitle
          subTitle="이번 달 인기 도서를 소개합니다"
          description="집현전 사람들이 이번 달 가장 많이 본 책들은 무엇일까요?"
          alignItems="start"
        />
      </section>
    </main>
  );
};

export default Main;
