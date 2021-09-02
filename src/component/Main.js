import React from "react";
import MainHome from "./MainHome";
import MainNew from "./MainNew";
import MainPopular from "./MainPopular";
import "../css/Main.css";

const Main = () => {
  return (
    <main className="main-wrapper">
      <MainHome />
      <MainNew />
      <MainPopular />
    </main>
  );
};

export default Main;
