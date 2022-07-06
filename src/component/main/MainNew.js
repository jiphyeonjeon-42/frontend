import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import globalModal from "../../atom/globalModal";
import SubTitle from "../utils/SubTitle";
import MainNewBookList from "./MainNewBookList";
import "../../css/MainNew.css";

const MainNew = () => {
  const [docs, setDocs] = useState([]);
  const setGlobalError = useSetRecoilState(globalModal);

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/books/info/`, {
        params: {
          sort: "new",
          limit: 20,
        },
      })
      .then(response => {
        const { items } = response.data;
        setDocs([...items]);
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

  return (
    <section className="main-new">
      <div className="main-new__wrapper">
        <SubTitle
          subTitle="집현전에 새로 들어온 신작을 확인해보세요"
          description="책을 클릭하면 더 자세한 정보를 확인할 수 있습니다."
          alignItems="center"
        />
        <MainNewBookList docs={docs} />
      </div>
    </section>
  );
};

export default MainNew;
