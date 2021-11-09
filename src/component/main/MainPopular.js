import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import SubTitle from "../utils/SubTitle";
import MainPopularMain from "./MainPopularMain";
import globalModal from "../../atom/globalModal";
import "../../css/MainPopular.css";
import MainPopularBookList from "./MainPopularBookList";

const mainDefault = {
  id: 0,
  title: "",
  author: "",
  publisher: "",
  isbn: "",
  image: "",
  category: "",
  publishedAt: "",
};

const MainPopluar = () => {
  const [docs, setDocs] = useState([]);
  const [main, setMain] = useState(mainDefault);
  const setGlobalError = useSetRecoilState(globalModal);
  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/books/info/`, {
        params: {
          sort: "popular",
          limit: 9,
        },
      })
      .then(response => {
        const { items } = response.data;
        setDocs(items);
        setMain(items[0]);
      })
      .catch(error => {
        setGlobalError({
          view: true,
          error: `books/info/search=popular ${error.name} ${error.message}`,
        });
      });
  }, []);

  return (
    <section className="main-popular-wraper">
      <div className="main-popular">
        <SubTitle
          subTitle="이번 달 인기 도서를 소개합니다"
          description="집현전 사람들이 이번 달 가장 많이 본 책들은 무엇일까요?"
          alignItems="start"
        />
        <div className="main-popular__content">
          <MainPopularMain main={main} />
          <MainPopularBookList docs={docs} setMain={setMain} />
        </div>
      </div>
    </section>
  );
};

export default MainPopluar;
