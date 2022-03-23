import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import MainBanner from "./MainBanner";
import MainNew from "./MainNew";
import MainPopular from "./MainPopular";
import { useSearchInput } from "../../atom/useSearchInput";
import globalModal from "../../atom/globalModal";
import MiniModal from "../utils/MiniModal";
import "../../css/Main.css";
import ModalContentsOnlyTitle from "../utils/ModalContentsTitleWithMessage";

const Main = () => {
  const setInputValue = useSetRecoilState(useSearchInput);
  const [miniModal, setMiniModal] = useRecoilState(globalModal);
  const closeModal = () => {
    setMiniModal({
      view: false,
      error: "",
    });
  };
  useEffect(() => {
    setInputValue("");
  }, []);
  return (
    <main className="main-wrapper">
      {miniModal.view && (
        <MiniModal closeModal={closeModal}>
          <ModalContentsOnlyTitle
            closeModal={closeModal}
            title={miniModal.error}
          />
        </MiniModal>
      )}
      <MainBanner />
      <MainNew />
      <MainPopular />
    </main>
  );
};

export default Main;
