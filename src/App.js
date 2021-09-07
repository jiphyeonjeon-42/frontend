import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import BookDetail from "./component/BookDetail";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Infomation from "./component/Information";
import Main from "./component/Main";
import Search from "./component/Search";

// import BookInfo from "./component/BookInfo";
import "./css/reset.css";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Main} />
        <Route path="/infomation" exact component={Infomation} />
        <Route path="/search/:word" component={Search} />
        <Route path="/info/:id" component={BookDetail} />
        <Route path="/" component={Footer} />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
