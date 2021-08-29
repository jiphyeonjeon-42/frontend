import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Infomation from "./component/Information";
import Main from "./component/Main";
import "./css/reset.css";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Main} />
        <Route path="/infomation" exact component={Infomation} />
        <Route path="/" component={Footer} />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
