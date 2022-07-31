import React, { useEffect } from "react";
import { install } from "ga-gtag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useRecoilState } from "recoil";
import BookDetail from "./component/book/BookDetail";
import Footer from "./component/utils/Footer";
import NotFound from "./component/utils/NotFound";
import Header from "./component/utils/Header";
import MobileHeader from "./component/utils/MobileHeader";
import Information from "./component/information/Information";
import Main from "./component/main/Main";
import Search from "./component/search/Search";
import Auth from "./component/login/Auth";
import Logout from "./component/login/Logout";
import Login from "./component/login/Login";
import Register from "./component/login/Register";
import Rent from "./component/rent/Rent";
import "./css/reset.css";
import "./App.css";
import ReservedLoan from "./component/reservedloan/ReservedLoan";
import ReturnBook from "./component/return/ReturnBook";
import UserManagement from "./component/userManagement/UserManagement";
import userState from "./atom/userState";
import AddBook from "./component/book/AddBook";
import Mypage from "./component/mypage/Routes";

function Routes() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    install(process.env.REACT_APP_GA_ID);
    const localUser = JSON.parse(window.localStorage.getItem("user"));

    const nowDate = new Date();
    if (localUser && localUser.isLogin) {
      const expireDate = new Date(localUser.expire);
      if (nowDate < expireDate) setUser(localUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Route path="/" component={Header} />
      <Route path="/" component={MobileHeader} />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/information" exact component={Information} />
        <Route path="/search" exact component={Search} />
        <Route path="/info/:id" exact component={BookDetail} />
        <Route path="/login" exact component={Login} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/register" exact component={Register} />
        <Route path="/mypage" component={Mypage} />
        {user.isAdmin && <Route path="/rent" exact component={Rent} />}
        {user.isAdmin && <Route path="/return" exact component={ReturnBook} />}
        {user.isAdmin && (
          <Route path="/reservation" exact component={ReservedLoan} />
        )}
        {user.isAdmin && <Route path="/addbook" exact component={AddBook} />}
        {user.isAdmin && (
          <Route path="/user" exact component={UserManagement} />
        )}
        <Route component={NotFound} />
      </Switch>
      <Route path="/" component={Footer} />
    </BrowserRouter>
  );
}

export default Routes;
