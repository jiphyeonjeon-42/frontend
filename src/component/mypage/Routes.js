import React from "react";
import { Route, Switch } from "react-router-dom";
import Banner from "../utils/Banner";
import Mypage from "./Mypage";
import "../../css/MypageRoutes.css";
import EditEmailOrPassword from "./EditEmailOrPassword";

function Routes() {
  return (
    <main>
      <Banner img="mypage" titleKo="마이페이지" titleEn="MYPAGE" />
      <div className="mypage-wrapper">
        <section className="mypage-section">
          <Switch>
            <Route path="/mypage" exact component={Mypage} />
            <Route
              path="/mypage/edit/:mode"
              exact
              component={EditEmailOrPassword}
            />
          </Switch>
        </section>
      </div>
    </main>
  );
}

export default Routes;
