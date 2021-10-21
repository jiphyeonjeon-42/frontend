import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import BackGround from "../utils/BackGround";
import MainHome from "./MainHome";
import MainNew from "./MainNew";
import MainPopular from "./MainPopular";
import { useSearchInput } from "../../atom/useSearchInput";
import globalModal from "../../atom/globalModal";
import MiniModal from "../utils/MiniModal";
import "../../css/Main.css";

const Main = () => {
  const setInputValue = useSetRecoilState(useSearchInput);
  const [miniModal, setMiniModal] = useRecoilState(globalModal);
  const handleModal = () => {
    setMiniModal({
      view: !miniModal.view,
      error: miniModal.error,
    });
  };
  useEffect(() => {
    setInputValue("");
  }, []);
  return (
    <main className="main-wrapper">
      {miniModal.view && <MiniModal handleModal={handleModal} type="error" />}
      <BackGround page="main" />
      <MainHome />
      <MainNew />
      <MainPopular />
    </main>
  );
};

export default Main;
