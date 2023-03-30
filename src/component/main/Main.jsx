import React from "react";
import MainBanner from "./MainBanner";
import MainNew from "./MainNew";
import MainPopular from "./MainPopular";
import "../../css/Main.css";
import useDialog from "../../hook/useDialog";

const Main = () => {
  const { Dialog, setOpenTitleAndMessage } = useDialog();
  return (
    <main className="main-wrapper">
      <Dialog />
      <MainBanner />
      <MainNew setOpenTitleAndMessage={setOpenTitleAndMessage} />
      <MainPopular setOpenTitleAndMessage={setOpenTitleAndMessage} />
    </main>
  );
};

export default Main;
