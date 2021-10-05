import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import BackGround from "../utils/BackGround";
import MainHome from "./MainHome";
import MainNew from "./MainNew";
import MainPopular from "./MainPopular";
import { useSearchInput } from "../../atom/useSearchInput";
import "../../css/Main.css";

const Main = () => {
  const setInputValue = useSetRecoilState(useSearchInput);

  useEffect(() => {
    setInputValue("");
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
