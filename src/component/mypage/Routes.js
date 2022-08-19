import React from "react";
import { Route, Routes } from "react-router-dom";
import Banner from "../utils/Banner";
import Mypage from "./Mypage";
import "../../css/MypageRoutes.css";
import EditEmail from "./EditEmail";
import EditPassword from "./EditPassword";

function MyPageRoutes() {
  return (
    <main>
      <Banner img="mypage" titleKo="마이페이지" titleEn="MYPAGE" />
      <div className="mypage-wrapper">
        <section className="mypage-section">
          {/* <Routes> */}
          <Route path="/mypage" exact element={<Mypage />} />
          <Route path="/mypage/edit/email" exact element={<EditEmail />} />
          <Route path="/mypage/edit/pw" exact element={<EditPassword />} />
          {/* </Routes> */}
        </section>
      </div>
    </main>
  );
}

export default MyPageRoutes;
