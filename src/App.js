import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import BookDetail from "./component/book/BookDetail";
import Footer from "./component/utils/Footer";
import Header from "./component/utils/Header";
import Infomation from "./component/information/Information";
import Main from "./component/main/Main";
import Search from "./component/search/Search";
import Auth from "./component/login/Auth";
import Logout from "./component/login/Logout";
import Rent from "./component/rent/Rent";
import "./css/reset.css";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Main} />
        <Route path="/infomation" exact component={Infomation} />
        <Route path="/rent" exact component={Rent} />
        <Route path="/search" component={Search} />
        <Route path="/info/:id" component={BookDetail} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={Footer} />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
