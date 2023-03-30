// 2023년 4월 1일 만우절용 이벤트 페이지입니다.

import React, { useState } from "react";
import ELibraryCopyCat from "./ELibraryCopyCat";
import Box42CopyCat from "./Box42CopyCat";
import IframeLinkView from "./IframeLinkView";
import "../../css/ELibraryIn42Box.css";

const linkList = {
  BOX: "https://42box.github.io/front-end/",
  ELIBRARY: "https://42seoul.dkyobobook.co.kr/main.ink/",
  HANE24: "https://24hoursarenotenough.42seoul.kr/",
  CODE80000: "https://80000coding.oopy.io/",
  WHERE42: "https://www.where42.kr",
  CABI: "https://cabi.42seoul.io/login",
  GG42: "https://42gg.kr/",
};

const ELibraryIn42Box = () => {
  const [view, setView] = useState("JIP");

  return (
    <main className="elibrary-in-box__wrapper">
      <Box42CopyCat setView={setView} />
      <div className="elibrary-in-box__hidden" />
      {view === "JIP" ? (
        <ELibraryCopyCat />
      ) : (
        <IframeLinkView link={linkList[view]} type={view} />
      )}
    </main>
  );
};

export default ELibraryIn42Box;
