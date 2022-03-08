import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import SubTitle from "../utils/SubTitle";
import globalModal from "../../atom/globalModal";
import MainPopularCenter from "./MainPopularCenter";
import MainPopularSide from "./MainPopularSide";
import "../../css/MainPopular.css";

const MainPopular = () => {
  const [centerTop, setCenterTop] = useState(0);
  const [docs, setDocs] = useState([]);
  const setGlobalError = useSetRecoilState(globalModal);

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/books/info/`, {
        params: {
          sort: "popular",
          limit: 30,
        },
      })
      .then(response => {
        const { items } = response.data;
        setDocs(items.map((item, index) => ({ ...item, rank: index + 1 })));
      })
      .catch(error => {
        const message = error.response
          ? error.response.data.message
          : error.message;
        setGlobalError({
          view: true,
          error: `예상치 못한 오류가 발생했습니다.\nbooks/info/search=new Error ${message}`,
        });
      });
  }, []);
  const left = docs.slice(centerTop - 3, centerTop);
  const center = docs.slice(centerTop, centerTop + 3);
  const right = docs.slice(centerTop + 3, centerTop + 6);
  const onLeft = () => {
    if (centerTop === 0) return;
    setCenterTop(centerTop - 3);
  };
  const onRight = () => {
    if (centerTop === 27) return;
    setCenterTop(centerTop + 3);
  };
  return (
    <section className="main__popular">
      <div className="main__popular__wrapper">
        <SubTitle
          subTitle="이번 달 인기 도서를 소개합니다"
          description="42서울 카뎃들이 이번 달 가장 많이 본 책들은 무엇일까요?"
          alignItems="start"
        />
        <div className="main__popular__contents">
          <MainPopularSide books={left} onClick={onLeft} />{" "}
          <MainPopularCenter books={center} centerTop={centerTop} />
          <MainPopularSide books={right} onClick={onRight} />
        </div>
      </div>
    </section>
  );
};

export default MainPopular;
