import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import MainBanner from "./MainBanner";
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
      <MainBanner />
      <MainNew />
      <MainPopular />
    </main>
  );
};

export default Main;
