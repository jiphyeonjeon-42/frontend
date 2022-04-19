import React, { useEffect, useState } from "react";
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
  const [page, setPage] = useState(1);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const closeModal = () => {
    setMiniModal({
      view: false,
      error: "",
    });
  };

  useEffect(() => {
    const getScroll = e => {
      e.preventDefault();
      setWindowHeight(window.innerHeight);
      if (e.deltaY > 0) {
        if (page === 4) return;
        setPage(prev => prev + 1);
      } else if (e.deltaY < 0) {
        if (page === 1) return;
        setPage(prev => prev - 1);
      }
    };
    window.addEventListener("wheel", getScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", getScroll, {
        passive: false,
      });
    };
  }, [windowHeight, page]);

  useEffect(() => {
    const posTop = (page - 1) * windowHeight;
    window.scrollTo({
      top: posTop,
      behavior: "smooth",
    });
  }, [page, windowHeight]);

  useEffect(() => {
    setInputValue("");
  }, []);

  console.log("render!");

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
