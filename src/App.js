import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import BookDetail from "./component/book/BookDetail";
import Footer from "./component/utils/Footer";
import NotFound from "./component/utils/NotFound";
import Header from "./component/utils/Header";
import Information from "./component/information/Information";
import Main from "./component/main/Main";
import Search from "./component/search/Search";
import Auth from "./component/login/Auth";
import Logout from "./component/login/Logout";
import Rent from "./component/rent/Rent";
import "./css/reset.css";
import "./App.css";
import ReservedLoan from "./component/reservedloan/ReservedLoan";
import ReturnBook from "./component/return/ReturnBook";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/information" exact component={Information} />
          <Route path="/rent" exact component={Rent} />
          <Route path="/search" exact component={Search} />
          <Route path="/info/:id" exact component={BookDetail} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/return" exact component={ReturnBook} />
          <Route path="/reservation" exact component={ReservedLoan} />
          <Route component={NotFound} />
        </Switch>
        <Route path="/" component={Footer} />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
